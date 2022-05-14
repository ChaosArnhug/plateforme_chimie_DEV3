import React, { Component } from 'react';

import { Typography, Button } from '@mui/material';
import Box from '@mui/material/Box';
import { ThemeProvider } from '@mui/material/styles';
import theme from '../index.js';

class InscriptionCours extends Component {
    state = {  
        nom : this.props.nom,
        dateCreation : this.props.dateCreation ,
        responsable : this.props.responsable,
        url : this.props.url,
        inscription : this.props.inscription
    } 

    submitHandler = event => {
        event.preventDefault();
        fetch(this.state.inscription, {
            method: 'POST'
            
        }).then(res => {
                console.log(res)
                if (res.redirected){
                    window.location = "/utilisateurs/connexion"
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
                        height: 300, 
                        backgroundColor: 'box.main',  
                        '&:hover': {
                            backgroundColor: '#10812D', 
                            opacity: [1, 1, 0.9],}, 

                        }}>

                            <h1>{this.state.nom}</h1>
                            <h2>par {this.props.responsable}</h2>
                            <h3>depuis {this.props.dateCreation}</h3>
                            <Button 
                                variant="contained" 
                                sx={{
                                    ml:2, 
                                    mr:20, 
                                    my:2, 
                                    py:2, 
                                    bgcolor:"box.secondary", 
                                    fontSize:12
                                    }} 
                                onClick={this.submitHandler}
                            >
                                S'inscrire au cours
                            </Button>

                    </Box>
                </Typography>
            </ThemeProvider>
        );
    }
}
 
export default InscriptionCours;