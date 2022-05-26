import React, { Component } from 'react';


import { createTheme } from '@mui/material/styles';
import { unstable_styleFunctionSx, styled } from '@mui/system';
//import { styled } from '@mui/material/styles';


import TextField from '@mui/material/TextField';
import FormGroup from '@mui/material/FormGroup';
import FormControlLabel from '@mui/material/FormControlLabel';
import Checkbox from '@mui/material/Checkbox';

//import theme from "../../index.js"

const H1 = styled('h1')(unstable_styleFunctionSx);

// import theme from '../index.js'
// Faire un import au lieu de recréer le theme fait que rien ne s'affiche -> ?

/*
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
*/

//Les balises HTML de base ne peuvent pas être modifiée avec sx={{.....}}. On doit créer un nouveau 
// type de balise à partir de celles-ci pouvant utiliser sx. 
const Div = styled('div')(unstable_styleFunctionSx);




class ReponseQCM extends Component{
    constructor(props){
        super(props);
        this.state={
            isCorrect : false
        }
    }


    async componentDidMount(){
        let reponseId = await this.props.addReponseInDataArray(this.props.questionId, false); 
        // La fonction renvoie l'id de réponse qu'elle à générée et ajoutée dans l'objet dans myQuestionsArray
        await this.setState({"reponseId" : reponseId}); // ici this.state est celui du composant ParamOuverte
        
    }


    async changeQCMResponseState(){
        let newIsCorrect = await !this.state.isCorrect;
        await this.setState({"isCorrect" : newIsCorrect});
        await this.props.updateReponseData(
            this.props.questionId, this.state.reponseId, "isCorrect", this.state.isCorrect
        );
    }


    render(){
        return(
            <Div sx={{display:"flex"}}>
                <H1 sx={{py:2, ml:5}}>{this.props.numQuestion}</H1>
                <TextField
                required
                id="outlined-required"
                label="Réponse QCM"
                data-testid="Réponse QCM"
                defaultValue=""
                sx={{ml:2, mr:2, mt:2}}
                onBlur={ (event)=>{
                    this.props.updateReponseData(
                        this.props.questionId, this.state.reponseId, "texteReponse", event.target.value
                    )   
                  }}
                />
                <FormGroup sx={{mr:4, my:"auto"}}>
                    <FormControlLabel data-testid="isCorrectOrNot" control={<Checkbox onClick={(event) => {
                        this.changeQCMResponseState();
                        
                    }}/>} label="Est une bonne réponse" />
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
    
    limitResponsesAmount(number){
        /**
         * Limite le nombres de ReponsesQCM générés. On ne devrait normalement pas être en dessous de 1 et au dessus de 10. 
         */
        if ((1<=number ) && (number<=10)){
            return number
        }
        else if(number < 1){
            return 1
        }
        else{ // si number > 10
            return 10
        }
    }


    render(){
        return(
            // Générer un certain nombre de <ReponseQCM/> en fonction du nombre de réponses qu'on veut mettre

            this.state.totReponseArr.slice(0, this.limitResponsesAmount(this.props.nmbreQCMReponses)).map(item =>(
                <ReponseQCM 
                key={this.state.reponseId}
                numQuestion={item}
                questionId={this.props.questionId}
                addReponseInDataArray={this.props.addReponseInDataArray}
                updateReponseData={this.props.updateReponseData}
                />
              ))
            
        )
    }
}



export {
    MultReponsesQCM,
    ReponseQCM,
}