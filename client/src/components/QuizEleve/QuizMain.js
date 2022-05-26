import React, {Component } from 'react';
import './QuizMain.css';
import Quiz from "./Quiz";
import {useParams} from 'react-router-dom';

class QuizMain extends Component {

    // Initialisation du state local
    constructor(props){
        super(props)
        this.state = {
            quiz:1,
            cours:1           
        }
    }
    
  
    //Render du composant Quiz qui va afficher un quiz: le titre, les questions et les réponses
    
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