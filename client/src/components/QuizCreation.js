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

class ParamQCM extends Component{
    ajoutReponse(){
        ReactDOM.render(
            <ReponseQCM/>,
            document.getElementById('reponseQCM')
        );
    }
    render(){
        return(
            
            <Div>
                <ReponseQCM/>
                <ReponseQCM/>
                <Div id="reponsesQCM">

                </Div>
                <Button variant="outlined" sx={{ml:9, mr:2, mt:2}}>+</Button>

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
        this.state={lastQuestionId: 0}; 
        // On mets l'id de début de question à 0, on l'incrémente pour donner un nouvel id à chaque question.
    }
    render(){
        return(
            <div>
                <h1>Bienvenue dans la création de quiz</h1>

                <Stack spacing={2}>

                        <TextField
                        required
                        id="outlined-required"
                        label="Titre du quiz"
                        defaultValue=""
                        sx={{ml:3, mr:4, my:2}}
                        />

                    
                        <TextField
                        id="outlined-multiline-static"
                        label="Description du quiz"
                        multiline
                        rows={4}
                        defaultValue=""
                        sx={{ml:3, mr:4, my:2}}
                        />
                    
                        <ParamQuestion lastQuestionId={this.state.lastQuestionId}/>
                    
                </Stack>
                

            </div>
        

        )
    }
}

export default CreationQuiz;