import React, {useState} from "react";
import './Question.css';

const Question = ({titreQuestion, isQCM, enonce, points, reponses,questionid,setAnswer,updateInputValue}) => {
  //const [answer,isQCM] = useState(question.reponses, question.estQCM);

  //Parcours la liste des reponses et les affiche sous forme de liste ou un onglet input
    let answers= reponses.map((answer, index) => (    
        isQCM === "1" ?  // si la question est un QCM on affiche la liste des choix
        <div className="modal-body">
            <div className="quiz" id="quiz" data-toggle="buttons"></div>
        <label className="custom-checkbox">
        <li
              key={questionid+","+index}
             
          >
          <input type="checkbox"  key={answer.texteReponse}  onClick={() => {
                setAnswer(questionid,index);
                  //selected(text);
              }}/> 
          <i className="fa fa-fw fa fa-square-o unchecked"></i>
          <i className="fa fa-fw fa fa-check-square-o checked"></i>

          {answer.texteReponse}
        </li>
        </label>
        </div>
      
             //sinon on affiche input   
            :<input type="text" id="fname" name="fname" key={questionid+","+index} onChange={evt => updateInputValue(evt.target.value,questionid) }>
            </input>
        ));
        
 

  return (
      // renvoi le HTML de la liste des questions et les choix possible/ onglet input
      <div className="questionBox">
      <h1 className="Answers"><i className="fa fa-question-circle" /> {titreQuestion}: {enonce} </h1> 
      
        <ul className="Answers">
          {answers}
        </ul>
      </div>
            

    
  );
};

export default Question;
