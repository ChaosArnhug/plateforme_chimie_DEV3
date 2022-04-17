import React, {Component } from 'react';
import Question from './question/Question';
import './QuizMain.css';



export default class Quiz extends Component {

    // Initiating the local state
    state = {
       
              titre: "Quiz1",
              description: "quiz du chap1",
              estVisible: 1,
              questions: [
                {
                  titreQuestion: "Q1",
                  enonce: "Quelle est la formule de l'eau?",
                  estQCM: "0",
                  points: 1,
                  reponses: [
                    {
                      texteReponse: "H2O",
                      estCorrecte: 1
                    }
                  ]
                },
                {
                  titreQuestion: "Q2",
                  enonce: "Quelle est la formule de l'oxygène?",
                  estQCM: "1",
                  points: 1,
                  reponses: [
                    {
                      texteReponse: "CO2",
                      estCorrecte: 0
                    },
                    {
                      texteReponse: "HH",
                      estCorrecte: 0
                    },
                    {
                      texteReponse: "O2",
                      estCorrecte: 1
                    },
                    {
                      texteReponse: "O",
                      estCorrecte: 0
                    }
                  ]
                },
                {
                  titreQuestion: "Q3",
                  enonce: "Quelle est la formule du zinc?",
                  estQCM: "0",
                  points: 2,
                  reponses: [
                    {
                      texteReponse: "Zn",
                      estCorrecte: 1
                    }
                  ]
                },
                {
                  titreQuestion: "Q4",
                  enonce: "Ces associations de molécules d'eau voisines sont elles possibles?",
                  estQCM: "1",
                  points: 2,
                  reponses: [
                    {
                      texteReponse: "vrai",
                      estCorrecte: 0
                    },
                    {
                      texteReponse: "faux",
                      estCorrecte: 1
                    }
                  ]
                }
              ]
            }

    render(){
        let { questions, titre, description }= this.state
        return(
        <div className="Content">
            {(<>
                <Question 
                    titre={titre}
                    questions={questions}
                />
                <button
                    className="Terminer"
                >
                    Terminer
                
                </button>
            </>)
            } 
        </div>
        );
    }
}
