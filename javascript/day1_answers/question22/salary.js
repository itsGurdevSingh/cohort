/*Nested Condition Challenge 
- Ask the user for their age and salary.
  Print a message based on conditions:
  If age is below 18, print "Not eligible"
  If age is 18 or more but
  salary is less than ₴20,000,
  print "Low Salary"
  If salary is ?50,000 or more, 
  print "High Salary"
. Otherwise, print "Medium Salary"
*/


const age = Number(prompt('enter a your age'))
const salary = Number(prompt('enter a your salary'))

if(age < 18){
        console.log('you are not Not eligible')
}else{
        if(salary < 20000){
                console.log('Low Salary')
        }else if (salary > 50000){
                console.log('High Salary')
        }else{
                console.log('Medium Salary')
        }
}