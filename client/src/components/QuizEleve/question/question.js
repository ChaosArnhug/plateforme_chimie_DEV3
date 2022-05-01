import React, {useState} from "react";
import './question.css';

const Question = ({titreQuestion, isQCM, enonce, points, reponses}) => {
  //const [answer,isQCM] = useState(question.reponses, question.estQCM);

  //Parcours la liste des reponses et les affiche sous forme de liste ou un onglet input
    let answers= reponses.map((answer, index) => (    
        isQCM === "1" ?  // si la question est un QCM on affiche la liste des choix
            <>
                <li
                    key={answer.texteReponse}
                    onClick={() => {
                       // setAnswer([texteReponse]);
                        //selected(texteReponse);
                    }}
                >
                    {answer.texteReponse}
                </li>
                </>
             //sinon on affiche input   
            :<input type="text" id="fname" name="fname" >
            </input>
        ));
        
 

  return (
      // renvoi le HTML de la liste des questions et les choix possible/ onglet input
    <div className="questionBox">
       
      <h1 className="Answers">{titreQuestion}: {enonce}  ? </h1>
       <ul className="Answers">
        {answers}
      </ul>
    </div>
  );
};

export default Question;
