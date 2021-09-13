const fs = require('fs')

const getAnimals = (file) => {
    let rawdata = fs.readFileSync(file);
    return JSON.parse(rawdata);
}

writeAnimals = (file, data) => {
    fs.writeFileSync(file,JSON.stringify(data))
}

module.exports = {getAnimals, writeAnimals}
