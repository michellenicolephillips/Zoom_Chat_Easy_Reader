export interface ZoomChat {
    when: string;
    from: string;
    to: string;
    message: string;
}

export function zoomChatParser(chatText: string): Array<ZoomChat> {
    const messages: Array<ZoomChat> = [];
    let results = chatText.matchAll(/(\d\d:\d\d:\d\d) From\s{1,2}(.*?)\s{1,2}to\s{1,2}(.*?)\s{1,2}:/gm);
    const result = results.next();
    // let from = chatText.match(/ From\s{1,2}(.*?)\s{1,2}.(?=to)/);
    // let to = chatText.match(/Everyone/);
    // let message = chatText.match(/:\s{1,2}.*/);
    const zoomChat: any = {
        when: result.value[1],
        from: result.value[2],
        to: result.value[3],
        //message: message,
    };
    messages.push(zoomChat);
    return messages;
};