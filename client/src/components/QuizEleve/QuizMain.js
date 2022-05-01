import React, {Component } from 'react';
import './QuizMain.css';
import Question from "./question/question";
import Result from "./question/Result"


export default class Quiz extends Component {

    // Initiating the local state
   
    state = {
            questionList: [],
            titre: '',
            description:'',
            estVisible: 0,
            score:0,
            responses:0,
            loading:true
    };
    
    //recuperation des questions d'un quiz (appel de l'api) ex: http://localhost:5000/quiz/les%20molécules/1
    async getQuestions (cour, quizid)  {  
      const url = "http://localhost:5000/quiz/"+cour+"/"+quizid;
      const response = await fetch(url);
      const data = await response.json();
      this.setState({loading : false, questionList : JSON.parse(data[0].questions), titre: data[0].titre, description:data[0].description, estVisible:data[0].estVisible });
    };

    //calcul de la note 
   computeAnswer = (answer, correctAnswer) => {         
       if (answer === correctAnswer) {
           this.setState({
               score: this.state.score + 1
           });
       }
       this.setState({
           responses: this.state.responses <5 ? this.state.responses +1:5
       });
   };

   //refaire le quiz
   playAgain = () => {
       this.getQuestions();
       this.setState({
           score:0,
           responses:0
       })
   }

   //récupération des questions au chargement du composant 
   async componentDidMount ()  {
      
      //console.log("test"+this.state.questionList)
       this.getQuestions("les%20molécules",1);
   }
  
 


   render(){

      let { questionList, titre, description }= this.state
      //const qst=JSON.parse(questions)
        return(
        
            <div className="container">
                <div className="title">{titre}: {description}</div>
                
                {
                
                questionList.map(
                  (question,i) => (
                  
                  //<h1>{question.titreQuestion}</h1>
                  <Question 
                      titreQuestion={question.titreQuestion} 
                      isQCM={question.estQCM}
                      enonce={question.enonce}
                      points={question.points}
                      reponses={question.reponses}
                      
                  />
                  )
              )
                
                    
                }
                
                <button
                        className="Terminer" 
                        onClick={() => {
                        ( <Result 
                                score={this.state.score} 
                                playAgain={this.playAgain} 
                            />)
                        }}
                    >
                        Terminer
                    
                    </button>
                
                {this.state.responses === 5 ? (<Result score={this.state.score} playAgain={this.playAgain} />):null}
                
                
            </div>
            

        );
    }
}
