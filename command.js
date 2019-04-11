#!/usr/bin/env node

const argv = require('minimist')(process.argv.slice(2));
const app = require('./app');
const matchLinks = require("./matchLink");
// const validate = infoRequired.includes('--validate');
// const stats = infoRequired.includes('--stats');


const validate = (result, File, Path) => {
  if (stats) {
    statsF.counting(result, File, Path);
  } else if (validate) {
    validateF.validate(result, File, Path);
  }
};

app.scanFile(validate);
module.exports.validate = validate;
