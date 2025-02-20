// Simple Calculator -
//  Ask the user for two numbers and an operator 
// (+, -,*, /). Perform the operation and display the result.

const num1 = Number(prompt('Enter first Number'));
const num2 = Number(prompt('Enter second Number'));
const operator = prompt('enter opration you want')

if(operator == "+"){
    console.log(num1+num2)
} else if(operator == "-"){
    console.log(num1-num2)
}else if (operator == "*"){
    console.log(num1*num2)
}else{
    console.log(num1/num2)
}