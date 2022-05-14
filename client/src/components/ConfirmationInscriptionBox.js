import React, { Component } from 'react';
import ConfirmationInscription from './ConfirmationInscription';

import { Container} from '@mui/material';

class ConfirmationInscriptionBox extends Component {
    state = { 
        url : "http://localhost:5000/utilisateurs/demande",
        loading : true,
        data : null
    } 

    async componentDidMount () {
        const url = this.state.url;
        const response = await fetch(url);

        if (response.redirected){
            window.location = '/utilisateurs/connexion';
        }

        const data = await response.json();
        this.setState({loading : false, data : data})
        
    }

    render() { 
        return (
            <Container maxWidth="sm" sx={{ backgroundColor: 'box.secondary'}} >
                {this.state.loading || this.state.data != [] ? (
                    <div> Loading ... </div>
                ) : (
                    <div> 
                        {this.state.data.map( 
                            demande => 
                                <ConfirmationInscription key={demande.confirmation} utilisateur={demande.utilisateur} groupe={demande.groupe}
                                classe={demande.classe} cours={demande.cours} date_demande={demande.date_demande} confirmation={demande.confirmation}/> 
                            )} 
                    </div>
                )}
            </Container>
        );
    }
}
 
export default ConfirmationInscriptionBox;