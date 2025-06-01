// Even or Odd Sum - Take two numbers from the user using prompt.
//  If the sum of both numbers is even, print "Even Sum";
//  otherwise, print "Odd Sum."

const num1 = Number(prompt('Enter first Number'));
const num2 = Number(prompt('Enter second Number'));

const sum = num1 + num2;

if(sum%2 == 0){
    console.log("Even Sum")
}
else{
    console.log("Odd Sum")
}