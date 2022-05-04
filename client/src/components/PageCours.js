//import { MenuItem } from '@mui/material';
import React, {Component} from 'react';
import {Link, useParams} from 'react-router-dom';

class CoursPage extends Component{

    render() {
        return (
 //           <h1>Hi</h1>
            <div>
                <h1>Hi</h1>
                {this.props.data.map(item => (
                    <h1 >{item.titre}</h1>
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
        const {cours} = this.props.params;
        const url = "http://localhost:5000/cours/"+{cours}+"/quiz";
        console.log(url);
        const response = await fetch(url);
        const data = await response.json();
        console.log("++==============================================================================================="+{response})
        console.log("--"+{data})
        console.log(url)
        this.setState({loading : false, data : data});
    }

    render(){
        return(
            <div>
            {this.state.loading || !this.state.basicData || !this.state.quizData ? (
                <div> Loading ... </div>
            ) : (
                <CoursPage data={this.state.data} />     
            )}
        </div>
           
        )

    }
}

export default (props) => (
    <PageCours {...props} params={useParams()}/>
);

// const {cours} = useParams();     +{cours}+

//href={`http://localhost:5000/quiz/${item.idQuizs}`}