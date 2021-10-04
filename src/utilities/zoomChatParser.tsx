import { setRepeatedFromTo } from "./repeatedFromTo";

export interface Message {
    when: string;
    from: string;
    to: string;
    content: string;
    repeatedFromTo: boolean | undefined;
    firstTimeNameAppears: boolean;
    key: number,
    hidden: boolean;
}
// TODO: look for a better algorithm //Convert to 32bit integer
function stringToHash(string:string) {
                  
     var hash = 0;
       
     if (string.length === 0) return hash;
       
     for (let i = 0; i < string.length; i++) {
         let char = string.charCodeAt(i);
         hash = ((hash << 5) - hash) + char;
         hash = hash & hash;
     }
       
     return hash;
 }

export function zoomChatParser(chatText: string): Array<Message> {
    const messages: Array<Message> = [];
    let matches = chatText.matchAll(/(\d\d:\d\d:\d\d)[\s|\t]*From\s{1,2}(.*?)\s{0,2}:/gm);
    let lastMatch;
    let lastMessage: Message | undefined;

    for (const match of matches) {
        const fromTo = match[2].split(" to ");
        const newMesage: Message = {
            when: match[1],
            from: fromTo[0].trim(),
            to: fromTo[1]?.trim(),
            content: "",
            key: stringToHash(match[1]),
            repeatedFromTo: false,
            firstTimeNameAppears: false,
            hidden: false
        };
        messages.push(newMesage);

        if (lastMatch !== undefined && lastMessage !== undefined && lastMatch.input?.length !== undefined && lastMatch.index !== undefined && match.index) {
            lastMessage.content = chatText.substring(lastMatch.index + lastMatch[0].length, match.index).trim();
        }

        lastMatch = match;
        lastMessage = newMesage
    }

    if (lastMatch !== undefined && lastMessage !== undefined && lastMatch.input?.length !== undefined && lastMatch.index !== undefined) {
        lastMessage.content = chatText.substring(lastMatch.index + lastMatch[0].length).trim()
    }


    return setRepeatedFromTo(messages);
};