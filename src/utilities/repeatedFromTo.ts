import { Message } from "./zoomChatParser";

export function setRepeatedFromTo(messages: Message[]) {
     messages.forEach((message: Message, index: number) => {
          const previousMessage: Message = messages[index-1];
         if (index === 0) {
             message.repeatedFromTo = false;
         } else {
             //const previousMessage: Message = messages[index - 1];
             message.repeatedFromTo =
                 message.from === previousMessage.from &&
                 message.to === previousMessage.to &&
                 previousMessage.hidden === true;
         }
     })
     return messages;
}