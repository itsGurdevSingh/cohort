// Convert Number to Words - 
// Take a single-digit number and print it in words 
// (Example: 1 → One, 2 → Two).


const num = Number(prompt('enter single digit'))

switch (num) {
        case 1:
                console.log('One')
                break;
        case 2:
                console.log('two')
                break;
        case 3:
                console.log('Three')
                break;
        case 4:
                console.log('Four')
                break;
        case 5:
                console.log('Five')
                break;
        case 6:
                console.log('Six')
                break;
        case 7:
                console.log('Seven')
                break;
        case 8:
                console.log('Eight')
                break;
        case 9:
                console.log('Nine')
                break;
        case 0:
                console.log('Zero')
                break;

        default:
                console.log('not valid')
                break;
}