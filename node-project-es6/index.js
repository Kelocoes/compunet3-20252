import { checkObjectIsEmpty } from "./util/checkObject.js";

console.log('Test :>>');

const testObject = {};
const testObject2 = { key: 'value' };

console.log(checkObjectIsEmpty(testObject)); // true
console.log(checkObjectIsEmpty(testObject2)); // false