const fs = require('fs');
const path = require('path');

//ESCANEA LOS ARCHIVOS Y TOMA CON "FIND" EL DOCUMENTO MARKDOWN
const scanFile = () => {
  fs.readdir('./', (err, files) => {
    if (err) console.log('error', err);
    else console.log('--Escaneo de archivos:', files);

    const foundFile = files.find(function (element) {
      return path.extname(element) === ".md";
    });
    console.log('--Archivos Markdown:', foundFile);
  });
};

module.exports.scanFile = scanFile;
