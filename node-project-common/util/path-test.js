const path = require('path');
const fs = require('fs');

const currentFile = __filename;
console.log('Nombre del archivo actual:', path.basename(currentFile));

const currentDir = __dirname;
console.log('Directorio del archivo actual:', currentDir);

const newPath = path.join(currentDir, 'subfolder', 'file.txt');
console.log('Nueva ruta creada:', newPath);

const fileExtension = path.extname(currentFile);
console.log('Extensión del archivo actual:', fileExtension);

const absolutePath = path.resolve('subfolder', 'file.txt');
console.log('Ruta absoluta:', absolutePath);

fs.readdir(currentDir, (err, files) => {
    if (err) {
        console.error('Error al leer el directorio:', err);
        return;
    }
    console.log('Archivos en el directorio actual:');
    files.forEach(file => {
        console.log(file);
    });
});
