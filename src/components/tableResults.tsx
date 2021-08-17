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
                              <>
                                   <tr key={zoomChat.key}>
                                        <td className="resultsTableFrom">

                                             {props.hideNamesOn && zoomChat.repeatedFromTo === false &&
                                                  zoomChat.from
                                             }
                                        </td>
                                        <td>
                                             <div className="resultsTableMessage">{zoomChat.message}</div>
                                        </td>
                                   </tr>
                                   {props.blankSpace &&
                                        <tr>
                                             <td>
                                                  <div className="blankSpace">  </div>
                                             </td>
                                        </tr>
                                   }
                              </>
                         ))}
                    </tbody>
               </table>
          </div >
     )
}
export default InputBox;