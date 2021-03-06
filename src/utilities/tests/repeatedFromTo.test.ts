import { setRepeatedFromTo } from '../repeatedFromTo';
import { zoomChatParser } from '../zoomChatParser';
import { Message } from '../zoomChatParser';

//checking for repeatedFromTo, no hidden messages
it("single message returns false for repeatedFromTo", () => {
    let x = zoomChatParser("00:00:00 From  John Doe  to  Everyone : This is the message");
    let result = setRepeatedFromTo(x);
    expect(result)
        .toMatchObject([{
            repeatedFromTo: false
        }]);
});
it("two messages with same sender", () => {
    let x = zoomChatParser(`09:02:13 From Peter Kaminski to Everyone : "organized group agreements"\n\r09:06:10 From Peter Kaminski to Everyone : ++ on Prototyping with Miro or graph commons!!`);
    let result = setRepeatedFromTo(x);
    expect(result)
        .toMatchObject([
            {
                repeatedFromTo: false
            },
            {
                repeatedFromTo: true
            }
        ]);
});
it("three messages, sender the same on first two", () => {
    let x = zoomChatParser(`09:02:13 From Peter Kaminski to Everyone : "organized group agreements"\n\r09:06:10 From Peter Kaminski to Everyone : ++ on Prototyping with Miro or graph commons!! 09:06:10 From Vincent Arena to Everyone : ++ on Prototyping with Miro or graph commons!!`)
    let result = setRepeatedFromTo(x);
    expect(result)
        .toMatchObject([
            {
                repeatedFromTo: false
            },
            {
                repeatedFromTo: true
            },
            {
                repeatedFromTo: false
            }
        ]);
});
it("four messages, sender the same on first two, different on third, fourth is same sender as first two", () => {
    let x = zoomChatParser(`09:02:13 From Peter Kaminski to Everyone : "organized group agreements"\n\r09:06:10 From Peter Kaminski to Everyone : ++ on Prototyping with Miro or graph commons!! 09:06:10 From Vincent Arena to Everyone : ++ on Prototyping with Miro or graph commons!! 09:02:13 From Peter Kaminski to Everyone : "organized group agreements"`)
    let result = setRepeatedFromTo(x);
    expect(result)
        .toMatchObject([
            {
                repeatedFromTo: false
            },
            {
                repeatedFromTo: true
            },
            {
                repeatedFromTo: false
            },
            {
                repeatedFromTo: false
            }
        ]);
});

//checking repeatedFromTo with some messages hidden
it("first one hidden", () => {
    let x : Message [] = [{
        when: "00:00:00",
        from: "Person1",
        to: "everyone",
        content: "Test Message",
        key: 1,
        repeatedFromTo: false,
        firstTimeNameAppears: false,
        hidden: true
    },
    {
        when: "00:01:00",
        from: "Person1",
        to: "everyone",
        content: "Test Message 2",
        key: 2,
        repeatedFromTo: true,
        firstTimeNameAppears: false,
        hidden: false
    },
    {
        when: "00:02:00",
        from: "Person1",
        to: "everyone",
        content: "Test Message 3",
        key: 3,
        repeatedFromTo: true,
        firstTimeNameAppears: false,
        hidden: false
    }]
    let result = setRepeatedFromTo(x);
    expect(result)
        .toMatchObject(<Partial<Message>[]>[
            {
                repeatedFromTo: false,
                hidden: true
            },
            {
                repeatedFromTo: false,
                hidden: false
            },
            {
                repeatedFromTo: true,
                hidden: false
            }
        ]);
});

it("first two senders(person1) the same, second two senders same(person2), 4th message hidden, fifth sender same as first (person1)", () => {
    let x: Message[] = [
        {
            when: "00:00:00",
            from: "Person1",
            to: "everyone",
            content: "Test Message",
            key: 1,
            repeatedFromTo: false,
            firstTimeNameAppears: false,
            hidden: false
        },
        {
            when: "00:01:00",
            from: "Person1",
            to: "everyone",
            content: "Test Message 2",
            key: 2,
            repeatedFromTo: true,
            firstTimeNameAppears: false,
            hidden: false
        },
        {
            when: "00:02:00",
            from: "Person2",
            to: "everyone",
            content: "Test Message 3",
            key: 3,
            repeatedFromTo: false,
            firstTimeNameAppears: false,
            hidden: true
        },
        {
            when: "00:03:00",
            from: "Person2",
            to: "everyone",
            content: "Test Message 4",
            key: 4,
            repeatedFromTo: false,
            firstTimeNameAppears: false,
            hidden: false
        },
        {
            when: "00:04:00",
            from: "Person1",
            to: "everyone",
            content: "Test Message 5",
            key: 5,
            repeatedFromTo: false,
            firstTimeNameAppears: false,
            hidden: false
        }]
        const result = setRepeatedFromTo(x);
    expect(result)
        .toMatchObject( <Partial<Message>[]>[
            {
                hidden: false,
                repeatedFromTo: false
            },
            {
                hidden: false,
                repeatedFromTo: true
            },
            {
                hidden: true,
                repeatedFromTo: false
            },
            {
                hidden: false,
                repeatedFromTo: false
            },
            {
                hidden: false,
                repeatedFromTo: false
            }
        ]);
});