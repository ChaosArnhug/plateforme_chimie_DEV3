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
        this.state={ nmbreQuestions:1, myQuizData:{"titre":"titre de base", "description":"", "myQuestionsArray": new Array()} }; 
        this.updateDataInObject = this.updateDataInObject.bind(this);
        this.addQuestionInDataArray = this.addQuestionInDataArray.bind(this);
        this.remQuestionInDataArray = this.remQuestionInDataArray.bind(this);

        // dans myQuestionsArray: liste d'objets : {"titreQuestion" : "", "enonce" : "", "estQCM" : 0, "points" : 1, "myReponsesArray" : []}
        // dans myReponsesArray: liste d'objets : {"texteReponse" : "", "estCorrect" : false}
    }


    /*
    updateTitre(previousState, newTitre){
        let newState = {...previousState.myQuizData, titre : newTitre};
        return(newState)
        // à mettre dans le onChange du titre : (e)=>{this.setState({myQuizData:this.updateTitre(this.state,e.target.value)})}
    }
    */

     /*
    
    async updateDataInObject2(){
        await alert(this.state.myQuizData.titre);
        let previousState = await this.state;

        await this.setState((previousState => {
                let newQuizData = Object.assign({}, previousState.myQuizData);  
                alert(newQuizData.titre);
                newQuizData.titre = 'someothername';          
                alert(newQuizData.titre);         
                return  (newQuizData) ;    
                
            })
        )
        // https://stackoverflow.com/questions/43638938/updating-an-object-with-setstate-in-react -> piste suivie
    }
    */


    async updateDataInObject(previousState, objectToChange, dataToChange, newData){
        let newObject = await {...previousState[objectToChange]};
        newObject[dataToChange] = await newData;
        await this.setState({[objectToChange] : newObject});
        // à mettre dans le onChange du titre : (event)=>{this.setState({myQuizData:this.updateDataInObject(this.state,"myQuizData","titre",event.target.value)})}
        // à mettre dans le onChange de la description : (event)=>{this.setState({myQuizData:this.updateDataInObject(this.state,"myQuizData","description",event.target.value)})}
    }

    async addQuestionInDataArray(){
        // Ajoute un objet représentant une question dans myQuestionsArray de myQuizData
        let newObject = await {...this.state.myQuizData}; // copie l'objet myQuizData
        let newArray = await newObject.myQuestionsArray.slice(); // copie l'array myQuestionsData 
        await newArray.push({"titreQuestion" : "", "enonce" : "", "estQCM" : 0, "points" : 1, "myReponsesArray" : []}); // ajouté un nouvel objet représentant une question
        newObject.myQuestionsArray = await newArray;
        await this.setState({myQuizData:newObject});
    }

    async remQuestionInDataArray(){
        let newObject = await {...this.state.myQuizData}; // copie l'objet myQuizData
        let newArray = await newObject.myQuestionsArray.slice(); // copie l'array myQuestionsData 
        await newArray.pop(); // ajouté un nouvel objet représentant une question
        newObject.myQuestionsArray = await newArray;
        await this.setState({myQuizData:newObject});
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
                        onBlur={ (event)=>{this.updateDataInObject(this.state, "myQuizData", "titre", event.target.value)} }  
                        />

                    
                        <TextField
                        id="outlined-multiline-static"
                        label="Description du quiz"
                        multiline
                        rows={4}
                        defaultValue=""
                        sx={{ml:3, mr:4, my:2}}
                        onBlur={ (event)=>{this.updateDataInObject(this.state, "myQuizData", "description", event.target.value )} }
                        />
                    
                        <ParamQuestion addQuestionInDataArray={this.addQuestionInDataArray} remQuestionInDataArray={this.remQuestionInDataArray}/>
                        
        
                    </Stack>

                    
                    
                    <Button variant="contained" sx={{ml:9, mr:2, mt:2, bgcolor:"secondary.button"}} onClick={()=> {alert(this.state.myQuizData.titre+" "+ this.state.myQuizData.description)}}>Terminer</Button>

                    <Button variant="contained" sx={{ml:9, mr:2, mt:2, bgcolor:"secondary.button"}} onClick={()=> {alert((this.state.myQuizData.myQuestionsArray).length)} }>affiche longueur data array</Button>
                    <Button variant="contained" sx={{ml:9, mr:2, mt:2, bgcolor:"secondary.button"}} onClick={()=> { this.addQuestionInDataArray()} }>ajout</Button>
                    <Button variant="contained" sx={{ml:9, mr:2, mt:2, bgcolor:"secondary.button"}} onClick={()=> { this.remQuestionInDataArray()} }>retrait</Button>
                    

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