const index = require('./app');
const links = require('./matchLink');
const infoRequired = process.argv.splice(2);
const validate = infoRequired.includes('--validate');
const stats = infoRequired.includes('--stats');

if(infoRequired.length > 0) {
    if(infoRequired[0] !== '--validate' && infoRequired[0] !== '--stats') {
        index.lookFor(infoRequired[0]);
        
    } else {
        index.lookFor('./');
    }
  };

  const typeOfValidation = (linksArray, file, Path) => {
    if(validate && stats) {
        links.countigValidatedLinks(linksArray, file, Path);
    } else if (stats){
        links.counting(linksArray, file, Path);
    } else if (validate) {
        links.validatingLinks(linksArray, file, Path);
        
    }
  }

  module.exports.typeOfValidation = typeOfValidation;
