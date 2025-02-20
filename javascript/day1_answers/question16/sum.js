//Sum of Digits - 
//Take a number 
//from the user and
//print the sum of its digits.
//(Example: 123 → 1+2+3 = 6).


let num =prompt('Enter a number')

let arr = num.toString().split('');

let sum = 0;

for(i=0; i<arr.length; i++){
    sum += Number(arr[i])
}
console.log('sum of number ', sum)