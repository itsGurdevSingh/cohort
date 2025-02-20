// 11. Grade Calculator - Ask the user for their marks (0-100).
// Assign grades based on the range:
// 90-100: A
// 80-89: B
// 70-79: C
// 60-69: D
// Below 60: F

const marks = prompt('Enter you marks (0-100)')

if(100 >= marks && marks >= 90){
    console.log('your grade is A')
} else if(marks >= 80){
    console.log('your grade is B')
} else if(marks >= 70){
    console.log('your grade is C')
} else if(marks >= 60){
    console.log('your grade is D')
}else if(marks >= 50){
    console.log('your grade is E')
}else if(marks >= 1){
    console.log('your are fail')
}else{
    console.log('not valid Marks \n Enter marks between (0-100)')
}