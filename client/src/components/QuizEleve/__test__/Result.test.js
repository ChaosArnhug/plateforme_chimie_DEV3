import React from "react";
import ReactDOM from 'react-dom';
import Result from '../Question/Result';
import { render } from '@testing-library/react';
import  "@testing-library/jest-dom/extend-expect";
import { act } from "react-dom/test-utils";


test("renders without crashing",()=>{
    const div = document.createElement("div");
    ReactDOM.render(<Result />, div)
});


const wait = (time = 0) =>
    new Promise(resolve => {
        setTimeout(resolve, time);
    });

   
    test('renders Question 0 correctly', async () => {
    
        const {getByTestId} = render(<Result />);
        await wait(400).then(() => {
            expect(getByTestId('Result')).toHaveTextContent("Vos réponses ont été encodées")
        });
    });

