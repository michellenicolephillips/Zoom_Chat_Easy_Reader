import { zoomChatParser, Message } from "../zoomChatParser"

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
      content: "This is the message",
    }]);
});

it("two messages with two objects", () => {
  let x = zoomChatParser(`09:02:13 From Peter Kaminski to Everyone : "organized group agreements"\n\r09:06:10 From Vincent Arena to Everyone : ++ on Prototyping with Miro or graph commons!!`)
  expect(x)
    .toMatchObject([
      {
        when: "09:02:13",
        from: "Peter Kaminski",
        to: "Everyone",
        content: "\"organized group agreements\"",
      },
      {
        when: "09:06:10",
        from: "Vincent Arena",
        to: "Everyone",
        content: "++ on Prototyping with Miro or graph commons!!",
      }
    ]);
});

it("message with a line break", () => {

const expected = [
  {
    when: "09:12:36",
    from: "Vincent Arena",
    to: "Everyone",
    content: `Id love to share Troves most recent map - is actually pulling from a decentralized DB.

Wendy this data is available in Airtable if you want to use it in graph commons or maptio to play around?`,
  }
]

const results = zoomChatParser(`
09:12:36 From Vincent Arena to Everyone : Id love to share Troves most recent map - is actually pulling from a decentralized DB.

Wendy this data is available in Airtable if you want to use it in graph commons or maptio to play around?`)

  expect(results).toMatchObject(expected);
});

it("message with links", () => {
  expect(zoomChatParser(`
  10:22:07 From  CSC Zoom  to  Everyone : what does everyone think about the crunchable model : https://www.crunchbase.com/ is this outdated?`))
    .toMatchObject([
      {
        when: "10:22:07",
        from: "CSC Zoom",
        to: "Everyone",
        content: "what does everyone think about the crunchable model : https://www.crunchbase.com/ is this outdated?",
      }
    ]);
});


it("two messages with line terminators", () => {
  expect(zoomChatParser(`
  09:02:13 From Peter Kaminski to Everyone : "organized group agreements" 09:06:10 From Vincent Arena to Everyone : ++ on Prototyping with Miro or graph commons!!`))
    .toMatchObject([
      {
        when: "09:02:13",
        from: "Peter Kaminski",
        to: "Everyone",
        content: "\"organized group agreements\"",
      },
      {
        when: "09:06:10",
        from: "Vincent Arena",
        to: "Everyone",
        content: "++ on Prototyping with Miro or graph commons!!",
      }
    ]);
});

it("from as first name", () => {
  expect(zoomChatParser(`
  09:02:13 From From to Everyone : "organized group agreements" 09:06:10 From Vincent Arena to Everyone : ++ on Prototyping with Miro or graph commons!!`))
    .toMatchObject([
      {
        when: "09:02:13",
        from: "From",
        to: "Everyone",
        content: "\"organized group agreements\"",
      },
      {
        when: "09:06:10",
        from: "Vincent Arena",
        to: "Everyone",
        content: "++ on Prototyping with Miro or graph commons!!",
      }
    ]);
});

it("server side file format", () => {
  const result : Message [] = zoomChatParser(`00:04:20	Name One:	Test text
  00:11:54	Name Two:	Speaking of… 
  00:12:11	Name One:	love that quote
  00:12:38	Name Three:	nice. Not a cell..?
  `)
  expect(result)
    .toMatchObject([
      {
        when: "00:04:20",
        from: "Name One",
        content: "Test text",
      },
      {
        when: "00:11:54",
        from: "Name Two",
        content: "Speaking of…",
      },
      {
        when: "00:12:11",
        from: "Name One",
        content: "love that quote",
      },
      {
        when: "00:12:38",
        from: "Name Three",
        content: "nice. Not a cell..?",
      }
    ]);
});

it("From as name in server side file", () => {
  const result : Message [] = zoomChatParser(`00:04:20	Name One:	Test text
  00:11:54 From Name:	Speaking of… 
  `)
  expect(result)
    .toMatchObject([
      {
        when: "00:04:20",
        from: "Name One",
        content: "Test text",
      },
      {
        when: "00:11:54",
        from: "From Name",
        content: "Speaking of…",
      }
    ]);
});