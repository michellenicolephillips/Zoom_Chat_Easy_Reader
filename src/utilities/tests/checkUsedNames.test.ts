import { checkUsedNames } from '../checkUsedNames';
import { Message } from '../zoomChatParser';

it("first one hidden", () => {
    let x : Message [] = [{
        when: "00:00:00",
        from: "Person1",
        to: "everyone",
        content: "Test Message",
        key: 1,
        repeatedFromTo: true,
        firstTimeNameAppears: false,
        hidden: true
    },
    {
        when: "00:01:00",
        from: "Person1",
        to: "everyone",
        content: "Test Message 2",
        key: 2,
        repeatedFromTo: false,
        firstTimeNameAppears: true,
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
    let result = checkUsedNames(x);
    expect(result)
        .toMatchObject(<Partial<Message>[]>[
            {
                firstTimeNameAppears: false,
                hidden: true
            },
            {
                firstTimeNameAppears: true,
                hidden: false
            },
            {
                firstTimeNameAppears: false,
                hidden: false
            }
        ]);
});

it("second one hidden", () => {
    let x : Message [] = [{
        when: "00:00:00",
        from: "Person1",
        to: "everyone",
        content: "Test Message",
        key: 1,
        repeatedFromTo: true,
        firstTimeNameAppears: true,
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
        hidden: true
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
    let result = checkUsedNames(x);
    expect(result)
        .toMatchObject(<Partial<Message>[]>[
            {
                firstTimeNameAppears: true,
                hidden: false
            },
            {
                firstTimeNameAppears: false,
                hidden: true
            },
            {
                firstTimeNameAppears: false,
                hidden: false
            }
        ]);
});

it("different senders", () => {
    let x : Message [] = [{
        when: "00:00:00",
        from: "Person1",
        to: "everyone",
        content: "Test Message",
        key: 1,
        repeatedFromTo: false,
        firstTimeNameAppears: true,
        hidden: false
    },
    {
        when: "00:02:00",
        from: "Person2",
        to: "everyone",
        content: "Test Message 3",
        key: 3,
        repeatedFromTo: false,
        firstTimeNameAppears: true,
        hidden: false
    }]
    let result = checkUsedNames(x);
    expect(result)
        .toMatchObject(<Partial<Message>[]>[
            {
                firstTimeNameAppears: true,
                hidden: false
            },
            {
                firstTimeNameAppears: true,
                hidden: false
            }
        ]);
});
