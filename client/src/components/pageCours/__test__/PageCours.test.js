import React from 'react';
import ReactDOM from 'react-dom';
import CoursPage, { Test } from '../PageCours';
import { isTSAnyKeyword } from '@babel/types';
import { render, screen, cleanup } from '@testing-library/react';
import "@testing-library/jest-dom";
import { act } from "react-dom/test-utils";
import renderer from 'react-test-renderer';
import { Button } from '@mui/material';

afterEach(cleanup); 


it("test true", ()=>{
    expect(true).toBe(true)
})

it("render without crashing", ()=>{ 
    const div = document.createElement("div");
    ReactDOM.render(<button></button>, div)
})


it("test tabform", ()=>{
    let datas = [{"idChapitre":1}] 
    const testPrint = renderer
    expect(CoursPage.tabForm(datas)).toBe([[{"idChapitre":1}]])
  //  expect(Test.prints()).toBe("aie")
})

/*
it("renders button correctly", async ()=>{
    let datas = [{"idQuiz":1,"titre":"Quiz 1","description":"Quiz du chapitre 1","disponnible":1,"toQuiz":"http://localhost:5000/quiz/1","idChapitre":1,"titreChapitre":"chapitre 1","chapEstVisible":1}]
    let courss = "chimie 5ième";
    const {getByTestId} = render(<CoursPage data={datas} cours={courss} />);
    expect(getByTestId('button')).toHaveTextContent("Quiz 1")
 //   expect(screen.getByRole('button', { id: 1 })).toBeEnabled();
})
*/


const wait = (time = 0) =>
    new Promise(resolve => {
        setTimeout(resolve, time);
    });

    test('renders Question 0 correctly', async () => {
        let datas = [{"idQuiz":1,"titre":"Quiz 1","description":"Quiz du chapitre 1","disponnible":1,"toQuiz":"http://localhost:5000/quiz/1","idChapitre":1,"titreChapitre":"chapitre 1","chapEstVisible":1}]
        let courss = "chimie 5ième";
        let dataEleves = [{"titre":"Quiz 1","resultat":1,"total":4,"quiz":"http://localhost:5000/quiz/1"}];
        const {getByTestId} = render(<CoursPage data={datas} cours={courss} dataEleve={dataEleves}/>);
        await wait(400).then(() => {
            expect(getByTestId(`${datas[0].idQuiz}`)).toHaveTextContent(`${datas[0].titre}`)
        });
    });

/*
it("renders button correctly", ()=>{
    const {getByTestId} = render(<button label="save"></button>);
    expect(getByTestId('button')).toHaveTextContent("save")
})

it("matches snapshot", ()=>{
    const tree = renderer.create(<button label="save"></button>).toJSON();
    expect(tree).toMatchSnapshot();
})
*/