import React, { Component } from 'react';
import ReactDOM from 'react-dom';


import {ThemeProvider, createTheme } from '@mui/material/styles';
import { unstable_styleFunctionSx, styled } from '@mui/system';
//import { styled } from '@mui/material/styles';

import Box from '@mui/material/Box';
import TextField from '@mui/material/TextField';
import FormGroup from '@mui/material/FormGroup';
import FormControlLabel from '@mui/material/FormControlLabel';
import Checkbox from '@mui/material/Checkbox';

import ParamOuverte from "./ParamOuverte.js";
import ParamQCM from "./ParamQCM.js";


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



// Composant React pour la structure de param. de question
class ParamQuestion extends Component{
    constructor(props){
        super(props);
        this.state={isQCM:true }; // problème avec fonction
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

    componentDidMount(){
        this.props.addQuestionInDataArray();  // rien ne render
        // Ajout d'une question dans l'objet de données 
    }
    
    componentWillUnmount(){
        this.props.remQuestionInDataArray();
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



export default ParamQuestion;