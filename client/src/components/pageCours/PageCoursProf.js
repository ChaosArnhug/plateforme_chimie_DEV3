import { Button, Checkbox } from '@mui/material';
import React, {Component} from 'react';
import {useParams, useNavigate} from 'react-router-dom';
import axios from 'axios';
import { unstable_styleFunctionSx, styled } from '@mui/system';



// permet de faire du CSS sur les balises 
const Fieldset = styled('fieldset')(unstable_styleFunctionSx);
const Div = styled('div')(unstable_styleFunctionSx);
const H4 = styled('h4')(unstable_styleFunctionSx);
const Form = styled('form')(unstable_styleFunctionSx);
const P = styled('p')(unstable_styleFunctionSx);

//fonction retournant le tableau de quiz recus en argument en tableau de tableaux de ces quizs trier par chapitre
function tabForm (dataTraitement){
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

// permet de changer la visibilité d'un chapitre, endpoint inexistant -> n'appelle rien
function ChangeVisibiliteChap(arg1, arg2, arg3){
    const params = new URLSearchParams();
    params.append("idChapitre", arg3);
    params.append("chapEstVisible", !arg2);
    axios.post("http://141.94.26.80:5000/ChapitreVisibilite", params)
    .then(res => console.log(res)).catch(err => console.log(err)) ;
}

// permet de changer la visibilité d'un quiz, endpoint inexistant -> n'appelle rien
function ChangeVisibiliteQuiz(arg1, arg2, arg3){
    const params = new URLSearchParams();
    params.append("idQuiz", arg3);
    params.append("disponnible", !arg2);
    axios.post("http://141.94.26.80:5000/quizVisibilite", params)
    .then(res => console.log(res)).catch(err => console.log(err)) ;

}

// classe affichant les pages de cours avec les fonctionnalités professeurs 
class CoursPageProf extends Component{


    constructor(props){
        super(props)
        this.state = {
            loading : true,
            data : null,
            cours : null,
            newChapitre : null
        }

    }

    //fctn ajoutant un chapitre à la base de donnée, et redirigeant vers la création d'un quiz -> à réparer 
    AddChap = (form) => {
        form.preventDefault();
        const params = new URLSearchParams();
        params.append("titreChapitre", this.state.newChapitre);
        params.append("estVisible", 1);
        axios.post(`http://141.94.26.80:5000/cours/${this.props.cours}/chapitre`, params)
        .then(res => console.log(res)).catch(err => console.log(err)) ;
//        window.location=`/quiz/${this.props.cours}/${this.state.newChapitre}/creation`;   
    }
    

    changeHandler = (e) =>{
        this.setState({newChapitre : e.target.value});
    } 

    // render tout les éléments visible de la page (chapitre (avec visibilité et bouton supprimer), quiz (avec desc, bouton, visibilité et bouton supprimer), bouton creation quiz, ajout chapitre)
    render() { 
        let tabData = tabForm(this.props.data);
        return (
            <div>
                <h1>{this.props.cours}</h1>  
                {tabData.map((item) => (                  
                        <Fieldset sx={{bgcolor: "#FFD700", ml:5, mr:20, my:2, py:3, border: 2, borderColor: "#000"}}>
                            <H4 sx={{ml:3}}>{item[0].titreChapitre}</H4>
                            <Form  sx={{ml:3}}>
                                <label>
                                    chapitre visible:  
                                    <input defaultChecked={item[0].chapEstVisible} type="Checkbox" onClick={(event) =>{ChangeVisibiliteChap(event.target.value, item[0].chapEstVisible, item[0].idChapitre)}}/>
                                </label>
                            </Form>
                            <Button sx={{ml:3, my:2, bgcolor: "#fff"}}>supprimer chapitre</Button>  
                            {item.map((item2) => (        
                                <Div sx={{ml:3, my:2, display: 'flex'}}>
                                    <P sx={{py:1}}>{item2.description}</P>
                                    <Button sx={{ml:3, mr:2}} href={`http://141.94.26.80:3000/cours/${this.props.cours}/quiz/${item2.idQuiz}`} >{item2.titre}</Button>
                                    <Form sx={{ml:3, mr:3, py:1}}>
                                        <label>
                                            visible:  
                                            <input defaultChecked={item2.disponnible} type="Checkbox" onClick={(event) =>{ChangeVisibiliteQuiz(event.target.value, item2.disponnible, item2.idQuiz)}} />
                                        </label>
                                    </Form>                                    
                                    <Button >supprimer</Button>                            
                                </Div>       
                            ))}
                            <Button sx={{ml:3, py:1, bgcolor: "#fff"}} href={`http://141.94.26.80:3000/quiz/${this.props.cours}/${item[0].titreChapitre}/creation`}>+ creation de quiz +</Button>
                        </Fieldset>                  
                ))}
                <Form sx={{ml:5, mr:20, my:2, py:3}} onSubmit={this.AddChap}>
                    <input name="newChapitre" type="text" defaultValue="" onChange={this.changeHandler}></input>
                    <input type="submit"></input>
                </Form>
            </div>
        );
    }
}

// classe appelant les données nécessaire pour l'affichage d'un cours coté prof, appelle ensuite la classe permettant de l'afficher
class PageCoursProf extends Component{
    constructor(props){
        super(props)
        this.state = {
            loading : true,
            data : null,
            cours : null,
        }
    }
    
    //appelle les quiz créer du cours
    async componentDidMount() {   
        const {cours} = this.props.params;
        const url1 = `http://141.94.26.80:5000/cours/${cours}/quiz`;
        const response1 = await fetch(url1);
        const data = await response1.json();

        await this.setState({loading : false, data : data, cours : cours});
    }
    //appelle la classe qui affiche les informations si toutes les données sont arrivées, sinon afficher loading 
    render(){
        return(
            <div>
            {this.state.loading || !this.state.data ? (  
                <div> Loading ... </div>
            ) : (
                <CoursPageProf data={this.state.data} cours={this.state.cours}/>   
            )}
        </div>
           
        )

    }
}

export default (props) => (
    <PageCoursProf {...props} params={useParams()}/>
);
