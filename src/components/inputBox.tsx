//import { AnyRecord } from 'dns';
import React from 'react';
//import '../App.css';
import {  ZoomChat, zoomChatParser } from '../utilities/zoomChatParser';



function InputBox(props: {setParsedInput: React.Dispatch<React.SetStateAction<ZoomChat[]>>, input:string, setInput: React.Dispatch<React.SetStateAction<string>>}) {
     let file: File;

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
               if (typeof reader.result === "string") {
                    props.setInput(reader.result);
                    props.setParsedInput(zoomChatParser(reader.result));
               }
          };
          reader.readAsText(file);
     }

     const handleDragOver = (event: React.DragEvent<HTMLTextAreaElement>) => {
          event.preventDefault();
     }

     const handleDragEnter = (event: any) => {
          event.preventDefault();
          event.currentTarget.style.background = "lightgrey";
     }
     const handleDragLeave = (event: any) => {
          event.preventDefault();
          event.currentTarget.style.background = "white";
     }
     return (
          <div>
               <form id="textbox">
                    <label>
                         Zoom Chat:
                    </label>
                    <br />
                    <textarea 
                         onDragEnter={handleDragEnter}
                         onDragLeave={handleDragLeave}
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