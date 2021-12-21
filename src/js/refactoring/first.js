const func = (s, a, b) => {
  if (s == "" || (a == "" && b == "")) return -1;
  for (let i = s.length; --i >= 0; ) if (s[i] == a || s[i] == b) return i;
};

console.log(func("aba", "a", "b"));
console.log(func("aba", "", ""));
console.log(func("aba", "", "b"));
console.log(func("aba", "a", ""));
