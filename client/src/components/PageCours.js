import React, {useState, useEffect, Component} from 'react';
import {Link, useParams} from 'react-router-dom';

class CoursPage extends Component{

//    useEffect(() => {
//        fetchItems();
//    }, []);

//    const [quizs, setItems] = useState([]);

//    const fetchItems = async () => {
//        const data = await fetch('http://localhost:5000/quiz/'+{idCours});

//        const quizs = await data.json();
//        setItems(quizs.quizs);
//    }
    render() {
        return (
            <div>
                {this.props.data.map(item => (
                    <h1 key={item.idQuizs}>
                        <Link to=`http://localhost:5000/quiz/${item.idQuizs}/${idCours}`>{item.titreQuizs}</Link>
                    </h1>
                ))}
            </div>
        );
    }


}

class PageCours extends Component{
    state = {
        loading : true,
        data : null
    }

    async componentDidMount() {
        const {cours} = useParams()
        const url = "http://localhost:5000/quiz/"+{cours};
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