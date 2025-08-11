
function identityAny(arg: any): any {
    return arg;
}

function identityGeneric<Type>(arg: Type): Type {
    return arg;
}

identityGeneric<string>("Hello, World!");
identityGeneric<number>(42);
identityGeneric<{name: string, age: number}>({ name: "Dexter", age: 35 });

const searchElements = <T>(array: T[], searchElement: T): boolean => {
    return array.includes(searchElement);
}