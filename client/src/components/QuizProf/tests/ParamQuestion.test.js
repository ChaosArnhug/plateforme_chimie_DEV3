import {render, screen, fireEvent} from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import '@testing-library/jest-dom'

import ParamQuestion from '../ParamQuestion'


// différentes fonctions bidon, 
async function updateQuestionData(questionId, questionDataToChange, newData){
    return null
}

async function updateReponseData(questionId, reponseId, reponseDataToChange, newData){
    return null
}

async function addQuestionInDataArray(){
    return null
}

async function addReponseInDataArray(questionId, isCorrect){
    return null
}

async function remQuestionInDataArray(){
    return null
}

async function questionType(questionId, isQCM){
    return null
}

async function remReponseInDataArray(questionId){
    return null
}

async function remAllReponsesInDataArray(questionId){
    return null
}

function generateUniqueID(type){
    // type représente le type : "Q" -> Question, "R"-> Réponse
    let num = Math.floor(Math.random() * Date.now());
    return(type+num)
}


test("Correct rendering of ParamQuestion", async () => {
    render(<ParamQuestion 
        updateQuestionData={updateQuestionData}
        updateReponseData={updateReponseData}
        addQuestionInDataArray={addQuestionInDataArray} 
        remQuestionInDataArray={remQuestionInDataArray}
        addReponseInDataArray={addReponseInDataArray} 
        generateUniqueID={generateUniqueID}
        questionType={questionType}
        remReponseInDataArray = {remReponseInDataArray}
        remAllReponsesInDataArray ={remAllReponsesInDataArray}
        />)

        const button  = await screen.getByTestId('ouverteOrQCM').querySelector('input');

})



test("ParamQuestion rendering ParamOuverte without clicking the change", async () => {
    render(<ParamQuestion 
        updateQuestionData={updateQuestionData}
        updateReponseData={updateReponseData}
        addQuestionInDataArray={addQuestionInDataArray} 
        remQuestionInDataArray={remQuestionInDataArray}
        addReponseInDataArray={addReponseInDataArray} 
        generateUniqueID={generateUniqueID}
        questionType={questionType}
        remReponseInDataArray = {remReponseInDataArray}
        remAllReponsesInDataArray ={remAllReponsesInDataArray}
        />)

        const button  = await screen.getByTestId('ouverteOrQCM').querySelector('input');
        const paramOuverte  = await screen.getByTestId('ParamOuverte').querySelector('input');

        await expect(paramOuverte).toBeInTheDocument();

        

})


test("ParamQuestion rendering ParamQCM after clicking the change", async () => {
    render(<ParamQuestion 
        updateQuestionData={updateQuestionData}
        updateReponseData={updateReponseData}
        addQuestionInDataArray={addQuestionInDataArray} 
        remQuestionInDataArray={remQuestionInDataArray}
        addReponseInDataArray={addReponseInDataArray} 
        generateUniqueID={generateUniqueID}
        questionType={questionType}
        remReponseInDataArray = {remReponseInDataArray}
        remAllReponsesInDataArray ={remAllReponsesInDataArray}
        />)

        const button  = await screen.getByTestId('ouverteOrQCM').querySelector('input');
        const paramQCM  = await screen.getByTestId('ParamQCM').querySelector('input');

        await userEvent.click(button);

        await expect(paramQCM).toBeInTheDocument();

})


test("ParamQuestion rendering ParamOuverte back after clicking twice the change", async () => {
    render(<ParamQuestion 
        updateQuestionData={updateQuestionData}
        updateReponseData={updateReponseData}
        addQuestionInDataArray={addQuestionInDataArray} 
        remQuestionInDataArray={remQuestionInDataArray}
        addReponseInDataArray={addReponseInDataArray} 
        generateUniqueID={generateUniqueID}
        questionType={questionType}
        remReponseInDataArray = {remReponseInDataArray}
        remAllReponsesInDataArray ={remAllReponsesInDataArray}
        />)

        const button  = await screen.getByTestId('ouverteOrQCM').querySelector('input');
        const paramOuverte  = await screen.getByTestId('ParamOuverte').querySelector('input');

        await userEvent.click(button); // dblClick ? -> peut-être moyen
        await userEvent.click(button);

        await expect(paramOuverte).toBeInTheDocument();

})