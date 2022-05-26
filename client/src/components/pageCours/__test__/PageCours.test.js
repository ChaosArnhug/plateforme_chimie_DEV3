import React from 'react';
import ReactDOM from 'react-dom';
import CoursPageTransi, { Test } from '../CoursPageTransi';
import CoursPage from '../CoursPage';
import QuizMain from '../../QuizEleve/QuizMain';
import { isTSAnyKeyword } from '@babel/types';
import { render, screen, cleanup } from '@testing-library/react';
import "@testing-library/jest-dom";
import { act } from "react-dom/test-utils";
import renderer from 'react-test-renderer';
import { Button } from '@mui/material';
import userEvent from '@testing-library/user-event'

afterEach(cleanup); 


it("test true", ()=>{
    expect(true).toBe(true)
})

it("render without crashing", ()=>{ 
    const div = document.createElement("div");
    ReactDOM.render(<button></button>, div)
})


it("test render element ", async () => {
    
    let datas = [{"idQuiz":1,"titre":"Quiz 1","description":"Quiz du chapitre 1","disponnible":1,"toQuiz":"http://localhost:5000/quiz/1","idChapitre":1,"titreChapitre":"chapitre 1","chapEstVisible":1}];
    let courss = "chimie 5ième";
    let dataeleves = [{"titre":"Quiz 1","resultat":1,"total":4,"quiz":"http://localhost:5000/quiz/1"}];
    render(<CoursPage data={datas} cours={courss} dataEleve={dataeleves} />);
    const button = screen.getByText('Quiz 1')
    const chap = screen.getByText('chapitre 1')
    const com = screen.getByText('Quiz du chapitre 1')
    expect(button).toBeInTheDocument()
    expect(chap).toBeInTheDocument()
    expect(com).toBeInTheDocument()
})



it('renders Question 0 correctly', async () => {
    let datas = [{"idQuiz":1,"titre":"Quiz 1","description":"Quiz du chapitre 1","disponnible":1,"toQuiz":"http://localhost:5000/quiz/1","idChapitre":1,"titreChapitre":"chapitre 1","chapEstVisible":1}]
    let courss = "chimie 5ième";
    let dataEleves = [{"titre":"Quiz 1","resultat":1,"total":4,"quiz":"http://localhost:5000/quiz/1"}];
    render(<CoursPage data={datas} cours={courss} dataEleve={dataEleves}/>);
    const field = screen.queryByTestId(1);
    expect(field).toHaveTextContent(`${datas[0].titre}`)  
});

it("test transition loading", async () => {   
    render(<CoursPageTransi params={null}/>);
    const com = screen.getByText('Loading ...')
    expect(com).toBeInTheDocument()
})

it("test transition", async () => {   
    render(<CoursPageTransi params="chimie 5ième"/>, () => {
        const button = screen.getByText('Quiz 1')
        const chap = screen.getByText('chapitre 1')
        const com = screen.getByText('Quiz du chapitre 1')
        expect(button).toBeInTheDocument()
        expect(chap).toBeInTheDocument()
        expect(com).toBeInTheDocument()
    });

}) 

// -------------------------------------


it("test render element null ", async () => {
    
    let datas = [{"idQuiz":1,"titre":"Quiz 1","description":"Quiz du chapitre 1","disponnible":1,"toQuiz":"http://localhost:5000/quiz/1","idChapitre":1,"titreChapitre":"chapitre 1","chapEstVisible":1}];
    let courss = "chimie 5ième";
    let dataeleves = [{"titre":"Quiz 1","resultat":1,"total":4,"quiz":"http://localhost:5000/quiz/1"}];
    render(<CoursPage data={datas} cours={courss} dataEleve={dataeleves} />);

    const correctCheck  = screen.queryByTestId('1')
    userEvent.click(correctCheck);
    await expect(<QuizMain/>).toHaveBeenCalledTimes(1);
})





