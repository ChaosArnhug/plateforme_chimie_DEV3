import React from 'react';
import './Question.css';
import Answer from '../answer/Answer'

const Question = (props) => {
    
    let question = Object.keys(props.questions)
    .map((qQuestion, i) =>(
        <>
             <h1>{props.questions[qQuestion].titreQuestion}: {props.questions[qQuestion].enonce}</h1>
            <Answer
                answers = {props.questions[qQuestion].reponses}
                estQCM = {props.questions[qQuestion].estQCM}
            />
        </>
    ))
    
    return question;
   
}

export default Question;