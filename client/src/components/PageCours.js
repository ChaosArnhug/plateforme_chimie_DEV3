//import { MenuItem } from '@mui/material';
import { Button } from '@mui/material';
import React, {Component} from 'react';
import {useParams} from 'react-router-dom';

class CoursPage extends Component{

    render() {
        return (
            <div>
                <h1>Hi</h1>
                {this.props.data.map((item) => (
                    item.disponnible == 1 &&
                        <div>
                            <h3>{item.description}</h3>
                            <Button href={`http://localhost:3000`} >{item.titre}</Button>
                        </div>
                    
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
        const url = `http://localhost:5000/cours/${cours}/quiz`;
 //       const url = `http://localhost:5000/cours/les%20molécules/quiz`;
        console.log(url);
        const response = await fetch(url);
        const data = await response.json();
 //       console.log("reponse "+response)
   //     console.log("data "+data.titre)
 //       console.log("url "+url)
        await this.setState({loading : false, data : data});
//        console.log("titre "+this.state.data[0].titre)
    }

    render(){
        return(
            <div>
            {this.state.loading || !this.state.data ? (
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