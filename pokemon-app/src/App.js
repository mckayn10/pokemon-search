import React, { Component } from 'react';
import axios from 'axios';
import './App.css';
import Create from './components/create/Create.js';
import Search from './components/search/Search.js';
import Header from './components/header/Header.js';
import DarkList from './components/list-dark-side/dark-list';



class App extends Component {
  state = {
    name: '',
    type: '',
    moves: '',
    id: 0,
    description: '',
    charactersList: [],
    data: []
  }


  componentDidMount(){
    axios.get("https://swapi.co/api/people")
    .then( response => {
      console.log(response.data.results);
      this.setState({ data: response.data.results });
    })
    .catch((error) => {
      console.log(error)
    })
  }

  render() {
    return (
      
      <div className="full-body">
        <div>
          <Header />
        </div>
           <div className="large-container">
              <div className="left-container">
              </div>
              <div >
                <Search />
                <Create />
              </div>
              <div className="right-container">
              </div>
           </div>
      </div>
    );
  }
}

export default App;
