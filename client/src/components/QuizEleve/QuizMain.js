import React, {Component } from 'react';
import './QuizMain.css';
import Question from "./Question/Question";
import Result from "./Question/Result";
import {useParams} from 'react-router-dom';

class Quiz extends Component {

    // Initiating the local state
   
    state = {
            questionList: [],
            score:0,
            responses:[],
            titre:"",
            description:""

           
    };
    
       //recuperation des questions d'un quiz (appel de l'API) ex: http://localhost:5000/quiz/les%20molécules/1
    async getQuestions()  {
        const {quiz}  = this.props.params;
        console.log("bon quiz appellé")
        console.log(quiz);
        const url = `http://localhost:5000/quiz/${quiz}`;
        const response = await fetch(url);
        console.log(response);
        const data = await response.json();
        this.setState({questionList : JSON.parse(data[0].questions), titre: data[0].titre, description:data[0].description });
      };
  
  
   //calcul de la note 
   computeAnswer = (answer, correctAnswer) => {         
        if (answer === correctAnswer) {
            this.setState({
                score: this.state.score + 1
            });
        }
    };

    setAnswer = (questionid,index) => {     
        let responses = this.state.responses;
        //chercher si déjà selectionné
        var indexRecord = responses.indexOf("{questionid:"+questionid+",response:"+index+"}");
        console.log(indexRecord);
        if (indexRecord === -1)
            responses.push("{questionid:"+questionid+",response:"+index+"}");    
        else
           responses.splice(indexRecord, 1);

          
       
        this.setState({
            responses:responses
        });
        console.log(this.state.responses);
    };
    
    updateInputValue = (evt,questionid) => {     
        let responses = this.state.responses;
        let indexRecord= responses.findIndex(element => element.includes("{questionid:"+questionid+","))
        
        console.log(indexRecord);
        if (indexRecord === -1)
            responses.push("{questionid:"+questionid+",response:"+evt+"}");    
        else {
          responses.splice(indexRecord, 1);
          responses.push("{questionid:"+questionid+",response:"+evt+"}"); 
        }

          
       
        this.setState({
            responses:responses
        });
        console.log(this.state.responses);
    };


    //refaire le quiz
    tryAgain = () => {
        this.setState({
            questionList: [],
            score:0,
            responses:[]

        });
        this.getQuestions(1);
          
    }
   
    //récupération des questions au chargement du composant 
    async componentDidMount ()  {
      
        //console.log("test"+this.state.questionList)
         this.getQuestions(1);
     }
  
     
    render(){
        
        let { questionList, titre, description }= this.state
      //const qst=JSON.parse(questions)
        return(
        
            <div className="container">
                <div className="title" key={titre}>{titre}: {description}</div>
                
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
                      questionid={i}
                      setAnswer={this.setAnswer}
                      updateInputValue={this.updateInputValue}
                      
                  />
                  )
              )
                
                    
                }
                
                <button
                        className="Terminer" 
                        onClick={() => {
                        ( <Result 
                                responses={this.state.responses} 
                                tryAgain={this.tryAgain} 
                            />)
                        }}
                    >
                        Terminer
                    
                    </button>
                
                    <button 
                        className="Reset" 
                        onClick={this.tryAgain}
                    >
                        Reset  <i className="fa fa-undo" />
                    
                    </button>
            </div>
            

        );
    }
}

export default (props) => (
    <Quiz {...props} params={useParams()}/>
);