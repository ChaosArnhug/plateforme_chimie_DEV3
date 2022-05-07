import React, { Component } from 'react';
import InscriptionCours from './InscriptionCours';

class InscriptionCoursBox extends Component {
    state = { 
        url : "http://localhost:5000/cours",
        loading : true,
        data : null
    } 

    async componentDidMount () {
        const url = ths.state.url;
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
                            cours => 
                                <InscriptionCours key={cours.nom} nom={cours.nom} dateCreation={cours.dateCreation} 
                                responsable={cours.responsable} url={cours.url} inscription={cours.inscription}/> 
                            )} 
                    </div>
                )}
            </div>
        );
    }
}
 
export default QuizBox;