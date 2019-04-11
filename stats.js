const links = require('./matchLink');

const statsFile = (result, Path, File) => {
  console.log(
    "Total de links:", result.length,
    "Links en tu archivo: ", File,
    "Links totales:", Path.stats);
};

statsFile(links, result, File, Dir);

module.exports.statsFile = statsFile;
