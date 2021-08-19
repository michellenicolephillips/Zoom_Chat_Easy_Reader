import React from 'react';
import '../App.css';
import {  zoomChatParser } from '../utilities/zoomChatParser';



function InputBox(props: {setParsedInput:any, input:any, setInput:any}) {

     const handleChange = (event: React.ChangeEvent<HTMLTextAreaElement>) => {
          props.setParsedInput(zoomChatParser(event.target.value));
          props.setInput(event.target.value);
     }
     const handleClick = (event: React.MouseEvent<HTMLTextAreaElement, MouseEvent>) => {
          event.currentTarget.select();
     }
     return (
          <div>
               <form id="textbox">
                    <label>
                         Zoom Chat:
                    </label>
                    <br />
                    <textarea
                         onClick={handleClick}
                         placeholder="Paste Zoom Chat Here:"
                         value={props.input}
                         onChange={handleChange} />
                    <br />
               </form>
          </div>
     )
}
export default InputBox;