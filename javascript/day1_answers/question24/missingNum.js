// Find the Missing Number in a Sequence - 
// Take a list of consecutive numbers (except one missing) and 
// find the missing number. 
// Example: 1, 2, 3, 5 → Missing number is 4.


const str = prompt('enter a string')

let lastNum = 0; 

for(i=0; i<str.length ; i++){
        console.log(str[i])
        if(Number(str[i]) == lastNum + 1 || str[i] == 0 && i == 0 ){
                lastNum++
        }
        else{
                console.log(lastNum + 1)
                break;
        }

}