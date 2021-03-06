import React, { useState } from 'react';
import './App.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import TableResults from './components/tableResults';
import InputBox from './components/inputBox';
import { Message, zoomChatParser } from './utilities/zoomChatParser';
import { Button } from 'react-bootstrap/';
import copy from 'copy-to-clipboard';
import { blockQuoteText } from './utilities/blockQuoteText';

function App() {
  const sampleText: string = `11:48:19	 From  BentleyDavis.com : Welcome to ZoomChat Easy Reader! 😀
  11:48:31	 From  BentleyDavis.com : Zoom chats are hard to read. We can help.
  11:49:04	 From  Michelle Phillips : Copy and paste your zoom chat here to get started.

  Or, if you prefer, drag a zoom chat text file over.
  11:50:18	 From  BentleyDavis.com : Use the buttons below to format it how you'd like!`;
  const [parsedInput, setParsedInput] = useState(zoomChatParser(sampleText));
  const [input, setInput] = useState(sampleText);
  const [submit, setSubmit] = useState(false);
  const [showNamesOn, setShowNamesOn] = useState(true);
  const [blankSpace, setBlankSpace] = useState(false);
  const [hideTimeStampsOn, setHideTimeStampsOn] = useState(true);
  const [markdownOn, setMarkdownOn] = useState(false);
  const [showHiddenOn, setShowHiddenOn] = useState(true);

  const submitForResults = () => {
    setSubmit(!submit);
  }

  const showNames = () => {
    setShowNamesOn(!showNamesOn);
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

  const showHidden = () => {
    setShowHiddenOn(!showHiddenOn)
  }

  const copyResults = () => {
    let copyText = document.querySelector("#results");
    copy(copyText?.outerHTML || "", {
      format: "text/html"
    });
    alert("Copied!");
  }

  const setDownloadResults = (parsedInput: Message[]) => {
    var data = "";
    for (const message of parsedInput) {

      if (showNamesOn && message.repeatedFromTo === false) {
        if (markdownOn) {
          if (message.firstTimeNameAppears) {
            data += "[[" + message.from + "]] ";
          }
        }
        data += message.from;
      } else {
        data += "";
      }

      if (hideTimeStampsOn) {
        if (markdownOn) {
          data += "*" + message.when + "* ";
        } else {
          data += message.when + " ";
        }
      }
      if (markdownOn) {
        data += ">" + blockQuoteText(message.content);
      } else {
        data += message.content;
      }
      if (blankSpace) {
        if (markdownOn) {
          data += "\r\n>"
        } else {
          data += "\r\n "
        }
      }
      data += "\r\n"
    }
    return data;
  }

  const downloadFile = () => {
    let downloadResults = setDownloadResults(parsedInput);
    const blob = new Blob([downloadResults], { type: "text/html" });
    const downloadURL = URL.createObjectURL(blob);
    var hiddenElement = document.createElement('a');
    hiddenElement.href = downloadURL;
    hiddenElement.target = '_blank';
    hiddenElement.download = "zoom-chat-easy-reader-results";
    hiddenElement.click();
    setTimeout(() => {
      URL.revokeObjectURL(downloadURL);
      hiddenElement?.parentElement?.removeChild(hiddenElement);
    }, 1000);
  }

  return (
    <div className="App container">
      <div className="row">
        <div className="jumbotron jumbotron-fluid">
          <div className="container">
            <h1 className="display-4">Zoom Chat Easy Reader</h1>
            <p className="my-4">Created by <a href="https://michellephillips.me" target="_blank" rel="noreferrer">Michelle Phillips</a> with help from <a href="https://bentleydavis.com" target="_blank" rel="noreferrer">Bentley Davis</a>,
     Funded by <a href="https://www.vincentarena.com/" target="_blank" rel="noreferrer">Vincent Arena</a> and <a href="http://peterkaminski.com/" target="_blank" rel="noreferrer">Peter Kaminski</a></p>
          </div>
        </div>
      </div>
      {parsedInput.length === 0 && input.length > 0 ? <div className="alert-danger">"That is not the correct format. Please insert a zoom chat!"</div> : ''}
      <InputBox setParsedInput={setParsedInput} setInput={setInput} input={input} submit={submit}></InputBox>
      <div className="d-grid gap-2 d-md-block">
        <Button type="button" className="me-2 my-3 btn btn-secondary btn-sm col" onClick={submitForResults}>{submit? "Change Input Data" : "Submit Input Data"}</Button>
        <div className = {submit? '' : 'hideEditButtons'}>
        <Button type="button" className="me-2 my-3 btn btn-secondary btn-sm col" onClick={hideTimeStamps}>{hideTimeStampsOn ? 'Hide Time Stamps' : 'Show Time Stamps'}</Button>
        <Button type="button" className="me-2 my-3 btn btn-secondary btn-sm col" onClick={showNames}>{showNamesOn ? 'Hide Names' : 'Show Names'}</Button>
        <Button type="button" className="me-2 my-3 btn btn-secondary btn-sm col" onClick={addSpace}>{blankSpace ? 'No Space Between Chats' : 'Add Space Between Chats'}</Button>
        <Button type="button" className="me-2 my-3 btn btn-secondary btn-sm col" onClick={showMarkdown}>{markdownOn ? 'Hide Markdown' : 'Show Markdown'}</Button>
        <Button type="button" className="me-2 my-3 btn btn-secondary btn-sm col" onClick={showHidden}>{showHiddenOn ? 'Hide Messages' : 'Show Hidden Messages'}</Button>
        <Button type="button" className="me-2 my-3 btn btn-secondary btn-sm col float-end" onClick={copyResults}>Copy All</Button>
        <Button type="button" className="me-2 my-3 btn btn-secondary btn-sm col float-end" onClick={downloadFile}>Download</Button>
      </div>
      </div>
      <TableResults submit={submit} parsedInput={parsedInput} showNamesOn={showNamesOn} blankSpace={blankSpace} hideTimeStampsOn={hideTimeStampsOn} markdownOn={markdownOn} setParsedInput={setParsedInput} showHiddenOn={showHiddenOn} />
      <div className="row">
        <div className="col my-3">
         If you'd like to see more features, please <a href="https://www.gofundme.com/f/public-zoom-chat-formatter" rel="noreferrer" target="_blank">donate</a>. 
        </div>
      </div>
    </div>
  );
}

export default App;
