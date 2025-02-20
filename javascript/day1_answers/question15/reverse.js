// Take a three-digit number from the 
// user and print its reverse. 
// (Example: 123 → 321).


let num =prompt('Enter a number')

revNum = num.toString().split('').reverse().join('');

console.log('reversed number is',revNum)