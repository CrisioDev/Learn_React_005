import React, { Component } from 'react';
import './App.css';
import Person from './Person/Person'

class App extends Component {
  state  = {
    persons: [
      {id:'170364', name: 'Christopher',age:'28'},
      {id:'918471', name: 'Gina',age:'25'},
      {id:'871642', name: 'Calvin',age:'20'}
    ],
    showPersons: false
  }

  deletePersonHandler = (personIndex) => {
    //const persons = this.state.persons.slice(); //slice to create a copy of state
    const persons = [...this.state.persons]; //... to spread the array to the new const array
    persons.splice(personIndex, 1);
    this.setState({persons: persons});
  }

  nameChangedHandler = (event, id) =>{
    const personIndex = this.state.persons.findIndex(p => {
      return p.id === id;
    });
    
    const person = {...this.state.persons[personIndex]};

    person.name = event.target.value;

    const persons = [...this.state.persons];
    persons[personIndex] = person;

    this.setState({ persons: persons});
  }

  togglePersonsHandler = () => {
    this.setState({
      showPersons: !this.state.showPersons
    });
  }

  render() {
    const style = {
      backgroundColor: 'green',
      color: 'white',
      font: 'inherit',
      border: '1px solid #eee',
      padding: '8px',
      cursor: 'pointer'
    };

    let persons = null;

    if(this.state.showPersons){
      persons = (
        <div>
          {this.state.persons.map((person, index) => {
            return <Person
              click={() => this.deletePersonHandler(index)}
              name={person.name} 
              age={person.age}
              key={person.id}
              changed={(event) => this.nameChangedHandler(event, person.id)} />
          })}
        </div>
      );
      style.backgroundColor = 'red';
    }

    let classes =[];
    if (this.state.persons.length <= 2) {
      classes.push('red'); //red will be pushed to classes
    }
    if (this.state.persons.length <= 1) {
      classes.push('bold');
    }

    return (
      <div className="App">
        <h1>Hi, I'm a React App!</h1>
        <p className={classes.join(' ')}>Crazy JSX Stuff is goin' on!</p>
        <button 
          style={style}
          onClick={this.togglePersonsHandler} >Toggle Persons</button>
          {persons}
      </div>
    );
  }
}

export default App;
