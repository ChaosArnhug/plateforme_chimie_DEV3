import React, { Component } from 'react';

import { Typography, Button} from '@mui/material';
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
        }).then( (res) =>{
        
        }
        
        )
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
                            <table>
                                <tbody>
                                    <tr>
                                        <th> Utilisateur : </th>
                                        <td>{this.state.utilisateur}</td>
                                    </tr>
                                    <tr>
                                        <th> Cours : </th>
                                        <td>{this.state.cours}</td>
                                    </tr>
                                    <tr>
                                        <th> Date de la demande : </th>
                                        <td>{this.state.date_demande}</td>
                                    </tr>
                                    <tr>
                                        <th> Groupe : </th>
                                        <td>{this.state.groupe}</td>
                                    </tr>
                                    <tr>
                                        <th> Classe : </th>
                                        <td>{this.state.classe}</td>
                                    </tr>
                                </tbody>
                            </table>
                            <br></br>
                            <br></br>
                            
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