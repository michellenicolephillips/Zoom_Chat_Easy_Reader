import React, { useState } from 'react';
import './App.css';
// import DivResults from './components/divResults';
// import GridResults from './components/gridResults';
import TableResults from './components/tableResults';
import InputBox from './components/inputBox';
import { ZoomChat } from './utilities/zoomChatParser';

function App() {

  const [parsedInput, setParsedInput] = useState(Array<ZoomChat>());
  const [input, setInput] = useState('');
  // const [selection, setSelection] = useState("tableLayout");
  const [hideNamesOn, setHideNamesOn] = useState(true);
  const [blankSpace, setBlankSpace] = useState(false);

  // const handleChange = (event: React.ChangeEvent<HTMLSelectElement> | undefined) => {
  //   if (event) {
  //     event && setSelection(event.target.value);
  //   }
  // }

  const addSampleText = () => {
    setInput(`11:48:19	 From  BentleyDavis.com : 😀 at the start
    11:48:31	 From  BentleyDavis.com : Emoji at the end 😀
    11:49:04	 From  Michelle Phillips : EMOJI 😃 IN THE MIDDLE
    11:49:35	 From  Michelle Phillips : test with tab copied over
    11:50:18	 From  Michelle Phillips : hello`);
  }
  const hideNames = () => 
  {
    if (hideNamesOn) {
      setHideNamesOn(false);
    }
    if (hideNamesOn === false) {
      setHideNamesOn(true);
    }
  }
  const addSpace = () => 
  {
    if (blankSpace) {
      setBlankSpace(false);
    } 
    if (blankSpace === false) {
      setBlankSpace(true);
    }
  }

  return (
    <div className="App">
      <div style={{ textAlign: "center" }}>This app will only be available for a week! If you want to see it permanently free and public please <a href="https://www.gofundme.com/f/public-zoom-chat-formatter" rel="noreferrer" target="_blank">donate</a>.</div>
      <br></br><br></br>
      {parsedInput.length === 0 && input.length>0 ?<div style={{background:"tomato", padding:"20px"}}>"That is not the correct format. Please insert a zoom chat!"</div> : ''}
      <InputBox setParsedInput={setParsedInput} setInput={setInput} input={input}></InputBox>
      {/*<select value={selection} onChange={handleChange}>
        <option value="divLayout">Div Results</option>
        <option value="gridLayout">Grid Results</option>
        <option value="tableLayout">Table Results</option>
  </select>*/}
      <button onClick={addSampleText}>Add Sample Text</button>
      <button onClick={hideNames}>{hideNamesOn ? 'Hide Names' : 'Show Names'}</button>  
      <button onClick={addSpace}>{blankSpace ? 'No Space Between Chats' : 'Add Space Between Chats'}</button>
      <br/>
      {/*
        selection === "divLayout" ? <DivResults parsedInput={parsedInput} hideNamesOn = {hideNamesOn} blankSpace={blankSpace}/> :
          selection === "gridLayout" ? <GridResults parsedInput={parsedInput} hideNamesOn = {hideNamesOn} blankSpace={blankSpace}/> :
            selection === "tableLayout" ? <TableResults parsedInput={parsedInput} hideNamesOn = {hideNamesOn} blankSpace={blankSpace}/> : ""
      */}
      <TableResults parsedInput={parsedInput} hideNamesOn= {hideNamesOn} blankSpace={blankSpace}/>
      <br/><br/>
       <div style={{ textAlign: "center" }}>
        In the future all data will be processed on your computer.
        Until the <a href="https://www.gofundme.com/f/public-zoom-chat-formatter" rel="noreferrer" target="_blank">donation goal</a> is reached your data can be sent to a central server for prcessing but not stored.
      </div>
    </div>
  );
}

export default App;
