let url = new URL('http://tutu.ru:8080/do/any.php?url=1&b[]=url&b[]=b#foo')

console.log(url.hash)
console.log(url.port)
console.log(url.host)
console.log(url.protocol)
console.log(url.hostname)
console.log(url.pathname)
console.log(url.origin)
