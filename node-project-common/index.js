const { checkObjectIsEmpty } = require('./util/checkObject'); // Common JS
const { readMatrixFromFile } = require('./util/fs-test'); 
const { matrixSearch } = require('./util/matrix-search.js');

console.log('Test :>>');

const testObject = {};
const testObject2 = { key: 'value' };

console.log(checkObjectIsEmpty(testObject)); // true
console.log(checkObjectIsEmpty(testObject2)); // false


// readMatrixFromFile('./static/matrix.txt', (err, matrix) => {
//     if (err) {
//         console.error('Error reading matrix:', err);
//         return;
//     }
//     console.log('Matrix read from file:', matrix);
// });

matrixSearch([[1, 0, 0, 0],
            [1, 1, 0, 1],
            [0, 1, 0, 0],
            [0, 1, 1, 1]]); // Example matrix for testing
