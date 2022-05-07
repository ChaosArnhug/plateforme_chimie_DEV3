import React from "react";

const Result = ({responses, tryAgain}) => (
  <div className="score-board">
    <div className="score">Vos réponses sont: {responses} </div>
    <button className="playBtn" onClick={tryAgain}>
      Retour
    </button>
  </div>
  
);

export default Result;
