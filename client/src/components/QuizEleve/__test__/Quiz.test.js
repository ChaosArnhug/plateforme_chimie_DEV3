import React from "react";
import ReactDOM from 'react-dom';
import Quiz from '../Quiz';
import { render } from '@testing-library/react';
import  "@testing-library/jest-dom/extend-expect";
import { act } from "react-dom/test-utils";


test("renders without crashing",()=>{
    const div = document.createElement("div");
    ReactDOM.render(<Quiz cours={1}
         quiz={1}></Quiz>, div)
});


const wait = (time = 0) =>
    new Promise(resolve => {
        setTimeout(resolve, time);
    });

   
    test('renders Question 0 correctly', async () => {
    
        const {getByTestId} = render(<Quiz 
            cours={1}
            quiz={1} />);
        await wait(400).then(() => {
            expect(getByTestId('Q1')).toHaveTextContent("Q1: Quelle est la formule de l'eau ?")
        });
    });

test('renders Question 1 correctly', async () => {
    
    const {getByTestId} = render(<Quiz 
        cours={1}
        quiz={1} />);
    await wait(400).then(() => {
        expect(getByTestId('Q2')).toHaveTextContent("Q2: Quelle est la formule de l'oxygène ?")
    });
});

test('renders Question 2 correctly', async () => {
    
    const {getByTestId} = render(<Quiz 
        cours={1}
        quiz={1} />);
    await wait(400).then(() => {
        expect(getByTestId('Q3')).toHaveTextContent("Q3: Quelle est la formule du zinc ?")
    });
});

test('renders Question 3 correctly', async () => {   
    const {getByTestId} = render(<Quiz 
        cours={1}
        quiz={1} />);
    await wait(400).then(() => {
        expect(getByTestId('Q4')).toHaveTextContent("Q4: Ces associations de molécules d'eau voisines sont elles possibles ?")
    });
});


test('renders title correctly', async () => {
    const {getByTestId} = render(<Quiz 
        cours={1}
        quiz={1} />);
    await wait(400).then(() => {
        expect(getByTestId('title')).toHaveTextContent("Quiz 1: Quiz du chapitre 1")
    });
});

test("renders Terminer button correctly",() => {
    const {getByTestId} = render(<Quiz 
        cours='1'
        quiz='1' />);
    expect(getByTestId('Terminer')).toHaveTextContent("Terminer")
});

test("renders Reset button correctly",() => {
    const {getByTestId} = render(<Quiz 
        cours='1'
        quiz='1' />);
    expect(getByTestId('Reset')).toHaveTextContent("Reset")
});


test('CO2 choice properly loaded', async () => {

    const onChange = jest.fn();
    act(() => {
        render(<Quiz 
            cours='1'
            quiz='1' />);
    });

    await wait(400).then(() => {

        // récupère l’élément bouton et déclenche quelques clics dessus
        const button = document.querySelector("[data-testid=CO2]");
       
        expect(button.innerHTML).toBe("<input type=\"checkbox\"><i class=\"fa fa-fw fa fa-square-o unchecked\"></i><i class=\"fa fa-fw fa fa-check-square-o checked\"></i>CO2");
        
    });
});
