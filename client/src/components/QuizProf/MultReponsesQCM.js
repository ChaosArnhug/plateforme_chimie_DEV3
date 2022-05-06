import React, { Component } from 'react';


import { createTheme } from '@mui/material/styles';
import { unstable_styleFunctionSx, styled } from '@mui/system';
//import { styled } from '@mui/material/styles';


import TextField from '@mui/material/TextField';
import FormGroup from '@mui/material/FormGroup';
import FormControlLabel from '@mui/material/FormControlLabel';
import Checkbox from '@mui/material/Checkbox';



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



export default MultReponsesQCM;