const fs = require('fs');


  //Escanea los archivos de Carpeta Proyecto
fs.readdir('./', (err, files) => {
  if (err) console.log('error', err);
  else console.log('--Tus archivos en el proyecto son:', files);
});

//Leyendo Archivo
fs.readFile('./README.md', 'utf-8', (err, data) => {
  if (err) {
    console.log(err);
  } else {
    //Arreglo de Links con match
    const regex = /(\b(https?|ftp|file):\/\/[-A-Z0-9+&@#\/%?=~_|!:,.;]*[-A-Z0-9+&@#\/%=~_|])/ig;
    const result = data.match(regex);
    console.log("LINKS: ");
    console.log(result);

    //Conteo total de Links
    let totalLinks = result.length;
    console.log("Total Links: ");
    console.log(totalLinks);
  }
});


