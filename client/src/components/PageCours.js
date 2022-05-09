//import { MenuItem } from '@mui/material';
import { Button } from '@mui/material';
import React, {Component} from 'react';
import {useParams} from 'react-router-dom';

function tabForm (dataTraitement){
    let data = dataTraitement 
    let startChap = 0;
    console.log("dataTraitement = ");   
    console.log(dataTraitement);
    let tableauData = [];
    for (let i=0; i<dataTraitement.length; i++){
        if (dataTraitement.length !=1){
 //           console.log("i = "+dataTraitement[3].idChapitre+" et i-1 = "+dataTraitement[2].idChapitre);
            if ( i != 0 && (dataTraitement[i].idChapitre != dataTraitement[i-1].idChapitre || i==dataTraitement.length-1)) {
                let implement = data.slice(startChap, i);
//                console.log("implement = ");    
//                console.log(implement.slice(1, 2));
                tableauData.push(implement);
                startChap = i
  //              console.log("je passe");
            }
        }
        else{
            tableauData.push(dataTraitement);
  //          console.log("c est ca");
        }
    }
 //   console.log("tableauData = ");
 //   console.log(tableauData);
    return tableauData;
}

class CoursPage extends Component{
    
    render() { 

        let tabData = tabForm(this.props.data);
        console.log("tabData = ");
        console.log(tabData);
        return (
            <div>
                <h1>{this.props.cours}</h1>  
                {tabData.map((item) => (
                    (item[0].chapEstVisible == 1 &&
                        <fieldset>
                            <legend>{item[0].titreChapitre}</legend>
                            {item.map((item2) => (
                                (item2.disponnible == 1 &&
                                <div>
                                    <p>{item2.description}</p>
                                    <Button href={`http://localhost:3000/cours/${this.props.cours}/quiz/${item2.idQuiz}`} >{item2.titre}</Button>                              
                                </div>   
                                )
                            ))}
                        </fieldset>
                    )
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
