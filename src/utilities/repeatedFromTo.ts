import { Message } from "./zoomChatParser";

export function setRepeatedFromTo(messages: Message[]) {
     messages.forEach((message: Message, index: number) => {
         if (index === 0 || message.hidden) {
             message.repeatedFromTo = false;
         } else {
             const previousMessage: Message = messages[index - 1];
             message.repeatedFromTo =
                 message.from === previousMessage.from &&
                 message.to === previousMessage.to
         }
     })
     return messages;
}