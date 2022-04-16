import React, { Component } from 'react';

class HubCours extends Component {
    state = { 
        loading : true,
        data : null
    } 

    async componentDidMount () {
        const url = "http://localhost:5000";
        const response = await fetch(url);
        const data = await response.json();
        this.setState({loading : false, data : data["title"]})
        
    }

    render() { 
        return (
            <div>
                {this.state.loading || !this.state.data ? (
                    <div> Loading ... </div>
                ) : (
                    <div> {this.state.data} </div>
                )}
            </div>
        );
    }
}
 
export default HubCours;