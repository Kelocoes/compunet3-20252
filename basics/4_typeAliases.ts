type point = {
    x: number;
    y: number;
}

type point3D = point & {
    z: number;
}

type point3DWithName = point3D & {
    name: string;
}

type activeStatus = 'active' | 'inactive' | 'pending';

type User = {
    readonly id: number
    name: string
    lastname: string
    isActive: activeStatus
    readonly roles: string[]
    documentId?: string
}

const user: User = {
    id: 1,
    name: "Dexter",
    lastname: "Morgan",
    isActive: 'active',
    roles: ['admin', 'user']
}

user.name = "John"; // This is allowed
user.id = 2; // This will cause an error because id is readonly
user.roles.push('editor'); // This is allowed because roles is an array, not a primitive type