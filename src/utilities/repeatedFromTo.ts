import { Message } from "./zoomChatParser";

export function setRepeatedFromTo(messages: Message[]) {
     let previousShownMessage : Message | undefined = undefined;
     messages.forEach((message: Message, index: number) => {
        
        if (message.hidden) {
            message.repeatedFromTo === false;        
         } else {
             if (previousShownMessage === undefined) {
                 previousShownMessage = message;
             } else {
                message.repeatedFromTo = 
                message.from === previousShownMessage.from &&
                message.to === previousShownMessage.to;
                previousShownMessage = message;

             }

                
         }
     })
     return messages;
}