function addTwo(a: number): number {
    return a + 2
}

addTwo(10);
console.log(addTwo(10));


const concat = (start: string, end: string): string => {
    return start + end
}

concat('Hello', 'World');
console.log(concat('Hello', 'World'));

const registerAnswer = (id: number, message: string = "No message provided"): string => {
    return `${id} - ${message}`;
}

console.log(registerAnswer(1));

const userTypes = ["admin", "editor", "subscriber"];

userTypes.map((userType): string => {
    return userType.toUpperCase();
})

export {}