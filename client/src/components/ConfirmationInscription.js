import React, { Component } from 'react';

import { Typography, Button } from '@mui/material';
import Box from '@mui/material/Box';
import { ThemeProvider } from '@mui/material/styles';
import theme from '../index.js';

class ConfirmationInscription extends Component {
    state = {  
        utilisateur : this.props.utilisateur,
        groupe : this.props.groupe,
        classe : this.props.classe,
        cours : this.props.cours,
        date_demande : this.props.date_demande,
        confirmation : this.props.confirmation
    } 

    submitValidation = event =>{
        event.preventDefault();
        fetch(this.state.confirmation, {
            method : 'POST'
        })

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
                            opacity: [0.9, 0.8, 0.7],}, 

                        }}>
                            <ul>
                                <li>utilisateur : {this.state.utilisateur}</li>
                                <li>groupe : {this.state.groupe} </li>
                                <li>classe : {this.state.classe}</li>
                                <li>cours : {this.state.cours}</li>
                                <li>date de la demande : {this.state.date_demande}</li>
                            </ul>
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
                                onClick={this.submitValidation}
                            >
                                Valider
                            </Button>

                    </Box>
                </Typography>
            </ThemeProvider>

        );
    }
}
 
export default ConfirmationInscription;
