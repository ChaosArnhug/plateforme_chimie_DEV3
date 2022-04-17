import React, { useState } from "react";
import {Component } from 'react';
import './Answer.css';

class Answer extends Component {

    handleClick = () => {console.log(122) }

    render(){
        
        let reponses= this.props.answers.map(answer =>(
            this.props.estQCM === "1" ? 
            <li >
                {answer.texteReponse}
            </li>
            :
            <input type="text" id="fname" name="fname">
            </input>
           
            
        ))
        return (
            <>
                <ul className='Answers'>
                    {reponses}
                </ul>
            </>
        )

    }

}



export default Answer;