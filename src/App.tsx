import React, { useState } from 'react';
import './App.css';
import DivResults from './components/divResults';
import GridResults from './components/gridResults';
import TableResults from './components/tableResults';
import InputBox from './components/inputBox';
import { ZoomChat } from './utilities/zoomChatParser';

function App() {

  const [parsedInput, setParsedInput] = useState(Array<ZoomChat>());

  const [selection, setSelection] = useState("tableLayout");

  const handleChange = (event: React.ChangeEvent<HTMLSelectElement> | undefined) => {
    if (event) {
      event && setSelection(event.target.value);
    }
  }


  return (
    <div className="App">
      <div style={{ textAlign: "center" }}>This app will only be available for a week! If you want to see it permanently free and public please <a href="https://www.gofundme.com/f/public-zoom-chat-formatter" rel="noreferrer" target="_blank">donate</a>.</div>
      <br></br><br></br>
      <InputBox setParsedInput={setParsedInput}></InputBox>
      <select value={selection} onChange={handleChange}>
        <option value="divLayout">Div Results</option>
        <option value="gridLayout">Grid Results</option>
        <option value="tableLayout">Table Results</option>
      </select>

      {
        selection === "divLayout" ? <DivResults parsedInput={parsedInput} /> :
          selection === "gridLayout" ? <GridResults parsedInput={parsedInput} /> :
            selection === "tableLayout" ? <TableResults parsedInput={parsedInput} /> : ""
      }
      <br/><br/>
       <div style={{ textAlign: "center" }}>
        In the future all data will be processed on your computer.
        Until the <a href="https://www.gofundme.com/f/public-zoom-chat-formatter" rel="noreferrer" target="_blank">donation goal</a> is reached your data can be sent to a central server for prcessing but not stored.
      </div>
    </div>
  );
}

export default App;
