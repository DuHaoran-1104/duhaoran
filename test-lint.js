// test-lint.js 
var name = "xiaoxin" // 错误：使用了 var，没有分号，使用了双引号 

function add(a, b) { 
    let result = a + b // 错误：result 没有被修改过，应该用 const；缩进不对；没有分号 
    console.log(result) // 错误：使用了 console.log，没有分号 
    return result; 
} 

if(name == 'xiaoxin') { // 错误：使用了 == 而不是 === 
  add(1, 2) 
} 

let unusedVar = 123; // 错误：声明了变量未使用 