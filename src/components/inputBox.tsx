import React, { useState } from 'react';
import '../App.css';
import {  zoomChatParser } from '../utilities/zoomChatParser';



function InputBox(props: {setParsedInput:any}) {

     const [input, setInput] = useState('');

     const handleChange = (event: any) => {
          setInput(event.target.value);
     }
     const handleSubmit = (event: any) => {
          let parsedInput = zoomChatParser(input);
          console.log(parsedInput);
          props.setParsedInput(parsedInput);
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
                         placeholder="Paste Zoom Chat Here:"
                         value={input}
                         onChange={handleChange} />
                    <br />
                    <input type="submit" value="Submit" onClick={handleSubmit} />
               </form>
          </div>
     )
}
export default InputBox;