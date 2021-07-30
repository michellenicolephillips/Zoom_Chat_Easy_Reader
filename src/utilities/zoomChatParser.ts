export interface ZoomChat {
    when: string;
    from: string;
    to: string;
    message: string;
}

export function zoomChatParser(chatText: string): Array<ZoomChat> {
    const messages: Array<ZoomChat> = [];
    let matches = chatText.matchAll(/(\d\d:\d\d:\d\d) From\s{1,2}(.*?)\s{1,2}to\s{1,2}(.*?)\s{1,2}:\s{1,2}/gm);
    let lastMatch;
    let lastMessage: ZoomChat | undefined;

    for (const match of matches) {
        const newMesage: any = {
            when: match[1],
            from: match[2],
            to: match[3],
            message: match[4],
        };
        messages.push(newMesage);

        if (lastMatch !== undefined && lastMessage !==undefined && lastMatch.input?.length !==undefined && lastMatch.index !== undefined && match.index) {
            lastMessage.message = chatText.substring(lastMatch.index + lastMatch[0].length, match.index).trim();
        }

        lastMatch = match;
        lastMessage = newMesage
    }

    if (lastMatch !== undefined && lastMessage !==undefined && lastMatch.input?.length !== undefined && lastMatch.index !== undefined) {
        lastMessage.message = chatText.substring(lastMatch.index + lastMatch[0].length).trim()
    }


    return messages;
};