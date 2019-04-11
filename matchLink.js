
const fs = require('fs');


//Leyendo Archivo para obtener los links
const mdLinks = (data) => {
  const regex = /(\b(https?|ftp|file):\/\/[-A-Z0-9+&@#\/%?=~_|!:,.;]*[-A-Z0-9+&@#\/%=~_|])/ig;
  const result = data.match(regex);
  console.log("--Links: ");
  console.log(result);

  const read = (element) => {
    fs.readFile(newPath, element, (err, data) => {
      if (err) {
        console.log(err);
      } else
        links.mdLinks(data, element, newPath);
    });
    console.log(read);
  };

  console.log(mdLinks);
  //Conteo total de Links
  let totalLinks = result.length;
  console.log("--Total Links: ");
  console.log(totalLinks);
};
