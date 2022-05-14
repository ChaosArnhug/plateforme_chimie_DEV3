import React, { Component } from 'react';
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";

import {ThemeProvider, createTheme } from '@mui/material/styles';
import { unstable_styleFunctionSx, styled } from '@mui/system';
//import { styled } from '@mui/material/styles';

import CreationQuiz from './QuizProf/CreationQuiz.js'
import PageCours from './pageCours/PageCours.js';
import theme from '../index.js'
import Question from './QuizEleve/Question/Question.js';
import Quiz from './QuizEleve/QuizMain.js';
import UserConnection from './GestionComptes/UserConnection.js';
import UserInscription from './GestionComptes/UserInscription.js';
import InscriptionCoursBox from './InscriptionCoursBox.js';
import ConfirmationInscriptionBox from './ConfirmationInscriptionBox.js';
import PageCoursProf from './pageCours/PageCoursProf.js';


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
            <Route path="/quiz/:cours/creation" element={<CreationQuiz/>}> </Route>
            <Route path="/cours/:cours" element={<PageCours/>}> </Route>
            <Route path="/cours/:cours/creation" element={<PageCoursProf/>}> </Route>
            <Route path="/cours/:cours/quiz/:quiz" element={<Quiz/>}></Route>
            <Route path="/utilisateurs/connexion" element={<UserConnection/>}> </Route>
            <Route path="/utilisateurs/inscription" element={<UserInscription/>}> </Route>
            <Route path="/cours" element={<InscriptionCoursBox/>}></Route>
            <Route path="/utilisateurs/demande" element={<ConfirmationInscriptionBox/>}></Route>
            <Route path="/quiz/1" element={<Question/>}></Route>
          </Routes>
        </Router>
      )
    }
    
  }
 // <Route path="/cours/:cours/quiz/:quiz" element={<Quiz/>}></Route>

export default InsideStructure;