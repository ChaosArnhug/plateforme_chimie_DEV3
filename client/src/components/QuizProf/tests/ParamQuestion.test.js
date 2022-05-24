import {render, screen, fireEvent} from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import '@testing-library/jest-dom'

import ParamQuestion from '../ParamQuestion'
import { Experimental_CssVarsProvider } from '@mui/material'
import { wait } from '@testing-library/user-event/dist/utils'


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

test('suite running', async() => {
    await expect(1+2).toBe(3);
})


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

        const check  = await screen.getByTestId('ouverteOrQCM').querySelector('input');
        const paramOuverte  = await screen.getByTestId('ParamOuverte').querySelector('input');

        await expect(paramOuverte).toBeInTheDocument();

        screen.debug();

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

        const check  = await screen.getByTestId('ouverteOrQCM').querySelector('input');
        

        await userEvent.click(check);
        await wait(400);
        //const paramQCM  = await screen.getByTestId('ParamQCM').querySelector('input');
        const paramQCM  = await screen.findByTestId('ParamQCM').querySelector('input');
        //const paramQCM  = await screen.getByTestId('Réponse QCM').querySelector('input');
        
        await expect(paramQCM).toBeInTheDocument();

        screen.debug();

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

        const check  = await screen.getByTestId('ouverteOrQCM').querySelector('input');
        

        await userEvent.click(check); // dblClick ? -> peut-être moyen
        await userEvent.click(check);
        await wait(400);
        //const paramOuverte  = await screen.getByTestId('ParamOuverte').querySelector('input');
        const paramOuverte  = await screen.findByTestId('ParamOuverte').querySelector('input');

        await expect(paramOuverte).toBeInTheDocument();

        // Problème : trouve screen.getByTestId('ParamOuverte') au tout début, ne le trouve pas quand on render en décochant la case isQCM.

        screen.debug();
})
