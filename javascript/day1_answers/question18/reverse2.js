//Palindrome Checker -
//  Ask the user for a word.
//  Check if it reads the same
//  forward and backward. 
// Print "Palindrome" or
//"Not a Palindrome."


let str =prompt('Enter a string')
let reverse ='';

for(i=str.length-1; i >= 0 ; i--){
    reverse += str[i]
}
console.log(reverse)