import React from 'react';
import '../App.css';
import { Button } from 'react-bootstrap';
import 'bootstrap/dist/css/bootstrap.min.css';
import '../utilities/zoomChatParser';
import { Message } from '../utilities/zoomChatParser';
import { blockQuoteText } from '../utilities/blockQuoteText';
import { checkUsedNames } from '../utilities/checkUsedNames';
import { setRepeatedFromTo } from '../utilities/repeatedFromTo';
import xbutton from '../close.svg';

function TableResults(props: {
     parsedInput: Message[],
     showNamesOn: boolean,
     blankSpace: boolean,
     hideTimeStampsOn: boolean,
     markdownOn: boolean,
     setParsedInput: React.Dispatch<React.SetStateAction<Message[]>>,
     showHiddenOn: boolean,
     submit: boolean
}) {

     const hideItem = (hideMessage: Message) => {
          let newState = []
          for (const parsedMessage of props.parsedInput) {
               if (parsedMessage.key !== hideMessage.key) {
                    newState.push(parsedMessage);
               
               } else {
                    const newMessage = { ...hideMessage }
                    newMessage.hidden = !hideMessage.hidden
                    newState.push(newMessage);
               }
          }
          newState = setRepeatedFromTo(newState);
          newState = checkUsedNames(newState);
          console.log(newState);
          props.setParsedInput(newState);
     }

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

     const returnTimeOptions = (message: Message) => {
          if (props.hideTimeStampsOn) {
               if (props.markdownOn) {
                    return "*" + message.when + "*";
               } else {
                    return message.when;
               }
          } else {
               return "";
          }
     }

     return (
          <div className="container">
               <div className="row">
                    <table id="results" className="zoomChatParsedResults table-borderless col-sm">
                         <tbody>
                              {props.submit? props.parsedInput.map((message: Message, index: number) => (
                                   <>
                                   {message.hidden && !props.showHiddenOn? '' : 
                                   <>
                                        <tr key={message.key} className={message.hidden && props.showHiddenOn? 'hidden' : ''}>
                                                  <td className="resultsTableTimeFrom">
                                                       {returnNameOptions(message)}
                                                  </td>
                                                  <td className="resultsTableTimeFrom">
                                                       {returnTimeOptions(message)}
                                                  </td>
                                                  <td>
                                                       <div className="resultsTableMessage">
                                                            {props.markdownOn ? "> " + blockQuoteText(message.content) : message.content}
                                                       </div>
                                                  </td>
                                             <td><Button value={message.key} type="button" className="me-2 my-3 btn btn-secondary btn-sm col" onClick={() => { hideItem(message) }}><img src={xbutton} alt="hide message"/></Button>
                                             </td>
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
                                   }
                                   </>
                              )): ""}
                         </tbody>
                    </table>
               </div>
          </div >
     )
}
export default TableResults;