import React from 'react';
import './App.css';
import InputBoxMain from './components/inputBoxMain';
import InputBoxGridResults from './components/inputBoxGridResults';
import InputBoxTableResults from './components/inputBoxTableResults';

function App() {
  return (
    <div className="App">
      <InputBoxMain/>
      <InputBoxGridResults/>
      <InputBoxTableResults/>
    </div>
  );
}

export default App;
