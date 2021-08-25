import React from 'react';
import '../App.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import '../utilities/zoomChatParser';
import { ZoomChat } from '../utilities/zoomChatParser';

function InputBox(props: { parsedInput: ZoomChat[], hideNamesOn: boolean, blankSpace: boolean, hideTimeStampsOn: boolean }) {

     return (
          <div className="container">
               <div className="row">
                    <table id="results" className="zoomChatParsedResults table-borderless col-sm">
                         <tbody>
                              {props.parsedInput.map((zoomChat: ZoomChat, index: number) => (
                                   <>
                                        <tr key={zoomChat.key}>
                                             {props.hideNamesOn &&
                                                  <td className="resultsTableTimeFrom">

                                                       {zoomChat.repeatedFromTo === false &&
                                                            zoomChat.from}
                                                  </td>
                                             }
                                             {props.hideTimeStampsOn ?
                                                  <td className="resultsTableTimeFrom">
                                                       {zoomChat.when}
                                                  </td>
                                                  : ''}

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
               </div>
          </div >
     )
}
export default InputBox;