import React, { useState } from 'react';
//import './App.css';
import 'bootstrap/dist/css/bootstrap.min.css';
// import DivResults from './components/divResults';
// import GridResults from './components/gridResults';
import TableResults from './components/tableResults';
import InputBox from './components/inputBox';
import { zoomChatParser } from './utilities/zoomChatParser';
import { Button } from 'react-bootstrap/';

function App() {
  const sampleText: string = `11:48:19	 From  BentleyDavis.com : Welcome to ZoomChat Easy Reader! 😀 
  11:48:31	 From  BentleyDavis.com : Zoom chats are hard to read. We can help.
  11:49:04	 From  Michelle Phillips : Copy and paste your zoom chat here to get started.
  11:49:35	 From  Michelle Phillips : Or, if you prefer, drag a zoom chat text file over.
  11:50:18	 From  Michelle Phillips : Use the buttons below to format it how you'd like!`;
  const [parsedInput, setParsedInput] = useState(zoomChatParser(sampleText));
  const [input, setInput] = useState(sampleText);
  // const [selection, setSelection] = useState("tableLayout");
  const [hideNamesOn, setHideNamesOn] = useState(true);
  const [blankSpace, setBlankSpace] = useState(false);
  const [hideTimeStampsOn, setHideTimeStampsOn] = useState(true);

  // const handleChange = (event: React.ChangeEvent<HTMLSelectElement> | undefined) => {
  //   if (event) {
  //     event && setSelection(event.target.value);
  //   }
  // }

  const hideNames = () => {
    setHideNamesOn(!hideNamesOn);
  }
  const addSpace = () => {
      setBlankSpace(!blankSpace);
  }

  const hideTimeStamps = () => {
      setHideTimeStampsOn(!hideTimeStampsOn);
  }

  return (
    <div className="App container">
      <div className="row">
        <div className="col text-center">This app will only be available for a week! If you want to see it permanently free and public please <a href="https://www.gofundme.com/f/public-zoom-chat-formatter" rel="noreferrer" target="_blank">donate</a>.</div>
      </div>
      {parsedInput.length === 0 && input.length > 0 ? <div style={{ background: "tomato", padding: "20px" }}>"That is not the correct format. Please insert a zoom chat!"</div> : ''}
      <InputBox setParsedInput={setParsedInput} setInput={setInput} input={input}></InputBox>
      <br/>
      {/*<select value={selection} onChange={handleChange}>
        <option value="divLayout">Div Results</option>
        <option value="gridLayout">Grid Results</option>
        <option value="tableLayout">Table Results</option>
  </select>*/}
      <div className="d-grid gap-2 d-md-block">
        <Button type="button" className="me-2 btn btn-secondary btn-sm col" onClick={hideTimeStamps}>{hideTimeStampsOn ? 'Hide Time Stamps' : 'Show Time Stamps'}</Button>
        <Button type="button" className="me-2 btn btn-secondary btn-sm col" onClick={hideNames}>{hideNamesOn ? 'Hide Names' : 'Show Names'}</Button>
        <Button type="button" className="me-2 btn btn-secondary btn-sm col" onClick={addSpace}>{blankSpace ? 'No Space Between Chats' : 'Add Space Between Chats'}</Button>
      </div>
      <br/> <br/>
      {/*
        selection === "divLayout" ? <DivResults parsedInput={parsedInput} hideNamesOn = {hideNamesOn} blankSpace={blankSpace}/> :
          selection === "gridLayout" ? <GridResults parsedInput={parsedInput} hideNamesOn = {hideNamesOn} blankSpace={blankSpace}/> :
            selection === "tableLayout" ? <TableResults parsedInput={parsedInput} hideNamesOn = {hideNamesOn} blankSpace={blankSpace}/> : ""
      */}
      <TableResults parsedInput={parsedInput} hideNamesOn={hideNamesOn} blankSpace={blankSpace} hideTimeStampsOn={hideTimeStampsOn} />
      <div className="row">
        <div className="col text-center">
          In the future all data will be processed on your computer.
          Until the <a href="https://www.gofundme.com/f/public-zoom-chat-formatter" rel="noreferrer" target="_blank">donation goal</a> is reached your data can be sent to a central server for processing but not stored.
        </div>
      </div>
    </div>
  );
}

export default App;
