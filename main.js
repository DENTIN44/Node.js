// var fs = require("fs");

// fs.readFile('input.txt', function (err, data) {
//    if (err) {
//       console.log(err.stack);
//       return;
//    }
//    console.log(data.toString());
// });
// console.log("Program Ended");

const s = require('./simple');

// Call hello function
console.log(s.hello());  // 'Hello, Universe'

// Call next to increment count and log the result
console.log(s.next());  // 1
console.log(s.next());  // 2
console.log(s.next());  // 3

// Note: `count` is not accessible directly, as it's not exported in this version
// console.log(s.count);  // This would be undefined
