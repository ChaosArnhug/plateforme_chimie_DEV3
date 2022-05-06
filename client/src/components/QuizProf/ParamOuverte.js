import React, { Component } from 'react';


import { createTheme } from '@mui/material/styles';
import { unstable_styleFunctionSx, styled } from '@mui/system';
//import { styled } from '@mui/material/styles';


import TextField from '@mui/material/TextField';


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



class ParamOuverte extends Component{
  constructor(props){
    super(props);
    
  }

  async componentDidMount(){
    alert("ParamOuverte se monte")
    let reponseId = await this.props.addReponseInDataArray(this.props.questionId); // La fonction renvoie l'id de réponse qu'elle à générée et ajoutée dans l'objet dans myQuestionsArray
    alert("reponseId "+reponseId)
    await this.setState({"reponseId" : reponseId}); // ici this.state est celui du composant ParamOuverte
    alert(this.state.reponseId);

    // Quand on render une nouvelle question -> ok, nouvel questionId, quand on en render plusieurs -> ont tous le même questionId
}

  render(){
      return(
          <TextField
          required
          id="outlined-required"
          label="Réponse"
          defaultValue=""
          sx={{ml:9, mr:4, mt:2}}
          onBlur={ (event)=>{
            this.props.updateQuestionData(
                this.state.questionId, "texteReponse", event.target.value
            )   
          }}
          />
      )
  }
}


export default ParamOuverte;