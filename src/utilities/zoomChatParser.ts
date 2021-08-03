export interface ZoomChat {
    when: string;
    from: string;
    to: string;
    message: string;
}

export function zoomChatParser(chatText: string, shouldGroup: boolean): Array<ZoomChat> {
    const messages: Array<ZoomChat> = [];
    let matches = chatText.matchAll(/(\d\d:\d\d:\d\d)[\s|\t]*From\s{1,2}(.*?)\s*:/gm);
    let lastMatch;
    let lastMessage: ZoomChat | undefined;
    let lastNameSeen: String = '';

    for (const match of matches) {
        const fromTo = match[2].split(" to ");
        const newMesage: any = {
            when: match[1],
            from: fromTo[0].trim(),
            to: fromTo[1]?.trim(),
            message: "",
        };
        messages.push(newMesage);

        if (match[2] === lastNameSeen && shouldGroup) {
            newMesage.from = "";
        } else {
            lastNameSeen = match[2];
        }

        if (lastMatch !== undefined && lastMessage !== undefined && lastMatch.input?.length !== undefined && lastMatch.index !== undefined && match.index) {
            lastMessage.message = chatText.substring(lastMatch.index + lastMatch[0].length, match.index).trim();
        }

        lastMatch = match;
        lastMessage = newMesage;
    }

    if (lastMatch !== undefined && lastMessage !== undefined && lastMatch.input?.length !== undefined && lastMatch.index !== undefined) {
        lastMessage.message = chatText.substring(lastMatch.index + lastMatch[0].length).trim()
    }


    return messages;
};