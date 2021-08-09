import React, { useState } from 'react';
import './App.css';
import DivResults from './components/divResults';
import GridResults from './components/gridResults';
import TableResults from './components/tableResults';
import InputBox from './components/inputBox';
import { ZoomChat } from './utilities/zoomChatParser';

function App() {

  const [parsedInput, setParsedInput] = useState(Array<ZoomChat>());

  const [selection, setSelection] = useState();

  const handleChange = (event: any) => {
    setSelection(event.target.value);
  }


  return (
    <div className="App">
      <InputBox setParsedInput={setParsedInput}></InputBox>
      <select value={selection} onChange={handleChange}>
        <option value="divLayout">Div Results</option>
        <option value="gridLayout">Grid Results</option>
        <option value="tableLayout">Table Results</option>
      </select>

      {(() => {
        if (selection === "divLayout") {
          return <DivResults parsedInput={parsedInput} />
        }
        if (selection === "gridLayout") {
          return <GridResults parsedInput={parsedInput} />
        }
        if (selection === "tableLayout") {
          return <TableResults parsedInput={parsedInput} />
        }
      })()
      }
    </div>
  );
}

export default App;
