//User Greeting - Ask for the user's
//name and time (24-hour format). Greet them accordingly:
// 5 AM-12 PM: "Good Morning, [Name]!"
// 12 PM-5 PM: "Good Afternoon, [Name]!"
// 5 PM-9 PM: "Good Evening, [Name]!"
// 9 PM-5 AM: "Good Night, [Name]!"

const user = prompt("Enter your name: ");
const time = Number(prompt("Enter the time in 24-hour format: ")); 

if(5 <= time && time <= 12){
    console.log(`Good Morning [${user}]`)
} else if(12 < time && time <= 17){
    console.log(`Good Afternoon [${user}]`)
}else if(17 < time && time <= 21){
    console.log(`Good Evening [${user}]`)
}else{
    console.log(`Good Night [${user}]`)
}