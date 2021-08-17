import React from 'react';
import '../App.css';
import '../utilities/zoomChatParser';
import { ZoomChat } from '../utilities/zoomChatParser';

function InputBox(props: { parsedInput: any, hideNamesOn: boolean, blankSpace: boolean }) {

     return (
          <div>
               <table className="zoomChatParsedResults" id="row" >
                    <tbody>
                         {props.parsedInput.map((zoomChat: ZoomChat, index: any) => (
                              <tr key={zoomChat.key}>
                                   <td className="resultsTableFrom">
                                        {(() => {
                                             if (props.hideNamesOn) {
                                                  if (zoomChat.repeatedFromTo === false) {
                                                       return zoomChat.from;
                                                  }
                                             }
                                        }
                                        )()}
                                   </td>
                                   <td>
                                        <div className="resultsTableMessage">{zoomChat.message}</div>
                                        {props.blankSpace ? <div className="blankSpace">  </div> : ""}
                                   </td>
                              </tr>
                         ))}
                    </tbody>
               </table>
          </div >
     )
}
export default InputBox;