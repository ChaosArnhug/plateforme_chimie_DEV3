import React, { Component } from 'react';
import axios from 'axios';

import {ThemeProvider, createTheme } from '@mui/material/styles';
import { unstable_styleFunctionSx, styled } from '@mui/system';

class UserConnection extends Component{

  state = {
    email : '',
    motDePasse : ''
  }


  submitHandler = form =>{
    form.preventDefault();
    const params = new URLSearchParams();
    params.append("email", this.state.email);
    params.append("motDePasse", this.state.motDePasse);
    
    axios.post("http://localhost:5000/utilisateurs/connexion", params)
      .then(res => console.log(res)).catch(err => console.log(err)) ;
  }

  changeHandler = (e) =>{
    this.setState({[e.target.name] : e.target.value});
  } 


    render(){
      return(
        <form onSubmit={this.submitHandler}>

          <label for={"eamil"}>Email :</label>
          <input type={"text"} id={"email"} name={"email"} onChange={this.changeHandler}></input>
          <label for={"motDePasse"}>Mot de passe:</label>
          <input type={"text"} id={"motDePasse"} name={"motDePasse"} onChange={this.changeHandler}></input>
          <input type={"submit"} value={"Submit"}></input>

        </form>
      )
    }
    
  }


export default UserConnection;