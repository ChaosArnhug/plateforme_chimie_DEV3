//import { MenuItem } from '@mui/material';
import { Button } from '@mui/material';
import React, {Component} from 'react';
import {useParams} from 'react-router-dom';
import { flex } from '@mui/system';
import { unstable_styleFunctionSx, styled } from '@mui/system';



//Les balises HTML de base ne peuvent pas être modifiée avec sx={{.....}}. On doit créer un nouveau 
// type de balise à partir de celles-ci pouvant utiliser sx. 
const Fieldset = styled('fieldset')(unstable_styleFunctionSx);
const Div = styled('div')(unstable_styleFunctionSx);
const H4 = styled('h4')(unstable_styleFunctionSx);
const P = styled('p')(unstable_styleFunctionSx);


export class Test {
    prints = () => {
        return "aie"
    }
}


class CoursPage extends Component{

    tabForm = (dataTraitement) => {
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
    
    render() { 

        let tabData = this.tabForm(this.props.data);
        console.log("tabData = ");
        console.log(tabData);
        console.log("dataeleve = ");
        console.log(this.props.dataEleve);
        return (
            <div>
                <h1>{this.props.cours}</h1>  
                {tabData.map((item) => (
                    (item[0].chapEstVisible == 1 &&
                        <Fieldset sx={{bgcolor: "#FFD700", ml:5, mr:20, my:2, py:3, border: 2}}>
                            <H4 sx={{ml:3, py:1}}>{item[0].titreChapitre}</H4>
                            {item.map((item2) => (
                                (item2.disponnible == 1 &&
                                <Div sx={{ml:3, display: 'flex'}}>
                                    <P sx={{py: 1}}>{item2.description}</P>
                                    <Button sx={{ml:3, mr:3}} id={`${item2.idQuiz}`} href={`http://localhost:3000/cours/${this.props.cours}/quiz/${item2.idQuiz}`} >{item2.titre}</Button> 
                                    {this.props.dataEleve.map((item3) =>(
                                        item3.titre == item2.titre  && <P sx={{ml: 1, py: 1}}>✅ {item3.resultat}/{item3.total}</P>
                                    ))}                             
                                </Div>   
                                )
                            ))}
                        </Fieldset>
                    )
                ))}
            </div>
        );
    }
    // remplacer dans href item.titre par item.idQuiz


}




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
    

    async componentDidMount() {   
        const {cours} = this.props.params;
        const url1 = `http://localhost:5000/cours/${cours}/quiz`;
        const response1 = await fetch(url1);
        const data = await response1.json();

  /*      const utilisateur_id = 2; demande dynamique a mettre  */
        const url2 = `http://localhost:5000/utilisateurs/quiz`;
        const response2 = await fetch(url2);
        const dataEleve = await response2.json();
        console.log("dataeleve = ");
        console.log(dataEleve);

        this.setState({loading : false, data : data, cours : cours, dataEleve : dataEleve}); //rajouter dataEleve : dataEleve
    }

    render(){
        return(
            <div>
            {this.state.loading || !this.state.data || !this.state.dataEleve ? (  //rajouter || !this.state.dataEleve
                <div> Loading ... </div>
            ) : (
                <CoursPage data={this.state.data} cours={this.state.cours} dataEleve={this.state.dataEleve}/>  //rajouter dataEleve={this.props.dataEleve}   
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