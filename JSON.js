const fs = require('fs')

module.exports = JSON.parse(
    fs.readFileSync('./info.json', 'utf8')
);