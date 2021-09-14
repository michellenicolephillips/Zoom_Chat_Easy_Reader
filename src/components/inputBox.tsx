import React from 'react';
import '../App.css';
import { Message, zoomChatParser } from '../utilities/zoomChatParser';



function InputBox(props: { setParsedInput: React.Dispatch<React.SetStateAction<Message[]>>, input: string, setInput: React.Dispatch<React.SetStateAction<string>> }) {
     let file: File;

     const handleChange = (event: React.ChangeEvent<HTMLTextAreaElement>) => {
          props.setParsedInput(zoomChatParser(event.target.value));
          props.setInput(event.target.value);
     }
     const handleClick = (event: React.FocusEvent<HTMLTextAreaElement>) => {
          event.currentTarget.select();
     }
     const handleDrop = (event: React.DragEvent<HTMLTextAreaElement>) => {
          event.preventDefault();
          file = event.dataTransfer.files[0];
          let reader = new FileReader();
          reader.onload = function (event) {
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
          <div className="container">
               <div className="row">
                    <div className="col">
                         <form>
                              <label>
                                   Zoom Chat:
                    </label>
                              <textarea
                                   className="form-control"
                                   rows={5}
                                   onDragEnter={handleDragEnter}
                                   onDragLeave={handleDragLeave}
                                   onDrop={handleDrop}
                                   onDragOver={handleDragOver}
                                   onFocus={handleClick}
                                   placeholder="Paste Zoom Chat Here:"
                                   value={props.input}
                                   onChange={handleChange} />
                         </form>
                    </div>
               </div>
          </div>
     )
}
export default InputBox;