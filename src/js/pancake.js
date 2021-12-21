let pans = 2;
let pancake = 5;
let sides = 2;
let time = 1;
let capacity = 1;

const cooking = () => {
    return (pancake * sides * time) / (pans * capacity);
}

console.log(cooking() + " minutes");

//Берем 1 и 2 панкейк и жарим.
// Через 1мин переворачиваем первый блин, второй клаедем на тарелку и кладем третий
// Убираем первый т.к. он готов. Теперь переворачиваем третий блин и кладем второй. 