import { Button } from '@mui/material';
import React, {Component} from 'react';
import {useParams} from 'react-router-dom';
import { flex } from '@mui/system';
import { unstable_styleFunctionSx, styled } from '@mui/system';



// permet de faire du CSS sur les balises 
const Fieldset = styled('fieldset')(unstable_styleFunctionSx);
const Div = styled('div')(unstable_styleFunctionSx);
const H4 = styled('h4')(unstable_styleFunctionSx);
const P = styled('p')(unstable_styleFunctionSx);

// classe affichant les pages de cours avec les fonctionnalités élèves 
class CoursPage extends Component{

    constructor(props){
        super(props)
        this.state = {
            loading : true,
            data : this.props.data,
            cours : this.props.cours,
            dataEleve : this.props.dataEleve
        }
    }

    //fonction retournant le tableau de quiz recus en argument en tableau de tableaux de ces quizs trier par chapitre
    tabForm = (dataTraitement) => {
        let data = dataTraitement 
        let startChap = 0;
        console.log("dataTraitement = ");   
        console.log(dataTraitement);
        let tableauData = [];
        for (let i=0; i<dataTraitement.length; i++){
            if (dataTraitement.length !=1){
                if ( i != 0 && (dataTraitement[i].idChapitre != dataTraitement[i-1].idChapitre || i==dataTraitement.length-1)) {
                    if (i==dataTraitement.length-1) {
                        let implement = data.slice(startChap, i+1);
                        tableauData.push(implement);
                    }
                    else{
                        let implement = data.slice(startChap, i);
                        tableauData.push(implement);
                        startChap = i
                    }    
                }
            }
            else{
                tableauData.push(dataTraitement);
            }
        }
        return tableauData;
    }
    
    // render tout les éléments visible de la page (chapitre, quiz et bouton, notes obtenues)
    render() { 

        let tabData = this.tabForm(this.state.data);
        return (
            <div>
                <h1>{this.state.cours}</h1>  
                {tabData.map((item) => (
                    (item[0].chapEstVisible == 1 &&
                        <Fieldset sx={{bgcolor: "#FFD700", ml:5, mr:20, my:3, py:5, border: 2}}>
                            <H4 sx={{ml:3, py:1}}>{item[0].titreChapitre}</H4>
                            {item.map((item2) => (
                                (item2.disponnible == 1 &&
                                <Div sx={{ml:3, display: 'flex'}}>
                                    <P sx={{py: 1}}>{item2.description}</P>
                                    <Button sx={{ml:3, mr:3}} type="button" data-testid={`${item2.idQuiz}`} href={`http://localhost:3000/cours/${this.state.cours}/quiz/${item2.idQuiz}`} >{item2.titre}</Button> 
                                    {this.state.dataEleve.map((item3) =>(
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


}
export default (props) => (
    <CoursPage {...props}/>
);