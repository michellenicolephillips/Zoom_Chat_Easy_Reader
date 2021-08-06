import React, { useState } from 'react';
import './App.css';
import InputBoxMain from './components/inputBoxMain';
import InputBoxGridResults from './components/inputBoxGridResults';
import InputBoxTableResults from './components/inputBoxTableResults';
import InputBox from './components/inputBox';
import { ZoomChat } from './utilities/zoomChatParser - Copy';

function App() {

  const [parsedInput, setParsedInput] = useState(Array<ZoomChat>());


  return (
    <div className="App">
      <InputBox setParsedInput={setParsedInput}></InputBox>
      <InputBoxGridResults parsedInput={parsedInput}/>
      ---------------------------------
      <InputBoxGridResults parsedInput={parsedInput}/>
      {/* <InputBoxMain/>
      <InputBoxTableResults/> */}
    </div>
  );
}

export default App;
