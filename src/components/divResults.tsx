import React from 'react';
import '../App.css';
import '../utilities/zoomChatParser';
import { Message } from '../utilities/zoomChatParser';

function InputBoxMain(props: { parsedInput: Message[], hideNamesOn: boolean, blankSpace: boolean }) {

     return (
          <div>
               <div>
                    {props.parsedInput.map((zoomChat: Message, index: number) => (
                         <div className="divRow" key={zoomChat.key}>
                              <div className="resultsDivFrom">
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
                                   <div className="resultsDivMessage">
                                        {zoomChat.content}
                                   </div>
                                   <div>
                                        {props.blankSpace ? <div className="blankSpace">  </div> : ""}
                                   </div>
                              </div>
                         </div>
                    ))}
               </div>
          </div>
     )
}
export default InputBoxMain;