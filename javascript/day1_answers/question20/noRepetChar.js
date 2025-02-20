//Find First Non-Repeating Character - 
// Ask the user for a word 
// and find the first character that does not repeat. 
// Example: hello → h (since e, l, and o repeat).


const str = prompt('enter a string')

for(i=0; i<str.length ; i++){
        // console.log(str[i])
        let itRepets = false;
        for(j=0;j<str.length;j++){
                if(i == j){
                        continue;
                }
                console.log(`i is = ${str[i]}  j is = ${str[j]}`)
                if(str[i] == str[j]){
                     itRepets = true;   
                     break;
                }
        }
        if(itRepets == false){
                console.log(str[i],' is non repeting number')
                break;
        }
        
}