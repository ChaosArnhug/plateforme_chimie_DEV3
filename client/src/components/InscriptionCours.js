import React, { Component } from 'react';

import { Typography, Button, FormControl, TextField } from '@mui/material';
import Box from '@mui/material/Box';
import { ThemeProvider } from '@mui/material/styles';
import theme from '../index.js';

class InscriptionCours extends Component {
    state = {  
        nom : this.props.nom,
        dateCreation : this.props.dateCreation ,
        responsable : this.props.responsable,
        url : this.props.url,
        inscription : this.props.inscription,
        code : ''
    } 

    changeHandler = (e) =>{
        this.setState({[e.target.name] : e.target.value});
      } 

    submitHandler = event => {
        const params = new URLSearchParams();
        params.append("code", this.state.code);

        event.preventDefault();
        fetch(this.state.inscription, {
            method: 'POST',
            body: params
            
        }).then(res => {
                console.log(res)
                if (res.redirected){
                    window.location = "/utilisateurs/connexion"
                }
                if (res.status === 202){
                    alert("Demande déjà effectuée");
                }
                if (res.status === 403){
                    alert("Code incorrecte");
                }
                if (res.status === 200 && !res.redirected){
                    alert("Demande effectuée");
                }
            })
          .catch(err => console.log(err)) ;
      }

    render() { 
        return (
            <ThemeProvider theme={theme} >
                <Typography align={'center'} component={"span"} >
                    <Box sx={{
                        display: 'block',
                        margin: 2,
                        padding : 2, 
                        width: 450, 
                        height: 350, 
                        backgroundColor: 'box.main',  
                        '&:hover': {
                            backgroundColor: '#10812D', 
                            opacity: [1, 1, 0.9],}, 

                        }}>

                            <h1>{this.state.nom}</h1>
                            <h2>par {this.props.responsable}</h2>
                            <h3>depuis {this.props.dateCreation}</h3>
                            <FormControl>
                                <TextField name='code' label="Code cours" variant="outlined" 
                                    sx={{margin : 2, bgcolor:"#E4F2AE"}} onChange={this.changeHandler} type={'password'} required/>
                                    
                                <Button 
                                    variant="contained" 
                                    sx={{ml:2, mr:20, my:2, py:2, bgcolor:"box.secondary", fontSize:12 }} 
                                    onClick={this.submitHandler}
                                >
                                    S'inscrire au cours
                                </Button>
                            </FormControl>

                    </Box>
                </Typography>
            </ThemeProvider>
        );
    }
}
 
export default InscriptionCours;