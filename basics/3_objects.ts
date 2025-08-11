/* Type aliases */
type UserType =  {
    id?: number;
    name: string;
    lastname: string;
    isActive: boolean;
}

type MyString = string;

const User = {
    id: 1,
    name: "Dexter",
    lastname: "Morgan",
    isActive: true,
}

function createUser({name, lastname, isActive}: UserType) {
    return {
        id: Math.floor(Math.random() * 1000),
        name,
        lastname,
        isActive
    }
}

createUser({name: "Kevin", lastname: "David", isActive: true});