import React from 'react';
import '../App.css';
import '../utilities/zoomChatParser';
import { ZoomChat } from '../utilities/zoomChatParser';

function InputBox(props: { parsedInput: any, hideNamesOn: boolean, blankSpace: boolean }) {


     return (
          <div>
               <div>
                    {props.parsedInput.map((zoomChat: ZoomChat, index: any) => (
                         <div className="gridContainer" key={zoomChat.key}>
                              <div className="resultsGridFrom" >
                                   {(() => {
                                        if (props.hideNamesOn) {
                                             if (zoomChat.repeatedFromTo === false) {
                                                  return zoomChat.from;
                                             }
                                        }
                                   }
                                   )()}
                              </div>
                              <div>
                                   <div className="resultsGridMessage" >
                                        {zoomChat.message}
                                   </div>
                                   <div>
                                        {props.blankSpace ? <div className="blankSpace"><br /></div> : ""}
                                   </div>
                              </div>
                         </div>
                    ))}
               </div>
          </div>
     )
}
export default InputBox;