//Palindrome Checker -
//  Ask the user for a word.
//  Check if it reads the same
//  forward and backward. 
// Print "Palindrome" or
//"Not a Palindrome."


let num =prompt('Enter a string')

let arr = num.toString().split('').reverse().join('');

if (num === arr){
    console.log('Palindrome')
}else{
    console.log('Not Palindrome')
}