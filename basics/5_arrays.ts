type fruits = "apple" | "banana" | "orange";
type vegetables = string[];
type groceries = Array<fruits> | vegetables;

const myGroceries: groceries = [
    "apple",
    "banana",
    "orange",
    "carrot"
];