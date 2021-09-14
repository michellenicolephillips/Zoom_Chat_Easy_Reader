import { Message } from '../utilities/zoomChatParser';

export function checkUsedNames(messages: Message[]) {
     const _messages = JSON.parse(JSON.stringify(messages));
     const usedNames: Array<string> = [];
     for(const message of _messages){
          if (usedNames.includes(message.from)) {
               message.firstTimeNameAppears = false;
          } else {
               message.firstTimeNameAppears = true;
               usedNames.push(message.from);
          }
     }
     return _messages;
}