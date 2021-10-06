import { Message } from "./zoomChatParser";

export function setRepeatedFromTo(messages: Message[]) {
     let previousShownMessage : Message | undefined = undefined;
     messages.forEach((message: Message, index: number) => {
        
         if (previousShownMessage === undefined) {
              if (message.hidden === false) {
               previousShownMessage = message;
              }      
         } else {
             message.repeatedFromTo =
                 message.from === previousShownMessage.from &&
                 message.to === previousShownMessage.to
         }
     })
     return messages;
}