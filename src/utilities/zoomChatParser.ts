export interface ZoomChat {
    when: string;
    from: string;
    to: string;
    message: string;
}

export function zoomChatParser( chatText: string): Array<ZoomChat> {
    const messages : Array<ZoomChat> = [];
    let when = chatText.match(/\d\d:\d\d:\d\d/);
    let from = chatText.match(/ From\s{1,2}(.*?)\s{1,2}.(?=to)/);
    let to = chatText.match(/Everyone/);
    let message = chatText.match(/:\s{1,2}.*/);
    const zoomChat: any = {
         when: when,
         from: from,
        to: to,
         message: message,
    };
    messages.push(zoomChat);
    return messages;
};