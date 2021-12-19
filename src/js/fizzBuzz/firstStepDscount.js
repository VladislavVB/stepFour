//Задача №1
// Написать функцию dscount
"use strict"
const dscount = (arr) => {
  let accamulation = 0;
  arr[0] = arr[0].toLowerCase()
  for (let i = 0; i < arr[0].length - 1; i++) {
    if (arr[0][i] + arr[0][i + 1] == arr[1] + arr[2]) {
      accamulation++;
    }
  }
  console.log(accamulation);
}
dscount(['_a__b____', 'a', 'b'])
dscount(['-ab-аb-ab', 'a', 'b']) //це рофл?) тут латинца
dscount(['aAa', 'a', 'a'])
