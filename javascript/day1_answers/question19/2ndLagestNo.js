// Largest of Three Numbers - 
// Take three numbers as input and print the largest number among them. 
// without using Math.max().

const num1 = Number(prompt('enter first number'))  
const num2 = Number(prompt('enter second number')) 
const num3 = Number(prompt('enter third number'))  

if((num1 > num2 && num1 < num3)||num1 < num2 && num1 > num3){
        console.log('first number is second largest')
}
else if((num2 > num3 && num1 > num2) || (num2 < num3 && num1 < num2)){
        console.log('number second is  second largest ')
}
else{
        console.log('number third is second largest ')
}
