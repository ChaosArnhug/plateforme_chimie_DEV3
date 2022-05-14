import { Button, Checkbox } from '@mui/material';
import React, {Component} from 'react';
import {useParams} from 'react-router-dom';
import axios from 'axios';


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
/*
    submitHandler = form =>{
        form.preventDefault();
        const params = new URLSearchParams();
        params.append("idquiz", this.state.email);
        params.append("motDePasse", this.state.motDePasse);   
        axios.post("http://localhost:5000/utilisateurs/connexion", params)
          .then(res => console.log(res)).catch(err => console.log(err)) ;
    }


    ChangeVisibiliteChap(arg1, arg2, arg3){
        console.log("ca marche visibilité quiz")
        console.log(arg1)
        console.log(arg2)
        console.log(arg3)
 //       let ChangeData = this.state.data;
 //       ChangeData[]
 //       this.setState({data :})
    }



    tabForm (dataTraitement, coursActu){
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
        this.setState({data: tableauData, cours: coursActu})
        return tableauData;
    }
    */
    render() { 

        let tabData = tabForm(this.props.data);
        console.log("tabData = "); // a retirer final
        console.log(tabData); // pareil
        return (
            <div>
                <h1>{this.props.cours}</h1>  
                {tabData.map((item) => (                  
                        <fieldset>
                            <legend>{item[0].titreChapitre}</legend>
                            <form  >
                                <label>
                                    chapitre visible:  
                                    <input defaultChecked={item[0].chapEstVisible} type="Checkbox" onClick={(event) =>{ChangeVisibiliteChap(event.target.value, item[0].chapEstVisible, item[0].idChapitre)}}/>
                                </label>
                            </form>
                            <Button >supprimer chapitre</Button>  
                            {item.map((item2) => (        
                                <div>
                                    <p>{item2.description}</p>
                                    <Button href={`http://localhost:3000/cours/${this.props.cours}/quiz/${item2.idQuiz}`} >{item2.titre}</Button>
                                    <form>
                                        <label>
                                            visible:  
                                            <input defaultChecked={item2.disponnible} type="Checkbox" onClick={(event) =>{ChangeVisibiliteQuiz(event.target.value, item2.disponnible, item2.idQuiz)}} />
                                        </label>
                                    </form>                                    
                                    <Button >supprimer</Button>                            
                                </div>       
                            ))}
                            <Button href={`http://localhost:3000/quiz/cours/creation`}>+ creation de quiz +</Button>
                        </fieldset>                  
                ))}
                <form onSubmit={AddChap()}>
                    <input type="text" defaultValue="+ chapitre +"></input>
                    <input type="submit"></input>
                </form>
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