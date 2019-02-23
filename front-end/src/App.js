import React, { Component } from 'react';
import UserData from './UserData';



class App extends Component {
  render() {
    return (
      <div className="App">
        <div className="container-fluid">          
          <div className="container">
            <div className="row text-center"> 
              <div className="col">
                <h1 className="display-4">TT Education Interview Task</h1>
                <p>Author: Bartlomiej Kloza</p>
              </div>
            </div>
            <UserData />
          </div>
        </div>
      </div>
    );
  }
}

export default App;
