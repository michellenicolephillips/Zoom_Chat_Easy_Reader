import React from 'react';
import '../App.css';
import { Message, zoomChatParser } from '../utilities/zoomChatParser';



function InputBox(props: {
     setParsedInput: React.Dispatch<React.SetStateAction<Message[]>>,
     input: string,
     setInput: React.Dispatch<React.SetStateAction<string>>,
     submit: boolean
}) {
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
          //do something to hide input box after file is dropped
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
               <div className="row">
                         <form>
                              <label>
                                   To use the Zoom Chat Easy Reader, either copy and paste your chat into the input box below or drag a file over to get started.
                                   Once you submit the data, you'll be able to format it how you'd like. When you're finished, you can copy or download the results.
                    </label>
                              <>
                                        <textarea
                                             disabled = {props.submit? true : false}
                                             className="form-control"
                                             rows={5}
                                             onDragEnter={handleDragEnter}
                                             onDragLeave={handleDragLeave}
                                             onDrop={handleDrop}
                                             onDragOver={handleDragOver}
                                             onFocus={handleClick}
                                             placeholder="Paste Zoom Chat Here:"
                                             value={props.input}
                                             onChange={handleChange}
                                        />
                              </>
                         </form>
                    </div>
     )
}
export default InputBox;