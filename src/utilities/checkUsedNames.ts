export function checkUsedNames(text: string) {
     const usedNames: Array<string> = [];
     //const checkUsedNames = (text: string) => {
          if (usedNames.includes(text)) {
               return text;
          } else {
               usedNames.push(text);
               return "[[" + text + "]]";
          }
     //};
     //return checkUsedNames;
}