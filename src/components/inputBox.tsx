import React, { useState } from 'react';
import '../App.css';
import {  zoomChatParser } from '../utilities/zoomChatParser';



function InputBox(props: {setParsedInput:any}) {

     const [input, setInput] = useState('');

     const handleChange = (event: any) => {
          props.setParsedInput(zoomChatParser(event.target.value));
          setInput(event.target.value);
     }
     return (
          <div>
               <form id="textbox">
                    <label>
                         Zoom Chat:
                    </label>
                    <br />
                    <textarea
                         placeholder="Paste Zoom Chat Here:"
                         value={input}
                         onChange={handleChange} />
                    <br />
               </form>
          </div>
     )
}
export default InputBox;