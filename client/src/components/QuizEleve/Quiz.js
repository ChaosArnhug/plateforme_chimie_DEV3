import React, {Component } from 'react';
import './QuizMain.css';
import Question from "./Question/Question";
import Result from "./Question/Result"

export default class Quiz extends Component  {

     // Initialisation du state locale
   
    constructor(props){
        super(props)
        this.state = {
            questionList: [],
            score:0,
            responses:[],
            titre:"",
            description:""

           
        }
    }
    

    //recuperation des questions d'un quiz (appel de l'API) ex: http://localhost:5000/quiz/1
    async getQuestions (quizid)  {  
        const url = "http://localhost:5000/quiz/"+quizid;
        const response = await fetch(url);
        console.log(response);
        const data = await response.json();
        this.setState({questionList : JSON.parse(data[0].questions), titre: data[0].titre, description:data[0].description });
      };
  
    // Insertion de la selection ou suppression d'une selection du tableau des réponses: responses
    setAnswer = (questionid,index) => {     
        let responses = this.state.responses;
        //chercher si déjà selectionné
        var indexRecord = responses.indexOf("{\"questionid\":"+questionid+",\"response\":\""+index+"\"}");
        // si indexrecord est -1 alors réponses non sélectionnée au préalable alors on l'ajoute dans le tableau des réponses sinon on la supprime de ce tableau 
        if (indexRecord === -1)
            responses.push("{\"questionid\":"+questionid+",\"response\":\""+index+"\"}");    
        else
           responses.splice(indexRecord, 1);

          
        //mise à jour du tableau des réponses du state
        this.setState({
            responses:responses
        });
        console.log(this.state.responses);
    };
    
    //Insertion ou mise à jours des réponses encodées dans le tableau des réponses
    updateInputValue = (evt,questionid) => {     
        let responses = this.state.responses;
        //chercher si déjà encodée
        let indexRecord= responses.findIndex(element => element.includes("{\"questionid\":"+questionid+","))
        
        //Si -& alors pas encodée , on utilise push pour l'insérer dans le tableau des réponses
        //sinon on supprime l'ancienne réponse et on insère la nouvelle
        if (indexRecord === -1)
            responses.push("{\"questionid\":"+questionid+",\"response\":\""+evt+"\"}");    
        else {
          responses.splice(indexRecord, 1);
          responses.push("{\"questionid\":"+questionid+",\"response\":\""+evt+"\"}"); 
        }

        this.setState({
            responses:responses
        });
        console.log(this.state.responses);
    };


    //refaire le quiz, utilisée avec le bouton Reset
    tryAgain = () => {
        this.setState({
            questionList: [],
            score:0,
            responses:[]

        });
        this.getQuestions(this.props.quiz);
          
    }

    async envoiResponses(){        

        // On envoi les réponses vers l'API.
        console.log(JSON.stringify(this.state.responses));
        fetch(`http://localhost:5000/quiz/`+this.props.quiz,   
            {
                method: "POST",
                body: JSON.stringify(this.state.responses),
                headers: {
                    "Content-type": "application/json; charset=UTF-8"
                }
            }
        );
        
        window.location = await ("http://localhost:3000/Result"); 
        return false
    
    }
   
    //récupération des questions au chargement du composant 
    async componentDidMount ()  {
      
        this.getQuestions(this.props.quiz);
     }
     
    // Parcour du tableau des questions et appel du composant Question pour l'affichage de chaque question et le choix possible , l'image , ou le input box 
    render(){
        
        let { questionList, titre, description }= this.state
      
        return(
        
            <div className="container">
                <div data-testid="title" className="title" key={titre}>{titre}: {description}</div>
                
                {
                
                    questionList.map( 
                        (question,i) => (
                            <Question 
                                titreQuestion={question.titreQuestion} 
                                isQCM={question.estQCM}
                                enonce={question.enonce}
                                img={question.img}
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
                    data-testid="Terminer" 
                    className="Terminer" 
                    onClick={()=> {this.envoiResponses()}}
                >
                    Terminer
                    
                </button>
                
                <button
                    data-testid="Reset"
                    className="Reset" 
                    onClick={this.tryAgain}
                >
                    Reset  <i className="fa fa-undo" />
                </button>
            </div>
            

        );
    }
}
