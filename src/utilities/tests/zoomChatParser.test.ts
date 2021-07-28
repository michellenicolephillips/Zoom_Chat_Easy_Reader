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