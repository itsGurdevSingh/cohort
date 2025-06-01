// Simple Calculator -
//  Ask the user for two numbers and an operator 
// (+, -,*, /). Perform the operation and display the result.

const num1 = Number(prompt('Enter first Number'));


if(num1>0){
    console.log("number is positive")
} else if(num1 < 0){
    console.log("number is negative")
}else{
    console.log("number is zero ")
}