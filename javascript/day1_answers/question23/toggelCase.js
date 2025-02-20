//Toggle Case - 
// Ask the user for a word
//  and toggle the case of every character.
//  Example: HeLLo → hEllo.

const str = prompt('enter a word')

let word ='';

for(i=0; i<str.length ; i++){
        if(str[i].toUpperCase() == str[i]){
                word +=str[i].toLowerCase();
        }else if(str[i].toLowerCase() == str[i]){

                word +=str[i].toUpperCase(); 
        }else{
                word +=str[i]
        }
}

console.log(`real word is ${str} toggled case is ${word}`)