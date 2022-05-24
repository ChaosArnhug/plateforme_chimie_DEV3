import {render, screen, fireEvent} from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import '@testing-library/jest-dom'

import { ReponseQCM } from '../MultReponsesQCM'
import { MultReponsesQCM } from '../MultReponsesQCM'



async function addReponseInDataArray(questionId, bool){
    return(questionId, bool)
}

async function updateReponseData(questionId, reponseId, nameChange, isCorrect){
    return(questionId, reponseId, nameChange, isCorrect)
}



test("Correct rendering of ReponseQCM", async () => {
    render(<ReponseQCM 
        key={"myKey"} 
        numQuestion={"a"}
        questionId={3}
        addReponseInDataArray={addReponseInDataArray}
        updateReponseData={updateReponseData}
        />)

    await userEvent.click(screen.getByLabelText("Est une bonne réponse"))

})


test("Correct letter in <H1> in front of TextField in ReponseQCM", async () => {
    render(<ReponseQCM 
        key={"myKey"} 
        numQuestion={"a"}
        questionId={3}
        addReponseInDataArray={addReponseInDataArray}
        updateReponseData={updateReponseData}
        />)

    await userEvent.click(screen.getByLabelText("Est une bonne réponse"))

})


test("Input text inside Response TextField is working", async () => {
    
    render(<ReponseQCM 
    key={"myKey"} 
    numQuestion={"a"}
    questionId={3}
    addReponseInDataArray={addReponseInDataArray}
    updateReponseData={updateReponseData}
    />)

    const field  = await screen.getByTestId('Réponse QCM').querySelector('input')

    await userEvent.type(field,"coucou");

    await expect(field).toBeInTheDocument();
    await expect(field).toHaveValue('coucou')
})


test("Selecting Response as correct works visualy", async () => {
    
    render(<ReponseQCM 
    key={"myKey"} 
    numQuestion={"a"}
    questionId={3}
    addReponseInDataArray={addReponseInDataArray}
    updateReponseData={updateReponseData}
    />)

    const correctCheck  = await screen.getByTestId('isCorrectOrNot').querySelector('input')

    await userEvent.click(correctCheck);

    await expect(correctCheck).toBeChecked();
})


// ------------------ MultReponsesQCM ----------------------------

test("MultReponsesQCM rendering ", async () => {
    
    render(<MultReponsesQCM 
        nmbreQCMReponses={1} 
        questionId={3}
        addReponseInDataArray={addReponseInDataArray} 
        updateReponseData={updateReponseData}
    />)

    const uniqueReponse  = await screen.getByTestId('Réponse QCM').querySelector('input')

    await expect(uniqueReponse).toBeInTheDocument();
    //await userEvent.click(correctCheck);

    //await expect(correctCheck).toBeChecked();
})



test("MultReponsesQCM rendering 2 responses ", async () => {
    
    render(<MultReponsesQCM 
        nmbreQCMReponses={2} 
        questionId={3}
        addReponseInDataArray={addReponseInDataArray} 
        updateReponseData={updateReponseData}
    />)

    const uniqueReponse  = await screen.getAllByTestId('Réponse QCM')//.querySelector('input')

    await expect(uniqueReponse).toHaveLength(2);

})


test("MultReponsesQCM rendering 10 responses when too much", async () => {
    
    render(<MultReponsesQCM 
        nmbreQCMReponses={15} 
        questionId={3}
        addReponseInDataArray={addReponseInDataArray} 
        updateReponseData={updateReponseData}
    />)

    const uniqueReponse  = await screen.getAllByTestId('Réponse QCM')

    await expect(uniqueReponse).toHaveLength(10);
})


test("MultReponsesQCM rendering 1 response when too little", async () => {
    
    render(<MultReponsesQCM 
        nmbreQCMReponses={0} 
        questionId={3}
        addReponseInDataArray={addReponseInDataArray} 
        updateReponseData={updateReponseData}
    />)

    const uniqueReponse  = await screen.getAllByTestId('Réponse QCM')

    await expect(uniqueReponse).toHaveLength(1);
})


test("MultReponsesQCM rendering 1 response when negative", async () => {
    
    render(<MultReponsesQCM 
        nmbreQCMReponses={-4} 
        questionId={3}
        addReponseInDataArray={addReponseInDataArray} 
        updateReponseData={updateReponseData}
    />)

    const uniqueReponse  = await screen.getAllByTestId('Réponse QCM')

    await expect(uniqueReponse).toHaveLength(1);
})

