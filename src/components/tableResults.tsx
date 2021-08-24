import React from 'react';
import '../App.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import '../utilities/zoomChatParser';
import { ZoomChat } from '../utilities/zoomChatParser';

function InputBox(props: { parsedInput: ZoomChat[], hideNamesOn: boolean, blankSpace: boolean, hideTimeStampsOn: boolean }) {

     return (
          <div className="container">
               <table className="zoomChatParsedResults table-borderless" id="row">
                    <tbody>
                         {props.parsedInput.map((zoomChat: ZoomChat, index: number) => (
                              <>
                                   <tr key={zoomChat.key}>
                                        <td className="resultsTableTimeFrom">

                                             {props.hideNamesOn && zoomChat.repeatedFromTo === false &&
                                                  zoomChat.from
                                             }
                                        </td>
                                        <td className="resultsTableTimeFrom">
                                             {props.hideTimeStampsOn ? zoomChat.when : ''}
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