//Even Digit Counter -
// Take a number from the user and count 
// how many even digits it has.

const str = prompt('enter a number')
console.log(str[0])

let count = 0;

for(i=0; i<str.length ; i++){
        if(Number(str[i]) % 2 == 0){
                count++
        }
}

console.log(`total even digits in this number is ${count}`)