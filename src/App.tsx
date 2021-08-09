import React, { useState } from 'react';
import './App.css';
import DivResults from './components/divResults';
import GridResults from './components/gridResults';
import TableResults from './components/tableResults';
import InputBox from './components/inputBox';
import { ZoomChat } from './utilities/zoomChatParser';

function App() {

  const [parsedInput, setParsedInput] = useState(Array<ZoomChat>());


  return (
    <div className="App">
      <InputBox setParsedInput={setParsedInput}></InputBox>
      Grid Results
      <GridResults parsedInput={parsedInput}/>
      ========================
      <br/>
      Table Results
      <TableResults parsedInput={parsedInput}/>
      ========================
      <br/>
      Div Results
      <DivResults parsedInput={parsedInput}/>
    </div>
  );
}

export default App;
