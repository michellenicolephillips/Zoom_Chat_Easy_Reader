import React, { useState } from 'react';
import './App.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import TableResults from './components/tableResults';
import InputBox from './components/inputBox';
import { zoomChatParser } from './utilities/zoomChatParser';
import { Button } from 'react-bootstrap/';

function App() {
  const sampleText: string = `11:48:19	 From  BentleyDavis.com : Welcome to ZoomChat Easy Reader! 😀
  11:48:31	 From  BentleyDavis.com : Zoom chats are hard to read. We can help.
  11:49:04	 From  Michelle Phillips : Copy and paste your zoom chat here to get started.

  Or, if you prefer, drag a zoom chat text file over.
  11:50:18	 From  BentleyDavis.com : Use the buttons below to format it how you'd like!`;
  const [parsedInput, setParsedInput] = useState(zoomChatParser(sampleText));
  const [input, setInput] = useState(sampleText);
  const [hideNamesOn, setHideNamesOn] = useState(true);
  const [blankSpace, setBlankSpace] = useState(false);
  const [hideTimeStampsOn, setHideTimeStampsOn] = useState(true);
  const [markdownOn, setMarkdownOn] = useState(false);

  const hideNames = () => {
    setHideNamesOn(!hideNamesOn);
  }
  const addSpace = () => {
    setBlankSpace(!blankSpace);
  }

  const hideTimeStamps = () => {
    setHideTimeStampsOn(!hideTimeStampsOn);
  }

  const showMarkdown = () => {
    setMarkdownOn(!markdownOn);
  }

  const copyResults = () => {
    let copyText = document.querySelector("#results");
    //navigator.clipboard.writeText(copyText.outerHTML)
    setClipboard(copyText?.outerHTML || "");
  }

  function setClipboard(text: string) {
    var type = "text/html";
    var blob = new Blob([text], { type });
    // @ts-ignore
    var data = [new ClipboardItem({ [type]: blob })];
    // @ts-ignore
    navigator.clipboard.write(data).then(
      function () {
        /* success */
      },
      function () {
        /* failure */
      }
    );
  }

  //const blob = new Blob(["Something was downloaded."], { type: "text/plain" });
  //const downloadURL = URL.createObjectURL(blob);
  //URL.revokeObjectURL(downloadURL);


  return (
    <div className="App container">
      <div className="row">
        <div className="col text-center">This app will only be available for a week! If you want to see it permanently free and public please <a href="https://www.gofundme.com/f/public-zoom-chat-formatter" rel="noreferrer" target="_blank">donate</a>.</div>
      </div>
      {parsedInput.length === 0 && input.length > 0 ? <div className="alert-danger">"That is not the correct format. Please insert a zoom chat!"</div> : ''}
      <InputBox setParsedInput={setParsedInput} setInput={setInput} input={input}></InputBox>
      <div className="d-grid gap-2 d-md-block">
        <Button type="button" className="me-2 my-3 btn btn-secondary btn-sm col" onClick={hideTimeStamps}>{hideTimeStampsOn ? 'Hide Time Stamps' : 'Show Time Stamps'}</Button>
        <Button type="button" className="me-2 my-3 btn btn-secondary btn-sm col" onClick={hideNames}>{hideNamesOn ? 'Hide Names' : 'Show Names'}</Button>
        <Button type="button" className="me-2 my-3 btn btn-secondary btn-sm col" onClick={addSpace}>{blankSpace ? 'No Space Between Chats' : 'Add Space Between Chats'}</Button>
        <Button type="button" className="me-2 my-3 btn btn-secondary btn-sm col" onClick={showMarkdown}>{markdownOn? 'Hide Markdown' : 'Show Markdown'}</Button>
      </div>
      <TableResults parsedInput={parsedInput} hideNamesOn={hideNamesOn} blankSpace={blankSpace} hideTimeStampsOn={hideTimeStampsOn} markdownOn={markdownOn}/>
      <div className="d-grid gap-2 d-md-block">
        <Button type="button" className="me-2 my-3 btn btn-secondary btn-sm col float-end" onClick={copyResults}>Copy</Button>
      </div>
      {/*<div className="row">
        <div className="col">
          <a
            href={downloadURL}
            download="zoom-chat-easy-reader-results">
            Download Chat
          </a>
        </div>
  </div>*/}
      <div className="row">
        <div className="col text-center my-3">
          In the future all data will be processed on your computer.
          Until the <a href="https://www.gofundme.com/f/public-zoom-chat-formatter" rel="noreferrer" target="_blank">donation goal</a> is reached your data can be sent to a central server for processing but not stored.
        </div>
      </div>
    </div>
  );
}

export default App;
