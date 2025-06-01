// Traffic Light System - 
// Ask the user for a traffic light color (red, yellow, green). 
// Print appropriate messages:
// Red: "Stop!"
// Yellow: "Get Ready!"
// Green: "Go!"

const light = prompt('Enter traffic light colour  (red, yellow, green)')

if(light == 'red'){
    console.log('Stop!')
} else if(light == 'yellow'){
    console.log('Get Ready!')
}else{
    console.log('Go!')
}