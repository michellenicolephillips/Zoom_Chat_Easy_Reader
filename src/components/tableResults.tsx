import React from 'react';
import '../App.css';
import '../utilities/zoomChatParser';
import { ZoomChat } from '../utilities/zoomChatParser';

function InputBox(props: { parsedInput: any }) {

     return (
          <div>
               <table className="zoomChatParsedResults" id="row" >
                    {props.parsedInput.map((zoomChat: ZoomChat, index: any) => (
                         <tr key={zoomChat.key}>
                              <td className="resultsTableFrom">
                                   {(() => {
                                        if (zoomChat.repeatedFromTo === false) {
                                            return zoomChat.from;
                                        }
                                   })()
                                   }
                              </td>
                              <td className="resultsTableMessage">
                                   {zoomChat.message}
                              </td>
                         </tr>
                    ))}
               </table>
          </div >
     )
}
export default InputBox;