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
    </div>
  );
}

export default App;
