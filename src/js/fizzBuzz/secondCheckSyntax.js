"use strict";
const checkSyntax = (string) => {
  let brackets = "[]{}()<>",
    stack = [],
    pos;

  for (let i = 0; i < string.length; i++) {

    pos = brackets.indexOf(string[i]);

    if (pos === -1) {
      continue;
    }

    if (pos % 2 === 0) {
      stack.push(pos + 1);
    } else {
      if (stack.pop() !== pos) {
        return 1;
      }
    }
  }
  return (stack.length === 0) ? 0 : 1;
}

console.log(checkSyntax(("")));
console.log(checkSyntax(("before ( middle []) after ")));
console.log(checkSyntax((") (")));
console.log(checkSyntax(("} {")));
