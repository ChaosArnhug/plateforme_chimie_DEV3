import React, { Component } from 'react';
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";

import {ThemeProvider, createTheme } from '@mui/material/styles';
import { unstable_styleFunctionSx, styled } from '@mui/system';
//import { styled } from '@mui/material/styles';

import CreationQuiz from './QuizProf/CreationQuiz.js'
import PageCours from './PageCours.js';
import theme from '../index.js'
import Question from './QuizEleve/question/question.js';
import Answer from './QuizEleve/answer/Answer.js';
import Quiz from './QuizEleve/QuizMain.js';


/*
const theme = createTheme({
    palette: {
      primary: {
        main: '#E4F2AE',
      },
      secondary: {
        main: '#1E943C',
        button: '#10812D'
      },
      box: {
        main: "#BED005",
        secondary: "#D4E522"
      }
    },
});
*/


//Les balises HTML de base ne peuvent pas être modifiée avec sx={{.....}}. On doit créer un nouveau 
// type de balise à partir de celles-ci pouvant utiliser sx. 
const Div = styled('div')(unstable_styleFunctionSx);





class Acceuil extends Component{
    render(){
      return(<h1>Hello</h1>)
    }
}




class InsideStructure extends Component{
    render(){
      return(
        <Router>
          <Routes>
            <Route path="/" element={<Acceuil/>}> </Route>
            <Route path="/quiz/cours/creation" element={<CreationQuiz/>}> </Route>
            <Route path="/cours/:cours" element={<PageCours/>}> </Route>
            <Route path="/cours/:cours/quiz/:quiz" element={<Quiz/>}></Route>
          </Routes>
        </Router>
      )
    }
    
  }

export default InsideStructure;