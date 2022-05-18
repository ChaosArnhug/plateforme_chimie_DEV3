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

class UserConnection extends Component{

  state = {
    email : '',
    motDePasse : ''
  }


  submitHandler = form =>{
    const urlToconnexion = "http://localhost:5000/utilisateurs/connexion";

    form.preventDefault();
    const params = new URLSearchParams();
    params.append("email", this.state.email);
    params.append("motDePasse", this.state.motDePasse);
    
    axios.post(urlToconnexion, params)
      .then(res => {
        if (res.request.responseURL != urlToconnexion){
          window.location = "/";
        }        
      })
      .catch(err => console.log(err)) ;
  }

  changeHandler = (e) =>{
    this.setState({[e.target.name] : e.target.value});
  } 


    render(){
      return(
        <ThemeProvider theme={theme}>
          <Container  maxWidth="sm" sx={{ backgroundColor: 'box.main'}}>
          
            <FormControl>
              <FormLabel sx={{margin:2}}>Connexion à la plateforme</FormLabel>
                <TextField id="email" name='email' label="Email" variant="outlined" 
                    sx={{margin : 2, bgcolor:"#E4F2AE"}} onChange={this.changeHandler} required/>

                <TextField id="motDePasse" name="motDePasse" label="Mot de Passe" variant="outlined" 
                    sx={{margin : 2, bgcolor:"#E4F2AE"}} onChange={this.changeHandler} required type={"password"}/>

                <Button variant="contained" sx={{ml:2, mr:20, my:2, py:2, bgcolor:"#E4F2AE", fontSize:12}} onClick={this.submitHandler}>
                     Connexion
                </Button>
            </FormControl>
          </Container>
        </ThemeProvider>
      )
    }
    
  }


export default UserConnection;