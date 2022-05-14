import React from 'react';
import ReactDOM from 'react-dom';
import CoursPage from '../PageCours';
import { isTSAnyKeyword } from '@babel/types';
import { render, cleanup } from '@testing-library/react';
import "@testing-library/jest-dom";
import renderer from 'react-test-renderer';

afterEach(cleanup); 

it("render without crashing", ()=>{ 
    const div = document.createElement("div");
    ReactDOM.render(<button></button>, div)
})

it("renders button correctly", ()=>{
    let datas = [{"idQuiz":1,"titre":"Quiz 1","description":"Quiz du chapitre 1","disponnible":1,"toQuiz":"http://localhost:5000/quiz/1","idChapitre":1,"titreChapitre":"chapitre 1","chapEstVisible":1}]
    const {getByTestId} = render(<CoursPage data={datas}></CoursPage>);
    expect(getByTestId("1")).toHaveTextContent("Quiz 1")
})
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