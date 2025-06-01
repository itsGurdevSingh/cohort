// Multiplication Table - 
// Ask the user for a number and
//  print its multiplication table up to 10

const num = prompt('Enter number for table')

for(i=1; i<11 ; i++){
    console.log(`${num} * ${i} = ${i*num}`)
}