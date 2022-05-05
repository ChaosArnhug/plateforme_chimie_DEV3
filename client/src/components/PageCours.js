//import { MenuItem } from '@mui/material';
import { Button } from '@mui/material';
import React, {Component} from 'react';
import {useParams} from 'react-router-dom';

class CoursPage extends Component{
    
    render() {   
//        console.log("coursss  "+this.props.cours);     
        return (
            <div>
                <h1>{this.props.cours}</h1>
                <fieldset>
                    <legend>{this.props.cours}</legend>
                {this.props.data.map((item) => (
                    item.disponnible == 1 &&
                        <div>
                            <p>{item.description}</p>
                            <Button href={`http://localhost:3000/cours/${this.props.cours}/quiz/${item.titre}`} >{item.titre}</Button>
                        </div>                   
                ))}
                </fieldset>
            </div>
        );
    }


}

class PageCours extends Component{
    constructor(props){
        super(props)
        this.state = {
            loading : true,
            data : null,
            cours : null
        }
    }
    

    async componentDidMount() {   
        const {cours} = this.props.params;
        const url = `http://localhost:5000/cours/${cours}/quiz`;
 //       const url = `http://localhost:5000/cours/les%20molécules/quiz`;
 //       console.log(url);
        const response = await fetch(url);
        const data = await response.json();
 //       console.log("reponse "+response)
 //      console.log("data "+data.titre)
 //       console.log("url "+url)
        await this.setState({loading : false, data : data, cours : cours});
//        console.log("titre "+this.state.data[0].titre)
//        console.log("cours "+this.props.params[0]+"  "+cours)
    }

    render(){
        return(
            <div>
            {this.state.loading || !this.state.data ? (
                <div> Loading ... </div>
            ) : (
                <CoursPage data={this.state.data} cours={this.state.cours}/>     
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