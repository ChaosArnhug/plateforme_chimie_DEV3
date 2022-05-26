import React from "react";

const Result = ({responses, tryAgain}) => (
  <div className="score-board">
    <div className="score" data-testid="Result">Vos réponses ont été encodées {responses} </div>
  </div>
  
);

export default Result;
