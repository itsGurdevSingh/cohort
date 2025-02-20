// Leap Year Checker -
//  Ask the user for a year and determine if it's 
// a leap year or not.

const year = Number(prompt('Enter year in numbers'));

if(year%4 == 0){
    console.log("leap year")
}
else{
    console.log("not a leap year")
}