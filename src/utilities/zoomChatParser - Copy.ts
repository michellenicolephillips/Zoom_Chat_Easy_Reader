export interface ZoomChat {
    when: string;
    from: string;
    to: string;
    message: string;
    repeatedFromTo: boolean | undefined;
    key: number;
}

export function setRepeatedFromTo(messages: Array<ZoomChat>) {
    messages.forEach((message, index, messages) => {
        if (index === 0) {
            message.repeatedFromTo = false;
        } else {
            const previousMessage = messages[index - 1];
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
        const newMesage: any = {
            when: match[1],
            from: fromTo[0].trim(),
            to: fromTo[1]?.trim(),
            message: "",
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