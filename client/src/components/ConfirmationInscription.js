import React, { Component } from 'react';
import axios from 'axios'

class ConfirmationInscription extends Component {
    state = {  
        utilisateur : this.props.utilisateur,
        groupe : this.props.groupe,
        classe : this.props.classe,
        cours : this.props.cours,
        date_demande : this.props.date_demande,
        confirmation : this.props.confirmation
    } 

    submitHandler = (form) =>{
        form.preventDefault();
        axios.post(this.state.confirmation)

    }
    render() { 
        return (
            <div>
                <p>utilisateur : {this.state.utilisateur}</p>
                <p>groupe : {this.state.groupe}</p>
                <p>classe : {this.state.classe}</p>
                <p>cours : {this.state.cours}</p>
                <p>date de la demande : {this.state.date_demande}</p>
                <form onSubmit={this.submitHandler}>
                    <button type='submit'> Confirmer l'inscription </button>
                </form>
            </div>
        );
    }
}
 
export default ConfirmationInscription;
