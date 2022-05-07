import React, { Component } from 'react';

class InscriptionCours extends Component {
    state = {  
        nom : this.props.nom,
        dateCreation : this.props.dateCreation ,
        responsable : this.props.responsable,
        url : this.props.url,
        inscription : this.props.inscription
    } 
    render() { 
        return (
            <div>
                <h1>{this.state.nom}</h1>
                <h2>{this.props.responsable}</h2>
                <h3>{this.props.dateCreation}</h3>
                <form onSubmit={this.state.inscription} method='POST'>
                    <button type='submit'> S'inscrire au cours </button>
                </form>
            
            </div>
        );
    }
}
 
export default InscriptionCours;