import React, {Component} from 'react';
import './search.css';
import axios from 'axios';
import List from '../lists/list.js';

class Search extends Component {
    state = {
        text: '',
        darkSideList: [],
        lightSideList: []
    }


    handleInputChange = (value) => {
        this.setState({
          text: value
        })
    }

    addPersonLight = () => {
        axios.post('http://localhost:8000/characters', {searchedCharacter:this.state.text})
        .then(response => {
            let newPerson = response.data;
            const newObj = {
                name: newPerson.name,
                homePlanet: newPerson.homeworld,
                species: newPerson.species,
                birthYear: newPerson.birth_year
            }
            this.setState({ lightSideList: [...this.state.lightSideList, newObj]})
        })
        .catch(error => {
            alert(error.response.data.errorMessage)
        })

        this.setState({ text: ''})
    }


    addPersonDark = () => {
        axios.post('http://localhost:8000/characters', {searchedCharacter: this.state.text})
        .then(response => {
        let newPerson = response.data;
        const newObj = {
            name: newPerson.name,
            homePlanet: newPerson.homeworld,
            species: newPerson.species,
            birthYear: newPerson.birth_year
        }
        this.setState({ darkSideList: [...this.state.darkSideList, newObj]})
        })
        .catch(error => {
            alert(error.response.data.errorMessage)
        })

        this.setState({ text: ''})

    }

    render(){
        let darkList = this.state.darkSideList.map((person, i) => {
            return <List key={i} name={person.name} homeWorld={person.homePlanet} species={person.species} birthYear={person.birthYear} />
        })
        let lightList = this.state.lightSideList.map((person, i) => {
            return <List key={i} name={person.name} homeWorld={person.homePlanet} species={person.species} />
        })
        return(
            <div className="full-body-container">
              <div className="list">
                {lightList}
              </div>
              <div className="search-container">
                 <div className="search-items">
                   <div className="span">Search For Star Wars Character: </div>
                   <input 
                     className="search-input" 
                     placeholder="find your character..."
                     value={this.state.text}   
                     onChange={(e) => this.handleInputChange(e.target.value)}
                   />
                 </div>
                 <div className="add-buttons">
                    <button onClick={this.addPersonLight}>Add to Light Side</button>
                    <button onClick={this.addPersonDark}>Add to Dark Side</button>
                 </div>           
              </div>
              <div className="list">
                {darkList}
              </div>
            </div>
        )
    }
}

export default Search;