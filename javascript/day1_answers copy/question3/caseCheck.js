// Character Case Checker - 
// Ask the user for a single character.
// Check if it's uppercase, lowercase, or neither (not a letter).

 const letter = prompt('enter a letter')

 const ASCII = letter.charCodeAt(0)
 
//  ASCII values for uppercase and lowercase letters:
//   - Uppercase letters: 'A' (65) to 'Z' (90)
//   - Lowercase letters: 'a' (97) to 'z' (122)

 if (ASCII >=65 && ASCII <= 90) {
    console.log('uppercase')
 } else if (ASCII >=97 && ASCII <= 122) {
    console.log('lowercase')
 }else{
    console.log('not a letter')
 }