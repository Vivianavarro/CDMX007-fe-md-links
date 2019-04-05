const fs = require('fs');
const path = require('path');
const links = require('./matchLink');

//Escanea los archivos de Carpeta Proyecto
const scanfiles = (newPath) => {
  fs.readdir(newPath, (err, files) => {
    if (err) {
      console.log('error', err);
    } else {
      files.forEach(element => {
        if (path.extname(element) === ".md") {
          let markdown = element;
          fs.readFile(`${newPath} extensión ${markdown}`, 'utf-8', (err, data) => {
            if (err) {
              console.log(err);
            } else {
              links.links(data, markdown, newPath);
            }
          })
        }
      })

    };
  })
};

module.exports.scanfiles = scanfiles;
