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

    //Leyendo Archivo para obtener los links
    fs.readFile('./README.md',"utf8",(err,data)=>{
      const regex = /(\b(https?|ftp|file):\/\/[-A-Z0-9+&@#\/%?=~_|!:,.;]*[-A-Z0-9+&@#\/%=~_|])/ig;
      const result = data.match(regex);
      console.log("--Links: ");
      console.log(result);
      
      //Conteo total de Links
      let totalLinks = result.length;
      console.log("--Total Links: ");
      console.log(totalLinks);
    });
  });
};



module.exports.scanFile = scanFile;
