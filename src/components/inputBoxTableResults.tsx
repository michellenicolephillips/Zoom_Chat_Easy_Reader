import React, { useState } from 'react';
import '../App.css';
import '../utilities/zoomChatParser';
//import { ZoomChat, zoomChatParser } from '../utilities/zoomChatParser';
import { ZoomChat, zoomChatParser } from '../utilities/zoomChatParser - Copy';

function InputBox(props: any) {

     const [input, setInput] = useState('Insert Zoom Chat Here');
     const [parsedInput, setParsedInput] = useState(Array<ZoomChat>());

     const handleChange = (event: any) => {
          setInput(event.target.value);
     }
     const handleSubmit = (event: any) => {
          setParsedInput(zoomChatParser(input));
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
               <table className="zoomChatParsedResults" id="row">
                    {parsedInput.map((zoomChat: any, index: any) => (
                         <tr>
                              <td className="resultsTableFrom" key={index}>
                                   {zoomChat.from + ' '}
                              </td>
                              <td className="resultsTableMessage" key={index}>
                                   {zoomChat.message}
                              </td>
                         </tr>
                    ))}
               </table>
          </div >
     )
}
export default InputBox;