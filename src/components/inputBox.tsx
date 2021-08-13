import React from 'react';
import '../App.css';
import {  zoomChatParser } from '../utilities/zoomChatParser';



function InputBox(props: {setParsedInput:any, input:any, setInput:any}) {


     const handleChange = (event: any) => {
        
          props.setParsedInput(zoomChatParser(event.target.value));
          props.setInput(event.target.value);
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
                         value={props.input}
                         onChange={handleChange} />
                    <br />
               </form>
          </div>
     )
}
export default InputBox;