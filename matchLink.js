
const https = require('https');
const http = require('http');
const app = require('./comand');


const links = (data, files, newPath) => {
  const regexp =/(\b(https?|ftp|file):\/\/[-A-Z0-9+&@#\/%?=~_|!:,.;]*[-A-Z0-9+&@#\/%=~_|])/ig;
  const linksArray = data.match(regexp);
  app.typeOfValidation(linksArray, files, newPath);
};

const counting = (linksArray, file, Path) => {
  const uniqueLinks =
    linksArray.filter((x, i, a) =>
      a.indexOf(x) == i);
  console.log(
    `Total Links: ${linksArray.length} 
    Links en archivo: ${file} 
    Links únicos: ${uniqueLinks.length} 
    Links por carpeta: ${Path}`.stats);
};

let statusArray = [];
const validating = (linksArray, File, Dir) => {
  const linksNumber = linksArray.length;
  let processedLinks = 0;
  return new Promise(resolve => {
    linksArray.forEach((element) => {
      //Peticiones https
      if (element.match(/(\b(https?|ftp|file):\/\/[-A-Z0-9+&@#\/%?=~_|!:,.;]*[-A-Z0-9+&@#\/%=~_|])/ig)) {
        https.get(element, (res) => {
            statusArray.push({
              Dir,
              File,
              Text: element,
              Status: res.statusCode
            });
            processedLinks++;
            if (processedLinks === linksNumber) {
              resolve(statusArray)
            }
          })
          .on('error', (e) => {
            statusArray.push(e);
            processedLinks++;
            if (processedLinks === linksNumber) {
              resolve(statusArray)
            }
          })

        //Peticiones http
      } else if (element.match(/(\b(https?|ftp|file):\/\/[-A-Z0-9+&@#\/%?=~_|!:,.;]*[-A-Z0-9+&@#\/%=~_|])/ig)) {
        http.get(element, (res) => {
          statusArray.push({
            Dir,
            File,
            Text: element,
            Status: res.statusCode
          });
          processedLinks++;
          if (processedLinks === linksNumber) {
            resolve(statusArray)
          }
        }).on('error', (e) => {
          statusArray.push(e);
          processedLinks++;
          if (processedLinks === linksNumber) {
            resolve(statusArray)
          }
        });
      }
    });
    processedLinks++;
    if (processedLinks === linksNumber) {
      resolve(statusArray)
    }
  })
};


async function validatingLinks(linksArray, file, Dir) {
  let result = await validating(linksArray, file, Dir);
  console.log(result);
}

const countigValidatedLinks = async (linksArray, file, Dir) => {
  let result = await validating(linksArray, file, Dir);
  let brokenArray = [];
  let okArray = [];
  result.forEach((element) => {
    if (element.Status == 200 || element.Status == 202) {
      okArray.push(element);
    } else if (element.port == 443) {
      brokenArray.push(element);
    } else {
      brokenArray.push(element)
    }
  });
  const uniqueLinks =
    linksArray.filter((x, i, a) =>
      a.indexOf(x) == i);
  
  const extraErrors = (linksArray.length - (brokenArray.length+okArray.length));

  console.log(
    ` Total Links: ${linksArray.length} 
  Links únicos: ${uniqueLinks.length} 
  Links correctos: ${okArray.length} 
  Links con error: ${brokenArray.length} 
  Links con error no encontrado: ${extraErrors}`.stats);
  
}


module.exports.links = links;
module.exports.validating = validating;
module.exports.counting = counting;
module.exports.validatingLinks = validatingLinks;
module.exports.countigValidatedLinks = countigValidatedLinks;