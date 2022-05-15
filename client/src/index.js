import React, {Component} from 'react';
import ReactDOM from 'react-dom';
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import './index.css';
import reportWebVitals from './reportWebVitals';

import ListingCours from './components/ListingCours';
import InsideStructure from './components/InsideStructure';
import PageCours from './components/pageCours/PageCours'
import MonCompteMenu from './components/MonCompteMenu';

import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import AppBar from '@mui/material/AppBar';


import {ThemeProvider, createTheme } from '@mui/material/styles';
import { unstable_styleFunctionSx, styled } from '@mui/system';



//Les balises HTML de base ne peuvent pas être modifiée avec sx={{.....}}. On doit créer un nouveau 
// type de balise à partir de celles-ci pouvant utiliser sx. 
const Div = styled('div')(unstable_styleFunctionSx);
const Img = styled('img')(unstable_styleFunctionSx);


// On définit un theme
const theme = createTheme({
  palette: {
    primary: {
      main: '#E4F2AE',
    },
    secondary: {
      main: '#E4F2AE',
      button: '#10812D'
    },
    box: {
      main: "#10812D",
      secondary: "#E4F2AE"
    }
  },
});





const element = (
  
  <ThemeProvider theme={theme} >
    <Box width="auto" height="auto" backgroundColor="primary.main" >
      <AppBar position="static"> 
        <Box width="auto" height="auto"  sx={{ display: 'flex' }}>
          
          <Img width="100px" height="100px" sx={{p:2}} src="https://media.istockphoto.com/vectors/laboratory-beaker-icon-chemical-experiment-in-flask-hemistry-and-vector-id1165295700?k=20&m=1165295700&s=612x612&w=0&h=Nokqv3d9oNEdVTtqkG02vhxVZPVtXS31ZfZ1AQ6BTiY=" onClick={() => window.location = "/"}></Img>
          <Div sx={{ml:3}}> 
            <Button variant="contained" sx={{ml:2, mr:20, my:2, py:2, bgcolor:"secondary.button", fontSize:12}} onClick={() => window.location = "/cours"}>Inscription au cours</Button>
          </Div>
          <Div  sx={{m:"auto", color:"#000000", fontSize:20}}>
            <h1 >Plateforme de chimie</h1>
          </Div>
          <Div sx={{ml:"auto", mr:3, display: 'flex'}}>
          
          <ListingCours sx={{ml:3, mr:4, my:2, py:2, bgcolor:"secondary.button", fontSize:12}}/>
          <MonCompteMenu sx={{ml:3, mr:4, my:2, py:2, bgcolor:"secondary.button", fontSize:12}}></MonCompteMenu>
          
          </Div>
          
        </Box>
      </AppBar>
     
      <Box width="auto" height="auto" backgroundColor="secondary.main" sx={{ display: 'flex' }}>
        
      
        
      </Box>
      <div id="main" >
        
        
        
        </div>
      
      
    </Box>
  </ThemeProvider>
  
  

);

ReactDOM.render(
  element,
  document.getElementById('root')
);

ReactDOM.render(
  <InsideStructure/>,
  document.getElementById('main')
);



/*
<AppBar position="absolute" sx={{mt:"2", p:2, top: 'auto', bottom: 0, bgcolor:"secondary.main"}}> 
        <Div sx={{textAlign:"center"}}>
          Nous contacter: Responsable admin@admin.be
          <br/><br/>
          @copyright
        </Div>
      </AppBar>
      */

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();


export default theme;