//import { MenuItem } from '@mui/material';
import { Button } from '@mui/material';
import React, {Component} from 'react';
import {useParams} from 'react-router-dom';

function tabForm (dataTraitement){
    startChap = 0;
    tableauData = [];
    for (i=0, i<dataTraitement.length, i++){
        if (dataTraitement[i].idChapitre != dataTraitement[i-1].idChapitre && i!= 0 && i==dataTraitement.length-1) {
            tabData.add(dataTraitement.slice(startChap, i-1));
            startChap = i;
        }
    }
    return tableauData;
}

class CoursPage extends Component{
    
    render() { 

        tabData = tabForm(this.props.data);
        
        return (
            <div>
                <h1>{this.props.cours}</h1>  
                {tabData.map((item) => (
                    {item[0].estVisible == 1 &&
                        <fieldset>
                            <legend>{item[0].titreChapitre}</legend>
                            {item.map((item2) => (
                                (item2.disponnible == 1 &&
                                <div>
                                    <p>{item2.description}</p>
                                    <Button href={`http://localhost:3000/cours/${this.props.cours}/quiz/${item2.titre}`} >{item2.titre}</Button>                              
                                </div>   
                            )
                            ))}
                        </fieldset>
                    }
                ))}
            </div>
        );
    }
    // remplacer dans href item.titre par item.idQuiz


}

class PageCours extends Component{
    constructor(props){
        super(props)
        this.state = {
            loading : true,
            data : null,
            cours : null,
//            dataEleve : null
        }
    }
    

    async componentDidMount() {   
        const {cours} = this.props.params;
        const url1 = `http://localhost:5000/cours/${cours}/quiz`;
        const response1 = await fetch(url1);
        const data = await response1.json();

//        const utilisateur_id = 1; //demande dynamique a mettre
//        const url2 = `http://localhost:5000/utilisateurs/${utilisateur_id}/quiz`;
//        const response2 = await fetch(url2);
//        const dataEleve = await response2.json();

        await this.setState({loading : false, data : data, cours : cours}); //rajouter dataEleve : dataEleve
    }

    render(){
        return(
            <div>
            {this.state.loading || !this.state.data ? (  //rajouter || !this.state.dataEleve
                <div> Loading ... </div>
            ) : (
                <CoursPage data={this.state.data} cours={this.state.cours}/>  //rajouter dataEleve={this.props.dataEleve}   
            )}
        </div>
           
        )

    }
}

export default (props) => (
    <PageCours {...props} params={useParams()}/>
);


//{this.props.dataEleve.map((item2) =>(item2.idQuizs == item.idQuiz && <p>✅</p>))} 







/*
                (item.idChapitre != compteurChapitre && item.estvisible ==1 &&
                    <fieldset>
                        <legend>{item.idChapitre}</legend>
                        {compteurChapitre = item.idChapitre}
                )
                 
                (suiviCompteurChapitre++)
                (item.idChapitre != this.props.data[suiviCompteurChapitre].idChapitre &&
                    </fieldset>   
                )                 
            ))}
        
    </div>
);


*/

/*

   render() {       
        return (
            <div>
                <h1>{this.props.cours}</h1>
                <fieldset>
                    <legend>{this.props.cours}</legend>
                {this.props.data.map((item) => (
                    item.disponnible == 1 &&
                        <div>
                            <p>{item.description}</p>
                            <Button href={`http://localhost:3000/cours/${this.props.cours}/quiz/${item.titre}`} >{item.titre}</Button>                              
                        </div>                   
                ))}
                </fieldset>
            </div>
        );
    }

    */
