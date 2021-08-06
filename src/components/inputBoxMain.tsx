import React, { useState } from 'react';
import '../App.css';
import '../utilities/zoomChatParser';
import { ZoomChat, zoomChatParser } from '../utilities/zoomChatParser';

function InputBoxMain(props: any) {

     const [input, setInput] = useState('Insert Zoom Chat Here');
     const [parsedInput, setParsedInput] = useState(Array<ZoomChat>());

     const handleChange = (event: any) => {
          setInput(event.target.value);
     }
     const handleSubmit = (event: any) => {
          setParsedInput(zoomChatParser(input, true));
          event.preventDefault();
     }
     return (
          <div>
               <form id="textbox">
                    <label>
                         Zoom Chat:
                    </label>
                    <br />
                    <textarea
                         value={input}
                         onChange={handleChange} />
                    <br />
                    <input type="submit" value="Submit" onClick={handleSubmit} />
               </form>
               <div>
                    {parsedInput.map((zoomChat: any, index: any) => (
                         <div className="divRow">
                              <div className="resultsDivFrom" key={index}>
                                   {zoomChat.from + ' '}
                              </div>
                              <div className="resultsDivMessage" key={index}>
                                   {zoomChat.message}
                              </div>
                         </div>
                    ))}
               </div>
          </div>
     )
}
export default InputBoxMain;