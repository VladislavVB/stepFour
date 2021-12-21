const stars = (vote) => {
  let point = (vote != 0) ? Math.ceil(vote / 20) : 1
  return Array(point + 1).join("★") + Array(6 - point).join("☆")
}

// Проверка работы результата
console.log(stars(0));
console.log(stars(11)); 
console.log(stars(22));
console.log(stars(44));
console.log(stars(80)); 
console.log(stars(99)); 
