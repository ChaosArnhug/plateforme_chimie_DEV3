import React, { Component } from 'react';
import ReactDOM from 'react-dom';


import {ThemeProvider, createTheme } from '@mui/material/styles';
import { unstable_styleFunctionSx, styled } from '@mui/system';
//import { styled } from '@mui/material/styles';

import Box from '@mui/material/Box';
import Paper from '@mui/material/Paper';
import Stack from '@mui/material/Stack';
import TextField from '@mui/material/TextField';
import Button from '@mui/material/Button';

import FormGroup from '@mui/material/FormGroup';
import FormControlLabel from '@mui/material/FormControlLabel';
import Checkbox from '@mui/material/Checkbox';
// import { stripBasename } from 'react-router/lib/router'; /?????
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


function generateRandomId(lastQuestionId){
    var idPrefix = "Q";
    var id = String(lastQuestionId);
    return (idPrefix+id);
}



class ParamOuverte extends Component{
    render(){
        return(
            <TextField
            required
            id="outlined-required"
            label="Réponse"
            defaultValue=""
            sx={{ml:9, mr:4, mt:2}}
            />
        )
    }
}

class ReponseQCM extends Component{
    render(){
        return(
            <Div sx={{display:"flex"}}>
                <h1>{this.props.numQuestion}</h1>
                <TextField
                required
                id="outlined-required"
                label="Réponse QCM"
                defaultValue=""
                sx={{ml:9, mr:2, mt:2}}
                />
                <FormGroup sx={{mr:4, my:"auto"}}>
                    <FormControlLabel control={<Checkbox onClick={() => {alert("c'est une bonne réponse")}}/>} label="Est une bonne réponse" />
                </FormGroup>
            </Div>
        )
    }
}

class MultReponsesQCM extends Component{
    constructor(props){
        super(props);
        this.state={
            totReponseArr : ["a", "b", "c", "d", "e", "f", "g", "h", "i", "j"]
        }
        
    }
    

    render(){
        return(
            // Générer un certain nombre de <ReponseQCM/> en fonction du nombre de réponses qu'on veut mettre
            this.state.totReponseArr.slice(0, this.props.nmbreQCMReponses+1).map(item =>(
                <ReponseQCM numQuestion={item} />
              ))
            
        )
    }
}

class ParamQCM extends Component{
    constructor(props){
        super(props);
        this.state={nmbreQCMReponses:2}; 
        // On mets l'id de début de question à 0, on l'incrémente pour donner un nouvel id à chaque question.
    }

    async ajoutRetraitReponse(action){
        if(action === "ajout"){
            await this.setState((state)=> ({
                nmbreQCMReponses: state.nmbreQCMReponses+1
            }));
            ReactDOM.render(
                <MultReponsesQCM nmbreQCMReponses={this.state.nmbreQCMReponses}/>,
                document.getElementById('reponsesQCM')
            );
        }
        else if(action === "retrait"){
            if(this.state.nmbreQCMReponses < 2 ){
                alert("Pas moins de deux solutions svp!")  // Mettre qqchose MUI
            }
            else{
                await this.setState((state)=> ({
                    nmbreQCMReponses: state.nmbreQCMReponses-1
                }));
                ReactDOM.render(
                    <MultReponsesQCM nmbreQCMReponses={this.state.nmbreQCMReponses} />,
                    document.getElementById('reponsesQCM')
                );
            }
        }
        
    }

    componentDidMount(){
        ReactDOM.render(
            <MultReponsesQCM nmbreQCMReponses={2} />,
            document.getElementById('reponsesQCM')
        );
    }


    render(){
        return(
            
            <Div>
                <Div id="reponsesQCM">
                    
                    
                </Div>
                <Div sx={{display:"flex"}}>
                    <Button variant="outlined" sx={{ml:9, mr:2, mt:2}} onClick={()=> this.ajoutRetraitReponse("ajout")}>+</Button>
                    <Button variant="outlined" sx={{ml:1, mr:2, mt:2}} onClick={()=> this.ajoutRetraitReponse("retrait")}>-</Button>
                </Div>
            </Div>
            
            

        )
    }
}



// Composant React pour la structure de param. de question
class ParamQuestion extends Component{
    generateRandomId(lastQuestionId){
        var idPrefix = "Q";
        var id = String(lastQuestionId);
        return (idPrefix+id);
    }

    constructor(props){
        super(props);
        //this.state={isQCM:true};
        this.state={isQCM:true, questionId: generateRandomId(this.props.lastQuestionId) }; // problème avec fonction
    }

    choixParam(isQCM){
    
        if (isQCM == false){
            this.setState({isQCM:true})
            ReactDOM.render(
                <ParamOuverte/>,
                document.getElementById('param_reponse')
              );
        }
        else if (isQCM == true){
            this.setState({isQCM:false})
            ReactDOM.render(
                <ParamQCM/>,
                document.getElementById('param_reponse')
              );
        }
        
    }

    render(){
        return(
            <div>
                <ThemeProvider theme={theme}>
                <Box sx={{ml:3, mr:4, my:2, py:2, bgcolor:"box.main", fontSize:20}}>
                    <Div sx={{ml:3, mr:4, my:2, display:"flex"}}>

                        <TextField
                        required
                        id="outlined-required"
                        label="Enoncé de la question"
                        defaultValue=""
                        sx={{ml:3, mr:4}}
                        />

                        <FormGroup sx={{ml:3, mr:4, my:"auto"}}>
                            <FormControlLabel control={<Checkbox onClick={() => {this.choixParam(this.state.isQCM)}}/>} label="QCM" />
                        </FormGroup>
                    </Div>

                    <Div id="param_reponse">
                        <TextField
                        required
                        id="outlined-required"
                        label="Réponse"
                        defaultValue=""
                        sx={{ml:9, mr:4, mt:2}}
                        />
                    </Div>
                    
                    

                </Box>
                </ThemeProvider>
                
            </div>
            
        )
    }
}


// Composant React pour la structure de création de quiz
class CreationQuiz extends Component{
    constructor(props){
        super(props);
        this.state={lastQuestionId: 0, myQuizData:{"titre":"titre de base", "description":"", "myQuestionsData":[]} }; 
        // On mets l'id de début de question à 0, on l'incrémente pour donner un nouvel id à chaque question.
        // myQuestionsData est un Array vide qui contiendra des objets représentant les données de chaque question (énoncé, réponses, réponses justes, ...)
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

    render(){
        return(
            <div>
                <ThemeProvider theme={theme}>
                    <h1>Bienvenue dans la création de quiz</h1>

                    <Stack spacing={2}>

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
                    
                        <ParamQuestion lastQuestionId={this.state.lastQuestionId}/>

            
        
                    </Stack>

                    <Button variant="contained" sx={{ml:9, mr:2, mt:2, bgcolor:"secondary.button"}} onClick={()=> {alert(this.state.myQuizData.titre, this.state.myQuizData.description)}}>Terminer</Button>

                </ThemeProvider>
                
            </div>
        

        )
    }
}

export default CreationQuiz;