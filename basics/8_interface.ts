interface IShape {
    name: string
    callIt(): string
}

const circle: IShape = {
    name: "Circle",
    callIt: function(): string {
        return `This is a ${this.name}`;
    }
}

console.log(circle.callIt());

interface User {
    token: string;
}

interface Admin extends User {
    role: "admin" | "superadmin";
}

export {}