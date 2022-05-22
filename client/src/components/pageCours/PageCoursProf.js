import { Button, Checkbox } from '@mui/material';
import React, {Component} from 'react';
import {useParams} from 'react-router-dom';
import axios from 'axios';
import { unstable_styleFunctionSx, styled } from '@mui/system';



//Les balises HTML de base ne peuvent pas être modifiée avec sx={{.....}}. On doit créer un nouveau 
// type de balise à partir de celles-ci pouvant utiliser sx. 
const Fieldset = styled('fieldset')(unstable_styleFunctionSx);
const Div = styled('div')(unstable_styleFunctionSx);
const H4 = styled('h4')(unstable_styleFunctionSx);
const Form = styled('form')(unstable_styleFunctionSx);
const P = styled('p')(unstable_styleFunctionSx);


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
 //   this.setState({data: tableauData, cours: coursActu})
    return tableauData;
}


function AddChap(){
    console.log("ca marche")
}

function ChangeVisibiliteChap(arg1, arg2, arg3){
    console.log("ca marche visibilité chapitre")
    console.log(arg1)
    console.log(arg2)
    console.log(arg3)
    const params = new URLSearchParams();
    params.append("idChapitre", arg3);
    params.append("chapEstVisible", !arg2);
    axios.post("http://localhost:5000/ChapitreVisibilite", params)
    .then(res => console.log(res)).catch(err => console.log(err)) ;
}

function ChangeVisibiliteQuiz(arg1, arg2, arg3){
    console.log("ca marche visibilité quiz")
    console.log(arg1)
    console.log(arg2)
    console.log(arg3)
    const params = new URLSearchParams();
    params.append("idQuiz", arg3);
    params.append("disponnible", !arg2);
    axios.post("http://localhost:5000/quizVisibilite", params)
    .then(res => console.log(res)).catch(err => console.log(err)) ;

}


class CoursPageProf extends Component{


    constructor(props){
        super(props)
        this.state = {
            loading : true,
            data : null,
            cours : null,
        }

    }

    render() { 

        let tabData = tabForm(this.props.data);
        console.log("tabData = "); // a retirer final
        console.log(tabData); // pareil
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
                                    <Button sx={{ml:3, mr:2}} href={`http://localhost:3000/cours/${this.props.cours}/quiz/${item2.idQuiz}`} >{item2.titre}</Button>
                                    <Form sx={{ml:3, mr:3, py:1}}>
                                        <label>
                                            visible:  
                                            <input defaultChecked={item2.disponnible} type="Checkbox" onClick={(event) =>{ChangeVisibiliteQuiz(event.target.value, item2.disponnible, item2.idQuiz)}} />
                                        </label>
                                    </Form>                                    
                                    <Button >supprimer</Button>                            
                                </Div>       
                            ))}
                            <Button sx={{ml:3, py:1, bgcolor: "#fff"}} href={`http://localhost:3000/quiz/${this.props.cours}/${item[0].titreChapitre}/creation`}>+ creation de quiz +</Button>
                        </Fieldset>                  
                ))}
                <Form sx={{ml:5, mr:20, my:2, py:3}} onSubmit={AddChap()}>
                    <input type="text" defaultValue="+ chapitre +"></input>
                    <input type="submit"></input>
                </Form>
            </div>
        );
    }
//<Checkbox id={`${item2.titre}`} onClick={ChangeVisibilite()}></Checkbox>

}

class PageCoursProf extends Component{
    constructor(props){
        super(props)
        this.state = {
            loading : true,
            data : null,
            cours : null,
        }
    }
    

    async componentDidMount() {   
        const {cours} = this.props.params;
        const url1 = `http://localhost:5000/cours/${cours}/quiz`;
        const response1 = await fetch(url1);
        const data = await response1.json();

        await this.setState({loading : false, data : data, cours : cours});
    }

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

/*class ChangeVisibiliteChap2 extends Component{

    state = {
      email : '',
      motDePasse : ''
    }
  
  
    submitHandler = form =>{
      form.preventDefault();
      const params = new URLSearchParams();
      params.append("email", this.state.email);
      params.append("motDePasse", this.state.motDePasse);
      axios.post("http://localhost:5000/utilisateurs/connexion", params)
        .then(res => console.log(res)).catch(err => console.log(err)) ;
    }
  
    changeHandler = (e) =>{
      this.setState({[e.target.name] : e.target.value});
    } 
  
  
      render(){
        return(
          <form onSubmit={this.submitHandler}>
  
            <label for={"eamil"}>Email :</label>
            <input type={"text"} id={"email"} name={"email"} onChange={this.changeHandler}></input>
            <label for={"motDePasse"}>Mot de passe:</label>
            <input type={"text"} id={"motDePasse"} name={"motDePasse"} onChange={this.changeHandler}></input>
            <input type={"submit"} value={"Submit"}></input>
  
          </form>
        )
      }
      
    }*/

export default (props) => (
    <PageCoursProf {...props} params={useParams()}/>
);