import React, { Component } from 'react';
import ConfirmationInscription from './ConfirmationInscription';

class ConfirmationInscriptionBox extends Component {
    state = { 
        url : "http://localhost:5000/cours/utilisateurs/demande",
        loading : true,
        data : null
    } 

    async componentDidMount () {
        const url = this.state.url;
        const response = await fetch(url);
        const data = await response.json();
        this.setState({loading : false, data : data})
        
    }

    render() { 
        return (
            <div>
                {this.state.loading || !this.state.data ? (
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
            </div>
        );
    }
}
 
export default ConfirmationInscriptionBox;