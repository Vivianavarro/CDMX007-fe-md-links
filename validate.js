const links = require('./matchLink');
const https = require('https');
const http = require('http');

let statusArray = [];

const validating = (result, File, Dir) => {
  const linksNumber = result.length;
  let processedLinks = 0;
  return new Promise(resolve => {
    result.forEach((element) => {
    
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
              resolve(statusArray);
            }
          })
          .on('error', (e) => {
            statusArray.push(e);
            processedLinks++;
            if (processedLinks === linksNumber) {
              resolve(statusArray);
            };
          });

       
      } else if (element.match(/(http:\/\/[^\']+)/g)) {
        http.get(element, (res) => {
          statusArray.push({
            Dir,
            File,
            Text: element,
            Status: res.statusCode
          });
          processedLinks++;
          if (processedLinks === linksNumber) {
            resolve(statusArray);
          };
        }).on('error', (e) => {
          statusArray.push(e);
          processedLinks++;
          if (processedLinks === linksNumber) {
            resolve(statusArray);
          };
        });
      }
    });
    processedLinks++;
    if (processedLinks === linksNumber) {
      resolve(statusArray);
    };
  });
};
module.exports.validating = validating;