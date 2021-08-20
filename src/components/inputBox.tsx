import React from 'react';
import '../App.css';
import {  zoomChatParser } from '../utilities/zoomChatParser';



function InputBox(props: {setParsedInput:any, input:any, setInput:any}) {
     let file: any;

     const handleChange = (event: React.ChangeEvent<HTMLTextAreaElement>) => {
          props.setParsedInput(zoomChatParser(event.target.value));
          props.setInput(event.target.value);
     }
     const handleClick = (event: React.MouseEvent<HTMLTextAreaElement, MouseEvent>) => {
          event.currentTarget.select();


     }
     const handleDrop = (event: React.DragEvent<HTMLTextAreaElement>) => {
          event.preventDefault();
          file = event.dataTransfer.files[0];
          let reader = new FileReader();
          reader.onload = function(event) {
               console.log(event.currentTarget);
               props.setInput(reader.result);
               //props.setParsedInput(zoomChatParser(reader.result));
               
          };
          reader.readAsText(file);


     }

     const handleDragOver = (event: React.DragEvent<HTMLTextAreaElement>) => {
          console.log("File is in the drop zone");
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
                         onDrop={handleDrop} 
                         onDragOver={handleDragOver}
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