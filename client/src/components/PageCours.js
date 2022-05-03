import { MenuItem } from '@mui/material';
import React, {useState, useEffect, Component} from 'react';
import {Link, useParams} from 'react-router-dom';

class CoursPage extends Component{

    render() {
        return (
 //           <h1>Hi</h1>
            <div>
                <h1>Hi</h1>
                {this.props.data.map(item => (
                    <MenuItem >{item.titre}</MenuItem>
                ))}
            </div>
        );
    }


}

class PageCours extends Component{
    constructor(props){
        super(props)
        this.state = {
            loading : true,
            data : null
        }
    }
    

    async componentDidMount() {   
             
        const url = "http://localhost:5000/les%20molécules/quiz";
        const response = await fetch(url);
        const data = await response.json();
        this.setState({loading : false, data : data});
    }

    render(){
        return(
            <CoursPage data={this.state.data} />
        )

    }
}

export default PageCours;

// const {cours} = useParams();

//href={`http://localhost:5000/quiz/${item.idQuizs}`}