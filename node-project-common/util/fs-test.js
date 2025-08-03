const fs = require('fs');

function readMatrixFromFile(filePath, callback) {
    fs.readFile(filePath, 'utf8', (err, data) => {
        if (err) {
            console.error('Error reading the file:', err);
            callback(err, null);
            return;
        }

        const lines = data.split('\n').map(line => line.trim()).filter(line => line !== '');
        const matrix = [];
        const matrixSize = lines.length;

        if (!Number.isInteger(matrixSize)) {
            const error = new Error('The file does not contain a valid number of elements for a square matrix.');
            console.error(error.message);
            callback(error, null);
            return;
        }

        for (let i = 0; i < matrixSize; i++) {
            matrix.push(lines[i].split(' ').map(num => parseInt(num)));
        }

        callback(null, matrix);
    });
}

module.exports = { readMatrixFromFile };