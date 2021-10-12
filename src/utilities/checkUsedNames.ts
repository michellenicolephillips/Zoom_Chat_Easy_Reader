import { Message } from '../utilities/zoomChatParser';

export function checkUsedNames(messages: Message[]) {
     const _messages: Message[] = JSON.parse(JSON.stringify(messages));
     const usedNames: Array<string> = [];
     for(const message of _messages){
         
          if (message.hidden) {
               message.firstTimeNameAppears = false;
          } else {
               if (usedNames.includes(message.from)) {
                    message.firstTimeNameAppears = false;
               } else {
                    message.firstTimeNameAppears = true;
                    usedNames.push(message.from);
               }
          }
     }
     return _messages;
}