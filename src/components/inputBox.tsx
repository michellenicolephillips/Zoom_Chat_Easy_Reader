import React, { useState } from 'react';
import '../App.css';
import '../utilities/zoomChatParser';
import {  zoomChatParser } from '../utilities/zoomChatParser';



function InputBox(props: {setParsedInput:any}) {

     const [input, setInput] = useState('Insert Zoom Chat Here');

     const handleChange = (event: any) => {
          setInput(event.target.value);
     }
     const handleSubmit = (event: any) => {
          props.setParsedInput(zoomChatParser(input, true));
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
          </div>
     )
}
export default InputBox;