import React, { Component } from 'react';
import ReactDOM from 'react-dom';

import {ThemeProvider, createTheme } from '@mui/material/styles';
import { unstable_styleFunctionSx, styled } from '@mui/system';
//import { styled } from '@mui/material/styles';

import Paper from '@mui/material/Paper';
import Stack from '@mui/material/Stack';
import TextField from '@mui/material/TextField';
import Button from '@mui/material/Button';


import ParamQuestion from "./ParamQuestion.js"
import { useParams } from 'react-router-dom';




//import theme from '../../index.js'
// Faire un import au lieu de recréer le theme fait que rien ne s'affiche -> ?


const theme = createTheme({
    palette: {
      primary: {
        main: '#E4F2AE',
      },
      secondary: {
        main: '#1E943C',
        button: '#10812D'
      },
      box: {
        main: "#BED005",
        secondary: "#D4E522"
      }
    },
});



//Les balises HTML de base ne peuvent pas être modifiée avec sx={{.....}}. On doit créer un nouveau 
// type de balise à partir de celles-ci pouvant utiliser sx. 
const Div = styled('div')(unstable_styleFunctionSx);



const Item = styled(Paper)(({ theme }) => ({
    backgroundColor: theme.palette.mode === 'dark' ? '#1A2027' : '#fff',
    ...theme.typography.body2,
    padding: theme.spacing(1),
    textAlign: 'center',
    color: theme.palette.text.secondary,
}));





// Composant React pour la structure de création de quiz
class CreationQuiz extends Component{
    constructor(props){
        super(props);
        this.state={ 
            nmbreQuestions:0, 
            myQuizData:{"cours": "", "chapitre":"", "titre":"titre de base", "description":"", "myQuestionsArray": new Array()} }; 
        this.updateQuestionData = this.updateQuestionData.bind(this);
        this.updateReponseData = this.updateReponseData.bind(this);
        this.addQuestionInDataArray = this.addQuestionInDataArray.bind(this);
        this.addReponseInDataArray = this.addReponseInDataArray.bind(this);
        this.remQuestionInDataArray = this.remQuestionInDataArray.bind(this);
        this.questionType = this.questionType.bind(this);
        this.remReponseInDataArray = this.remReponseInDataArray.bind(this);
        this.remAllReponsesInDataArray = this.remAllReponsesInDataArray.bind(this);


        // dans myQuestionsArray: liste d'objets : {"questionId": "", "titreQuestion" : "", "enonce" : "", "isQCM" : false, "points" : 1, "myReponsesArray" : []}
        // dans myReponsesArray: liste d'objets : {"reponseId": "", "texteReponse" : "", "isCorrect" : false}
    }


    async finishQuiz(){
        await this.updateQuizData("cours", this.props.params.cours);
        await this.updateQuizData("chapitre", this.props.params.chapitre); 
        await console.log(JSON.stringify(this.state.myQuizData));
        await alert("Envoi du quiz");
        // On mets à jour le cours et le chapitre du quiz. On les récupère de l'url via useParams() .
        // On utilise useParams() dans une fonction qui englobe CreationQuiz quand on l'export.

        await fetch(`http://localhost:5000/quiz/gestion/creation`,
            {
                method: "POST",
                body: JSON.stringify(this.state.myQuizData),
                headers: {
                    "Content-type": "application/json; charset=UTF-8"
                }
            }
        )
        console.log(this.state.myQuizData.cours)
        window.location = await ("http://localhost:3000/cours/"+this.state.myQuizData.cours+"/creation"); // retour à la page de gestion du cours dans lequel on crée le quiz
        await alert("Votre quiz à bien été créé .")
        return false
    
    }

    generateUniqueID(type){
        // type représente le type : "Q" -> Question, "R"-> Réponse
        let num = Math.floor(Math.random() * Date.now());
        return(type+num)
    }

    numFromQuestionId(questionId){
        // Récupère la position de l'objet représentant une question en fonction de son id
        
        let num = this.state.myQuizData.myQuestionsArray.map(object => object.questionId).indexOf(questionId);
        return num
    }

    numFromReponseId(questionNum, reponseId){
        // Récupère la position de l'objet représentant une question en fonction de son id
        let num = this.state.myQuizData.myQuestionsArray[questionNum].myReponsesArray.map(object => object.reponseId).indexOf(reponseId);

        if(num == -1){
            let num = 0;   // à changer! Manière pas propre de régler le problème : La fonction fonctionne bien sauf pour les objets de réponse à l'index 0 de l'array
            return num;
        }
        return num;
    }

    async updateQuizData(dataToChange, newData){
        // Fonction changeant la valeur d'une clé dans myQuizData (ex: titre, description), 
        // dataToChange représente la clé dont on doit changer la valeur, newData la nouvelle valeur
        let newObject = await {...this.state.myQuizData};
        newObject[dataToChange] = await newData;
        await this.setState({"myQuizData" : newObject});
    }

    async updateQuestionData(questionId, questionDataToChange, newData){
        let questionNum = await this.numFromQuestionId(questionId);
        let newObject = await {...this.state.myQuizData};
        
        newObject.myQuestionsArray[questionNum][questionDataToChange] = await newData;
        await this.setState({"myQuizData" : newObject});
    }

    async updateReponseData(questionId, reponseId, reponseDataToChange, newData){
        let questionNum = await this.numFromQuestionId(questionId);
        let reponseNum = await this.numFromReponseId(questionNum, reponseId);

        let newObject = await {...this.state.myQuizData};
        newObject.myQuestionsArray[questionNum].myReponsesArray[reponseNum][reponseDataToChange] = await newData;
        await this.setState({"myQuizData" : newObject});
    }

    async addQuestionInDataArray(){
        let questionId = await this.generateUniqueID("Q");

        let newNombre = await this.state.nmbreQuestions +1;  
        await this.setState({nmbreQuestions : newNombre});

        // Ajoute un objet représentant une question dans myQuestionsArray de myQuizData
        let newObject = await {...this.state.myQuizData}; // copie l'objet myQuizData
        let newArray = await newObject.myQuestionsArray.slice(); // copie l'array myQuestionsData 
        await newArray.push({"questionId": questionId,"titreQuestion" : "", "enonce" : "", "isQCM" : false, "points" : 1, "myReponsesArray" : new Array}); // ajouté un nouvel objet représentant une question
        newObject.myQuestionsArray = await newArray;
        await this.setState({myQuizData:newObject});

        return(questionId)
    }


    async addReponseInDataArray(questionId, isCorrect){
        let reponseId = await this.generateUniqueID("R");
        let questionNum = this.numFromQuestionId(questionId);
        
        let newNombre = await this.state.nmbreTotReponses +1;  
        await this.setState({nmbreReponses : newNombre});

        // Ajoute un objet représentant une réponse dans myReponsesArray de myQuestionsArray
        let newObject = await {...this.state.myQuizData}; // copie l'objet myQuizData
        let newArray = await newObject.myQuestionsArray[questionNum].myReponsesArray.slice(); // copie l'array myReponsesArray
        await newArray.push({"reponseId" : reponseId, "texteReponse" : "", "isCorrect" : isCorrect}); // ajouté un nouvel objet représentant une question
        newObject.myQuestionsArray[questionNum].myReponsesArray = await newArray;
        await this.setState({myQuizData:newObject});
        

        return(reponseId)
    }



    async remQuestionInDataArray(){
        let newObject = await {...this.state.myQuizData}; // copie l'objet myQuizData
        let newArray = await newObject.myQuestionsArray.slice(); // copie l'array myQuestionsData 
        await newArray.pop(); // ajouté un nouvel objet représentant une question
        newObject.myQuestionsArray = await newArray;
        await this.setState({myQuizData:newObject});
    }

    async remReponseInDataArray(questionId){
        let questionNum = await this.numFromQuestionId(questionId);

        let newObject = await {...this.state.myQuizData}; // copie l'objet myQuizData
        let newArray = await newObject.myQuestionsArray[questionNum].myReponsesArray.slice(); // copie l'array myQuestionsData 
        await newArray.pop(); // ajouté un nouvel objet représentant une question
        newObject.myQuestionsArray[questionNum].myReponsesArray = await newArray;
        await this.setState({myQuizData:newObject});
    }

    async remAllReponsesInDataArray(questionId){
        let questionNum = await this.numFromQuestionId(questionId);
        let newObject = await {...this.state.myQuizData}; // copie l'objet myQuizData

        newObject.myQuestionsArray[questionNum].myReponsesArray = await new Array; // attribue à l'array des réponses un array vide -> supprime ce qu'il y avait avant
        await this.setState({myQuizData:newObject});
    }


    async questionType(questionId, isQCM){
        // Change l'état de isQCM dans l'objet représentant une question
        let questionNum = this.numFromQuestionId(questionId);
        let newObject = await {...this.state.myQuizData};
        
        newObject.myQuestionsArray[questionNum].isQCM = await isQCM;
        await this.setState({"myQuizData" : newObject});
    }


    render(){
        return(
            <div>
                <ThemeProvider theme={theme}>
                    <h1>Bienvenue dans la création de quiz</h1>

                    <Stack spacing={2} id="QuestionStack">

                        <TextField
                        required
                        id="outlined-required"
                        label="Titre du quiz"
                        defaultValue=""
                        sx={{ml:3, mr:4, my:2}}
                        onBlur={ (event)=>{this.updateQuizData("titre", event.target.value)} }  
                        />

                    
                        <TextField
                        id="outlined-multiline-static"
                        label="Description du quiz"
                        multiline
                        rows={4}
                        defaultValue=""
                        sx={{ml:3, mr:4, my:2}}
                        onBlur={ (event)=>{this.updateQuizData("description", event.target.value )} }
                        />
                    
                        <ParamQuestion 
                        updateQuestionData={this.updateQuestionData}
                        updateReponseData={this.updateReponseData}
                        addQuestionInDataArray={this.addQuestionInDataArray} 
                        remQuestionInDataArray={this.remQuestionInDataArray}
                        addReponseInDataArray={this.addReponseInDataArray} 
                        addReponseInDataArray2={this.addReponseInDataArray2}
                        generateUniqueID={this.generateUniqueID}
                        questionType={this.questionType}
                        remReponseInDataArray = {this.remReponseInDataArray}
                        remAllReponsesInDataArray ={this.remAllReponsesInDataArray}
                        />
                        <div id='ajoutTest'>
                            
                        </div>
                        
                        
        
                    </Stack>

                    
                    
                    <Button variant="contained" sx={{ml:9, mr:2, mt:2, bgcolor:"secondary.button"}} onClick={()=> {this.finishQuiz()}}>Terminer</Button>

                    <Button variant="contained" sx={{ml:9, mr:2, mt:2, bgcolor:"secondary.button"}} onClick={()=> { console.log(this.state.myQuizData)} }>console.log</Button>
                    
                    

                </ThemeProvider>
                
            </div>
        

        )
    }
}


// Rajouter comme bouton quand on gère l'ajout de questions
/*<Button variant="contained" sx={{ml:9, mr:2, mt:2, bgcolor:"secondary.button"}} onClick={()=> {
    ReactDOM.render(
        <ParamQuestion addQuestionInDataArray={this.addQuestionInDataArray}/>,
        document.getElementById("QuestionStack")
    );
}}>Ajout Question</Button>
*/

export default (props) => (
    <CreationQuiz
        {...props}
        params={useParams()}
    />
);