import React, { Component } from 'react';
import InscriptionCours from './InscriptionCours';

import { Container} from '@mui/material';

//Génère un conteneur contenant les box d'inscription à un cours
class InscriptionCoursBox extends Component {
    state = { 
        url : "http://141.94.26.80:5000/cours",
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
            <Container maxWidth="sm" sx={{ backgroundColor: 'box.secondary'}} >
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
                </Container>
        );

    }
}
 
export default InscriptionCoursBox;