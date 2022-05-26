import React from "react";
import ReactDOM from 'react-dom';
import Question from '../Question/Question';
import { render } from '@testing-library/react';
import  "@testing-library/jest-dom/extend-expect";

question1= {
    "titreQuestion": "Q1",
    "enonce": "Quelle est la formule de l'oxygène ?",
    "img": "",
    "estQCM": "1",
    "points": 1,
    "reponses": [
        {
            "texteReponse": "CO2"
        },
        {
            "texteReponse": "HH"
        },
        {
            "texteReponse": "O2"
        },
        {
            "texteReponse": "O"
        }
    ]
}

let question2= {
    "titreQuestion": "Q2",
    "enonce": "Quelle est la formule de l'oxygène ?",
    "img": "",
    "estQCM": "0",
    "points": 1,
    "reponses": [
        {
            "texteReponse": "CO2"
        }
    ]
}

let question3= {
    "titreQuestion": "Q3",
    "enonce": "Quelle est la formule de l'oxygène ?",
    "img": "",
    "estQCM": "1",
    "points": 1,
    "reponses": [
        {
            "texteReponse": "this is a test of a longer message",
            "estCorrecte": 0
        },
        {
            "texteReponse": "123445",
            "estCorrecte": 1
        }
    ]
}
const wait = (time = 0) =>
    new Promise(resolve => {
        setTimeout(resolve, time);
});

   
test('renders Question 1 correctly', async () => {
    const {getByTestId} = render((<Question 
       titreQuestion={question1.titreQuestion} 
        isQCM={question1.estQCM}
        enonce={question1.enonce} 
        img={question1.img} 
        points={question1.points} 
        reponses={question1.reponses} 
        questionid={question1.questionid} 
    ></Question>));
    
    expect(getByTestId('Q1')).toHaveTextContent("Q1: Quelle est la formule de l'oxygène ?")
    expect(getByTestId('CO2')).toHaveTextContent("CO2")
    expect(getByTestId('HH')).toHaveTextContent("HH")
    expect(getByTestId('O2')).toHaveTextContent("O2")
    expect(getByTestId('O')).toHaveTextContent("O")

});

test('renders Question 2 correctly', async () => {
    const {getByTestId} = render((<Question 
       titreQuestion={question2.titreQuestion} 
        isQCM={question2.estQCM}
        enonce={question2.enonce} 
        img={question2.img} 
        points={question2.points} 
        reponses={question2.reponses} 
        questionid={question2.questionid} 
    ></Question>));
    
    expect(getByTestId('Q2')).toHaveTextContent("Q2: Quelle est la formule de l'oxygène ?")
    expect(getByTestId('input')).toHaveTextContent("")

});

test('renders Question 3 correctly', async () => {
    const {getByTestId} = render((<Question 
       titreQuestion={question3.titreQuestion} 
        isQCM={question3.estQCM}
        enonce={question3.enonce} 
        img={question3.img} 
        points={question3.points} 
        reponses={question3.reponses} 
        questionid={question3.questionid} 
    ></Question>));
    
    expect(getByTestId('Q3')).toHaveTextContent("Q3: Quelle est la formule de l'oxygène ?")
    expect(getByTestId('this is a test of a longer message')).toHaveTextContent("this is a test of a longer message")
    expect(getByTestId('this is a test of a longer message')).toHaveTextContent("this is a test of a longer message")

});