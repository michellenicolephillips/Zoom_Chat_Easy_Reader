export interface ZoomChat {
    when: string;
    from: string;
    to: string;
    message: string;
    repeatedFromTo: boolean | undefined;
    key: number;
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


export function setRepeatedFromTo(messages: Array<ZoomChat>) {
    messages.forEach((message: ZoomChat, index: number) => {
        if (index === 0) {
            message.repeatedFromTo = false;
        } else {
            const previousMessage: ZoomChat = messages[index - 1];
            message.repeatedFromTo =
                message.from === previousMessage.from &&
                message.to === previousMessage.to
        }
    })
    return messages
}

export function zoomChatParser(chatText: string): Array<ZoomChat> {
    const messages: Array<ZoomChat> = [];
    let matches = chatText.matchAll(/(\d\d:\d\d:\d\d)[\s|\t]*From\s{1,2}(.*?)\s{0,2}:/gm);
    let lastMatch;
    let lastMessage: ZoomChat | undefined;

    for (const match of matches) {
        const fromTo = match[2].split(" to ");
        const newMesage: ZoomChat = {
            when: match[1],
            from: fromTo[0].trim(),
            to: fromTo[1]?.trim(),
            message: "",
            key: stringToHash(match[1]),
            repeatedFromTo: false
        };
        messages.push(newMesage);

        if (lastMatch !== undefined && lastMessage !== undefined && lastMatch.input?.length !== undefined && lastMatch.index !== undefined && match.index) {
            lastMessage.message = chatText.substring(lastMatch.index + lastMatch[0].length, match.index).trim();
        }

        lastMatch = match;
        lastMessage = newMesage
    }

    if (lastMatch !== undefined && lastMessage !== undefined && lastMatch.input?.length !== undefined && lastMatch.index !== undefined) {
        lastMessage.message = chatText.substring(lastMatch.index + lastMatch[0].length).trim()
    }


    return setRepeatedFromTo(messages);
};