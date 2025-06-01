// Simple Login System - 
// Set a predefined username and password. 
// Ask the user to enter their credentials using prompt. 
// If correct, print "Login Successful"; 
// otherwise, print "Incorrect username or password."

const username = prompt('Enter you username')
const password = prompt('Enter you password')

if((username == 'gurdev' && password == 'dev')||(username == 'alam' && password == 'webdev') ){
    console.log('Login Successful')
}else{
    console.log('Incorrect username or password.')
}