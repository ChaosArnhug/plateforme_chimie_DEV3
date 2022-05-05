import React, { Component } from 'react';
import ReactDOM from 'react-dom';


import { createTheme } from '@mui/material/styles';
import { unstable_styleFunctionSx, styled } from '@mui/system';
//import { styled } from '@mui/material/styles';


import Button from '@mui/material/Button';


import MultReponsesQCM from "./MultReponsesQCM.js";


// import theme from '../index.js'
// Faire un import au lieu de recréer le theme fait que rien ne s'affiche -> ?

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

//Les balises HTML de base ne peuvent pas être modifiée avec sx={{.....}}. On doit créer un nouveau 
// type de balise à partir de celles-ci pouvant utiliser sx. 
const Div = styled('div')(unstable_styleFunctionSx);




class ParamQCM extends Component{
    constructor(props){
        super(props);
        this.state={nmbreQCMReponses:2}; 
        // On mets l'id de début de question à 0, on l'incrémente pour donner un nouvel id à chaque question.
    }

    async ajoutRetraitReponse(action){
        if(action === "ajout"){
            await this.setState((state)=> ({
                nmbreQCMReponses: state.nmbreQCMReponses+1
            }));
            ReactDOM.render(
                <MultReponsesQCM nmbreQCMReponses={this.state.nmbreQCMReponses}/>,
                document.getElementById('reponsesQCM')
            );
        }
        else if(action === "retrait"){
            if(this.state.nmbreQCMReponses < 2 ){
                alert("Pas moins de deux solutions svp!")  // Mettre qqchose MUI
            }
            else{
                await this.setState((state)=> ({
                    nmbreQCMReponses: state.nmbreQCMReponses-1
                }));
                ReactDOM.render(
                    <MultReponsesQCM nmbreQCMReponses={this.state.nmbreQCMReponses} />,
                    document.getElementById('reponsesQCM')
                );
            }
        }
        
    }

    componentDidMount(){
        ReactDOM.render(
            <MultReponsesQCM nmbreQCMReponses={2} />,
            document.getElementById('reponsesQCM')
        );
    }


    render(){
        return(
            
            <Div>
                <Div id="reponsesQCM">
                    
                    
                </Div>
                <Div sx={{display:"flex"}}>
                    <Button variant="outlined" sx={{ml:9, mr:2, mt:2}} onClick={()=> this.ajoutRetraitReponse("ajout")}>+</Button>
                    <Button variant="outlined" sx={{ml:1, mr:2, mt:2}} onClick={()=> this.ajoutRetraitReponse("retrait")}>-</Button>
                </Div>
            </Div>
            
            

        )
    }
}


export default ParamQCM;