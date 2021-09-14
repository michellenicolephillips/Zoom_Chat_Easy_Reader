import React from 'react';
import '../App.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import '../utilities/zoomChatParser';
import { ZoomChat } from '../utilities/zoomChatParser';
import { checkUsedNames } from '../utilities/checkUsedNames';



function TableResults(props: { parsedInput: ZoomChat[], hideNamesOn: boolean, blankSpace: boolean, hideTimeStampsOn: boolean, markdownOn: boolean }) {

     const blockQuoteText = (text: string) => {
          if (props.markdownOn) {
               //return text.replaceAll(/\r/gm,"> ");
               return text
               .replaceAll("\n\r","\n")
               .replaceAll("\r\n","\n")
               .replaceAll("\r","\n")
               .replaceAll("\n","\n> ");
          } else {
               return text;
          }
     } 
     const md = props.markdownOn;
     /*const usedNames: Array<string> = [];
     const checkUsedNames = (text: string) => {
         if (usedNames.includes(text)) {
              return text;
        } else {
              usedNames.push(text);
              return "[["+text+"]]";
         }
     }*/

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
                                                       {props.markdownOn ?
                                                            zoomChat.repeatedFromTo === false &&
                                                            checkUsedNames(zoomChat.from)
                                                             : zoomChat.repeatedFromTo === false &&
                                                            zoomChat.from}
                                                  </td>
                                             }
                                             {props.hideTimeStampsOn ?
                                                  <td className="resultsTableTimeFrom">
                                                       {md && "*"}
                                                       {zoomChat.when}
                                                       {md && "*"}
                                                  </td>
                                                  : ''}

                                             <td>
                                                  <div className="resultsTableMessage">
                                                       {props.markdownOn ? "> " + blockQuoteText(zoomChat.message) : zoomChat.message}
                                                  </div>
                                             </td>
                                        </tr>
                                        {props.blankSpace && zoomChat.repeatedFromTo !== false &&
                                             <tr>
                                                  <td className="resultsTableTimeFrom"></td>
                                                  <td className="resultsTableTimeFrom"></td>
                                                  <td>
                                                       <div className="blankSpace"> </div>
                                                  </td>
                                             </tr>
                                        }
                                        {props.blankSpace && zoomChat.repeatedFromTo === false &&
                                             <tr><td className="resultsTableTimeFrom"></td><td className="resultsTableTimeFrom"></td>
                                                  <td>
                                                       <div className="blankSpace">{md && "> "}  </div>
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
export default TableResults;