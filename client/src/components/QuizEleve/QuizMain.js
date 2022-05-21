import React, {Component } from 'react';
import './QuizMain.css';
import Quiz from "./Quiz";
import Result from "./Question/Result"
import {useParams} from 'react-router-dom';

class QuizMain extends Component {

    // Initiating the local state
    constructor(props){
        super(props)
        this.state = {
            quiz:1,
            cours:1

           
        }
    }
    
  
    //récupération des questions au chargement du composant 
    
    render(){
        
        let { quiz, cours }= this.props.params
        return(
        
            <Quiz 
                cours={cours}        
                quiz={quiz} 
            />
        )

    }
}

export default (props) => (
    <QuizMain {...props} params={useParams()}/>
);