import React, { useState } from 'react';
import '../App.css';
import '../utilities/zoomChatParser';
import { ZoomChat, zoomChatParser } from '../utilities/zoomChatParser';

function InputBox (props: any) {

     const [input, setInput] = useState('Insert Zoom Chat Here');
     const [parsedInput, setParsedInput] = useState(Array<ZoomChat>());
      
     const handleChange = (event: any) => {
          setInput(event.target.value);
     }
     const handleSubmit = (event: any) => {
          setParsedInput(zoomChatParser(input));
          console.log(zoomChatParser(input));
          event.preventDefault();
     }
          return (
               <div>
               <form id = "textbox">
                    <label>
                         Zoom Chat:
                    </label>
                    <br/>
                    <textarea 
                         value={input} 
                         onChange={handleChange} />
                    <br/>
                    <input type="submit" value="Submit" onClick={handleSubmit}/>
               </form>
                 <div className="zoomChatParsedResults" id="row">
                    <pre id ="column">
                         {parsedInput.map((zoomChat: any, index: any) => (
                              <div key={index}>
                                   {zoomChat.from + ': '}
                              </div>
                         ))}
                    </pre>
                    <pre id ="column">
                    {parsedInput.map((zoomChat: any, index: any) => (
                   <div key={index}>
                       {zoomChat.message}
                        </div>))}
                    </pre>
                 </div>
               </div>
          )
}
export default InputBox;