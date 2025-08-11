const user = {
    name: 'Kevin',
    age: 10
}

console.log(user);
console.log(user.name);
console.log(user.email);

// String 
let username: string = 'Operator007';

username.toLowerCase();

console.log(username);

// Number
let age: number = 10;
age.toFixed();
console.log(age);

// Boolean
let isLoggedIn: boolean = false;
isLoggedIn.valueOf();
console.log(isLoggedIn.valueOf());

/* Type inference */

let greeting = 'Hello World';
greeting.toLowerCase();
console.log(greeting);

greeting = 1;


/* Type any */
let address;

function getAddress() {
    return "Cll 123 # 45"
}

address = getAddress();

let address1: string;

function getAddress1() {
    return "Cll 123 # 45"
}

address1 = getAddress1();



export {}