import { zoomChatParser } from "../zoomChatParser"

it("blank chat should return zero objects", () => {
  expect(zoomChatParser(""))
    .toMatchObject([]);
});

it("single message returns one object", () => {
  expect(zoomChatParser("00:00:00 From  John Doe  to  Everyone : This is the message"))
    .toMatchObject([{
      when: "00:00:00",
      from: "John Doe",
      to: "Everyone",
      message: "This is the message",
    }]);
});

it("two message returns two objects", () => {
  expect(zoomChatParser(`
00:00:00 From  John Doe  to  Everyone : This is the first message
00:00:01 From  John Doe  to  Everyone : This is the second message`))
    .toMatchObject([
      {
        when: "00:00:00",
        from: "John Doe",
        to: "Everyone",
        message: "This is the first message",
      },
      {
        when: "00:00:01",
        from: "John Doe",
        to: "Everyone",
        message: "This is the second message",
      }
    ]);
});

it("message with a line break", () => {
  expect(zoomChatParser(`
00:00:00 From  John Doe  to  Everyone : This is the first 
message`))
    .toMatchObject([
      {
        when: "00:00:00",
        from: "John Doe",
        to: "Everyone",
        message: "This is the first \nmessage",
      }
    ]);
});