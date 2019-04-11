#!/usr/bin/env node
const argv = require('minimist')(process.argv.slice(2));
const links = require('./matchLink');
const app = require('./app');
const infoRequired = process.argv.splice(2);
const validate = infoRequired.includes('--validate');
const stats = infoRequired.includes('--stats');
const typeOfValidation = (result, File, Path) => {
    if(validate && stats) {
        statsValidate.countigValidatedLinks(result, File, Path);
    } else if (stats){
        scanStats.counting(result, File, Path);
    } else if (validate) {
         scanValidate.validatingLinks(result, File, Path);   
    }
  }
app.scanFile(typeOfValidation);
links.mdLinks(typeOfValidation);
module.exports.typeOfValidation = typeOfValidation;