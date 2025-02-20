// Simple Login System - 
// Set a predefined username and password. 
// Ask the user to enter their credentials using prompt. 
// If correct, print "Login Successful"; 
// otherwise, print "Incorrect username or password."


let num1 = Number(prompt('Enter you first number'))
let num2 = Number(prompt('Enter you second number'))

console.log(`swaped values number 1 = ${num1} and numer 2 = ${num2} `)


num1 = num1 - num2;
num2 = num1 + num2;
num1 = num2 - num1;

console.log(`swaped values number 1 = ${num1} and numer 2 = ${num2} `)

