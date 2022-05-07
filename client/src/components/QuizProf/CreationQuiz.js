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
import { Alert } from '@mui/material';


// import theme from '../index.js'
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
            nmbreTotReponses:0, 
            myQuizData:{"titre":"titre de base", "description":"", "myQuestionsArray": new Array()} }; 
        this.updateQuestionData = this.updateQuestionData.bind(this);
        this.addQuestionInDataArray = this.addQuestionInDataArray.bind(this);
        this.addReponseInDataArray = this.addReponseInDataArray.bind(this);
        this.remQuestionInDataArray = this.remQuestionInDataArray.bind(this);
        this.generateQuestionId = this.generateQuestionId.bind(this);
        this.generateReponseId = this.generateReponseId.bind(this);
        this.questionType = this.questionType.bind(this);

        // dans myQuestionsArray: liste d'objets : {"titreQuestion" : "", "enonce" : "", "isQCM" : false, "points" : 1, "myReponsesArray" : []}
        // dans myReponsesArray: liste d'objets : {"texteReponse" : "", "isCorrect" : false}
    }


    async generateQuestionId(){
        let num = await this.state.nmbreQuestions;
        
        let newNombre = await num +1;  
        //alert("num puis newNombre "+num+" "+newNombre);
        this.setState({nmbreQuestions : newNombre});
        return(`Q${num}`)
    }

    async generateReponseId(){
        let num = await this.state.nmbreTotReponses;
        
        let newNombre = await num +1;  
        //alert("num puis newNombre "+num+" "+newNombre);
        this.setState({nmbreTotReponses : newNombre});
        return(`R${num}`)
    }

    async updateQuizData(dataToChange, newData){
        // Fonction changeant la valeur d'une clé dans myQuizData (ex: titre, description), 
        // dataToChange représente la clé dont on doit changer la valeur, newData la nouvelle valeur
        let newObject = await {...this.state.myQuizData};
        newObject[dataToChange] = await newData;
        await this.setState({"myQuizData" : newObject});
    }

    async updateQuestionData(questionId, questionDataToChange, newData){
        let questionNum = parseInt(questionId.substring(1));
        let newObject = await {...this.state.myQuizData};
        
        newObject.myQuestionsArray[questionNum][questionDataToChange] = await newData;
        await this.setState({"myQuizData" : newObject});
    }

    async addQuestionInDataArray(){
        let questionId = await this.generateQuestionId();
        //alert("in addQuestionInDataArray "+questionId)

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

    async addReponseInDataArray(questionId){
        let questionNum = parseInt(questionId.substring(1));
        let reponseId = await this.generateReponseId();
        //alert("in addReponseInDataArray "+reponseId)

        let newNombre = await this.state.nmbreTotReponses +1;  
        await this.setState({nmbreReponses : newNombre});

        // Ajoute un objet représentant une réponse dans myReponsesArray de myQuestionsArray
        let newObject = await {...this.state.myQuizData}; // copie l'objet myQuizData
        let newArray = await newObject.myQuestionsArray[questionNum].myReponsesArray.slice(); // copie l'array myReponsesArray
        await newArray.push({"reponseId" : reponseId, "texteReponse" : "", "estCorrect" : false}); // ajouté un nouvel objet représentant une question
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


    async questionType(questionId, isQCM){
        // Change l'état de isQCM dans l'objet représentant une question
        let questionNum = parseInt(questionId.substring(1));
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
                        addQuestionInDataArray={this.addQuestionInDataArray} 
                        remQuestionInDataArray={this.remQuestionInDataArray}
                        addReponseInDataArray={this.addReponseInDataArray} 
                        generateQuestionId={this.generateQuestionId}
                        generateReponseId={this.generateReponseId}
                        questionType={this.questionType}
                        />
                        <div id='ajoutTest'>
                            
                        </div>
                        
                        
        
                    </Stack>

                    <Button variant="contained" sx={{ml:9, mr:2, mt:2, bgcolor:"secondary.button"}} onClick={()=> {
                        ReactDOM.render(
                            <ParamQuestion 
                            updateQuestionData={this.updateQuestionData}
                            addQuestionInDataArray={this.addQuestionInDataArray} 
                            remQuestionInDataArray={this.remQuestionInDataArray}
                            addReponseInDataArray={this.addReponseInDataArray} 
                            generateQuestionId={this.generateQuestionId}
                            questionType={this.questionType}
                            />
                        ,
                            document.getElementById('ajoutTest')
                        );
                        }}>ajout question</Button>
                    
                    <Button variant="contained" sx={{ml:9, mr:2, mt:2, bgcolor:"secondary.button"}} onClick={()=> {alert(this.state.myQuizData.titre+" "+ this.state.myQuizData.description +" "+this.state.nmbreQuestions)}}>Terminer</Button>

                    <Button variant="contained" sx={{ml:9, mr:2, mt:2, bgcolor:"secondary.button"}} onClick={()=> {alert((this.state.myQuizData.myQuestionsArray).length)} }>affiche longueur data array Questions</Button>
                    <Button variant="contained" sx={{ml:9, mr:2, mt:2, bgcolor:"secondary.button"}} onClick={()=> {alert((this.state.myQuizData.myQuestionsArray[0].myReponsesArray).length)} }>affiche longueur data array Réponses</Button>
                    <Button variant="contained" sx={{ml:9, mr:2, mt:2, bgcolor:"secondary.button"}} onClick={()=> { alert(this.state.myQuizData.myQuestionsArray[0].isQCM)} }>affiche réponse id</Button>
                    
                    

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

export default CreationQuiz;