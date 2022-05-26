//import { MenuItem } from '@mui/material';
import { Button } from '@mui/material';
import React, {Component} from 'react';
import {useParams} from 'react-router-dom';
import { flex } from '@mui/system';
import { unstable_styleFunctionSx, styled } from '@mui/system';
import CoursPage from './CoursPage';


// classe appelant les données nécessaire pour l'affichage d'un cours coté élève, appelle ensuite la classe permettant de l'afficher
class CoursPageTransi extends Component{
    constructor(props){
        super(props)
        this.state = {
            loading : true,
            data : null,
            cours : null,
            dataEleve : null
        }
    }
    
    //appelle les données nécessaire a l'affichage de la page de cours coté élèves
    async componentDidMount() {   
        const {cours} = this.props.params;
        const url1 = `http://141.94.26.80:5000/cours/${cours}/quiz`;
        const response1 = await fetch(url1);
        const data = await response1.json();

        const url2 = `http://141.94.26.80:5000/utilisateurs/quiz`;
        const response2 = await fetch(url2);
        const dataEleve = await response2.json();

        this.setState({loading : false, data : data, cours : cours, dataEleve : dataEleve}); 
    }
    
    //appelle la classe qui affiche les informations si toutes les données sont arrivées, sinon afficher loading 
    render(){
        return(
            <div>
            {this.state.loading || !this.state.data || !this.state.dataEleve ? ( 
                <div> Loading ... </div>
            ) : (
                <CoursPage data={this.state.data} cours={this.state.cours} dataEleve={this.state.dataEleve}/>  
            )}
        </div>
           
        )

    }
}

export default (props) => (
    <CoursPageTransi {...props} params={useParams()}/>
);


//{this.props.dataEleve.map((item3) =>(item3.idQuizs == item2.idQuiz && <p>✅</p>))} 







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

    /*
function tabForm (dataTraitement){
    let data = dataTraitement 
    let startChap = 0;
    console.log("dataTraitement = ");   
    console.log(dataTraitement);
    let tableauData = [];
    for (let i=0; i<dataTraitement.length; i++){
        if (dataTraitement.length !=1){
            if ( i != 0 && (dataTraitement[i].idChapitre != dataTraitement[i-1].idChapitre || i==dataTraitement.length-1)) {
                let implement = data.slice(startChap, i);
                tableauData.push(implement);
                startChap = i
            }
        }
        else{
            tableauData.push(dataTraitement);
        }
    }
    return tableauData;
}
*/