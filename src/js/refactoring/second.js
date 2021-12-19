const newDrawRating = (vote) => {
  let point = (vote != 0) ? Math.ceil(vote / 20) : 1
  return Array(point + 1).join("★") + Array(6 - point).join("☆")
}

// Проверка работы результата
console.log(newDrawRating(0));
console.log(newDrawRating(11)); 
console.log(newDrawRating(22));
console.log(newDrawRating(44));
console.log(newDrawRating(80)); 
console.log(newDrawRating(99)); 
