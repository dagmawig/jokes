import React from 'react';
import './App.css';
import 'bootstrap/dist/css/bootstrap.css'
import Joke from './Joke'



function App() {
  return (
    <div className="container">
      <div className="row align-items-center">
        <div className="col-12">
          <Joke/>
        </div>
      </div>
    </div>
  );
}

export default App;
