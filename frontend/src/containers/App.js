import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Switch, Route } from 'react-router';
import { VisiblePosts } from './VisiblePosts'
import logo from '../logo.svg';
import '../App.css';

class App extends Component {

    state = {
        shouldFetchPosts: true
    };

    componentDidMount(){
        if(this.state.shouldFetchPosts){
            this.props.getAllPosts();
            this.setState({
                shouldFetchPosts: false
            });
        }
    }
    // constructor(props) {
    //     super(props);
    //     this.state = {
    //         backend: 'backend-data'
    //     }
    // }
    //
    // componentDidMount() {
    //     const url = `http://localhost:3001/categories`;
    //     console.log('fetching from url', url);
    //     fetch(url, { headers: { 'Authorization': 'whatever-you-want' },
    //        } )
    //         .then( (res) => { return(res.text()) })
    //         .then((data) => {
    //             this.setState({backend:data});
    //         });
    // }

    render() {

        return (
            <div className="App">
                <div>
                    <h1>Readable(React-Redux-APP)</h1>
                </div>
                <Switch>
                    <Route exact path="/" render={() => <VisiblePosts/>}/>
                </Switch>
            </div>
        );
    }
}

export default App;
