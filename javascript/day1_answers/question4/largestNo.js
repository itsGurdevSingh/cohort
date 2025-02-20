// Largest of Three Numbers - 
// Take three numbers as input and print the largest number among them. 
// without using Math.max().

const num1 = Number(prompt('enter first number'))  
const num2 = Number(prompt('enter second number')) 
const num3 = Number(prompt('enter third number'))  

if(num1 > num2 ){
    if(num1 > num3){
        console.log('first number is largest')
    }else{
        console.log('third number is largest')
    }
}
else if(num2>num3){
    if(num1 > num2){
        console.log('number first is largest ')
    }
    else{
        console.log('number second is largest ')
    }
}
else if (num3 > num1){
    if(num3 > num2){
        console.log('number third is largest')
    }
    else{
        console.log('number second is largest ')
    }
}
