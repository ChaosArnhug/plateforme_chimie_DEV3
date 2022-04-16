import React, { Component } from 'react';

import Box from '@mui/material/Box';
import theme from '../index.js'

import {ThemeProvider} from '@mui/material/styles';

class QuizListBox extends Component{
    render(){
        return(
        <h1>Hello, {this.props.basicData.nom}</h1>
        )
    }
    
}

class HubCours extends Component {
    state = { 
        loading : true,
        data : null
    } 

    async componentDidMount () {
        const url1 = "http://localhost:5000/cours/"+this.props.nom;
        const response1 = await fetch(url1);
        const basicData = await response1.json();
        const url2 = "http://localhost:5000/quiz/"+this.props.nom;
        const response2 = await fetch(url2);
        const quizData = await response2.json();
        this.setState({loading : false, basicData : basicData[0], quizData : quizData})
        
    }

    render() { 
        return (
            <div>
                {this.state.loading || !this.state.basicData || !this.state.quizData ? (
                    <div> Loading ... </div>
                ) : (
                    <ThemeProvider theme={theme}>
                        <QuizListBox basicData={this.state.basicData}/>
                    </ThemeProvider>
                    
                )}
            </div>
        );
    }
}
 
export default HubCours;