export interface ZoomChat {
    when: string;
    from: string;
    to: string;
    message: string;
}

export function zoomChatParser( chatText: string): Array<ZoomChat> {
    const messages:Array<ZoomChat> = [];
    // const zoomChat = {
    //     when: "",
    //     from: "",
    //     to: "",
    //     message: "",
    // };
    // messages.push(zoomChat);
    return messages;
};
