import React, { Component } from 'react';
import axios from 'axios';

import { FormControl , TextField, Container, FormLabel, Button} from '@mui/material';
import { ThemeProvider, createTheme } from '@mui/material/styles';

const theme = createTheme({
  palette: {
    primary: {
      main: '#E4F2AE',
    },
    secondary: {
      main: '#E4F2AE',
      button: '#10812D'
    },
    box: {
      main: "#10812D",
      secondary: "#E4F2AE"
    }
  },
});


class UserInscription extends Component{
    state = {
      email : '',
      motDePasse :'',
      nom :'',
      prenom : '',
      groupe :'',
      classe:''
    }

    submitHandler = form =>{
      form.preventDefault();
      const params = new URLSearchParams();
      params.append("email", this.state.email);
      params.append("motDePasse", this.state.motDePasse);
      params.append("nom", this.state.nom);
      params.append("prenom", this.state.prenom);
      params.append("groupe", this.state.groupe);
      params.append("classe", this.state.classe);
      
      
      axios.post("http://localhost:5000/utilisateurs/inscription", params)
        .then(res => console.log(res)).catch(err => console.log(err)) ;
    }
  
    changeHandler = (e) =>{
      this.setState({[e.target.name] : e.target.value});
    } 

    render(){
      return(
        /*<form onSubmit={this.submitHandler}>
          <
          <label for={"classe"}>Classe :</label>
          <input type={"text"} id={"classe"} name={"classe"} onChange={this.changeHandler}></input>
          <input type={"submit"} value={"Submit"}></input>

        </form>*/
        <ThemeProvider theme={theme}>
          <Container  maxWidth="sm" sx={{ backgroundColor: 'box.main'}}>
          
            <FormControl>
              <FormLabel sx={{margin:2}}>Inscription à la plateforme</FormLabel>
                <TextField id="email" name='email' label="Email" variant="outlined" 
                    sx={{margin : 2, bgcolor:"#E4F2AE"}} onChange={this.changeHandler} required />

                <TextField id="motDePasse" name="motDePasse" label="Mot de Passe" variant="outlined" 
                    sx={{margin : 2, bgcolor:"#E4F2AE"}} onChange={this.changeHandler} required type={"password"} />

                <TextField id="nom" name="nom" label="Nom" variant="outlined" 
                    sx={{margin : 2, bgcolor:"#E4F2AE"}} onChange={this.changeHandler} required />

                <TextField id="prenom" name="prenom" label="Prenom" variant="outlined" 
                    sx={{margin : 2, bgcolor:"#E4F2AE"}} onChange={this.changeHandler} required />

                <TextField id="groupe" name="groupe" label="Groupe" variant="outlined" 
                    sx={{margin : 2, bgcolor:"#E4F2AE"}} onChange={this.changeHandler} required />

                <TextField id="classe" name="classe" label="Classe" variant="outlined" 
                    sx={{margin : 2, bgcolor:"#E4F2AE"}} onChange={this.changeHandler} required />

                <Button variant="contained" sx={{ml:2, mr:20, my:2, py:2, bgcolor:"#E4F2AE", fontSize:12}} onClick={this.submitHandler}>
                    Inscription
                </Button>
            </FormControl>
          </Container>
        </ThemeProvider>
      )
    }
    
  }


export default UserInscription;