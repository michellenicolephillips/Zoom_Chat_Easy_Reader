import React from 'react';
import '../App.css';
import { Button } from 'react-bootstrap';
import 'bootstrap/dist/css/bootstrap.min.css';
import '../utilities/zoomChatParser';
import { Message } from '../utilities/zoomChatParser';
import { blockQuoteText } from '../utilities/blockQuoteText';



function TableResults(props: {
     parsedInput: Message[],
     showNamesOn: boolean,
     blankSpace: boolean,
     hideTimeStampsOn: boolean,
     markdownOn: boolean,
     setParsedInput: React.Dispatch<React.SetStateAction<Message[]>>
}) {

     const md = props.markdownOn;

     const returnNameOptions = (message: Message) => {
          if (props.showNamesOn && message.repeatedFromTo === false) {
               if (md) {
                    if (message.firstTimeNameAppears) {
                         return "[[" + message.from + "]]";
                    } else {
                         return message.from + "";
                    }
               }
               return message.from;
          } else {
               return "";
          }
     }

     const hideItem = (hideMessage: Message) => {
          console.log(hideMessage);
          const newState = []
          for (const parsedMessage of props.parsedInput) {
               if (parsedMessage.key !== hideMessage.key) {
                    newState.push(parsedMessage)
               } else {
                    const newMessage = { ...hideMessage }
                    newMessage.hidden = !hideMessage.hidden
                    newState.push(newMessage)
               }
          }
          props.setParsedInput(newState)
     }

     return (
          <div className="container">
               <div className="row">
                    <table id="results" className="zoomChatParsedResults table-borderless col-sm">
                         <tbody>
                              {props.parsedInput.map((message: Message, index: number) => (
                                   <>
                                        <tr key={message.key}>
                                             <td className="resultsTableTimeFrom">
                                                  {returnNameOptions(message)}
                                             </td>
                                             {props.hideTimeStampsOn ?
                                                  <td className="resultsTableTimeFrom">
                                                       {md && "*"}
                                                       {message.when}
                                                       {md && "*"}
                                                  </td>
                                                  : ''}

                                             <td>
                                                  <div className="resultsTableMessage">
                                                       {props.markdownOn ? "> " + blockQuoteText(message.content) : message.content}
                                                  </div>
                                             </td>
                                             <td><Button value={message.key} type="button" className="me-2 my-3 btn btn-secondary btn-sm col" onClick={() => { hideItem(message) }}>x</Button>
                                                  *{message.hidden?.toString()}*</td>
                                        </tr>
                                        {props.blankSpace && message.repeatedFromTo !== false &&
                                             <tr>
                                                  <td className="resultsTableTimeFrom"></td>
                                                  <td className="resultsTableTimeFrom"></td>
                                                  <td>
                                                       <div className="blankSpace"> </div>
                                                  </td>
                                             </tr>
                                        }
                                        {props.blankSpace && message.repeatedFromTo === false &&
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