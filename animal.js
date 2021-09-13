const animalfs = require('./animalfs.js')
const fetch = require('node-fetch')
const location = './animal.json'
let source = animalfs.getAnimals(location)

const retrieveAnimalPicture = (animal) => {
    if (source[animal])
    return source[animal][Math.floor(Math.random() * source[animal].length)]
}
const addAnimalPicture = (animal,url) => {
    if (source[animal])
    source[animal].push(url)
    animalfs.writeAnimals(location,source)
}
 const removeAnimalPicture = (animal,url) => {
    if (source[animal]) {
    let index = source[animal].indexOf(url)
    if (index === -1) {
     return "Value not found"
    } else {
     source[animal].splice(index,1)
     return "Removed value " + url + " from list, which was array index " + index
    }
    animalfs.writeAnimals(location,source)
  }
}

//NOTE - THIS CAN BE BETTER FIX IT LATER
const getAnimalPicture = async (animal) => {
    let url = retrieveAnimalPicture(animal)
    return await fetch (url)
    .then((response) => {
        if(response.ok) {
            return url
        } else {
            removeAnimalPicture(animal,url)
            return ('Oh no! We found a missing image, please try again')
        }
    })

}

const getADuck = async() => { 
return await fetch('https://random-d.uk/api/random')
  .then(response => response.json())
  .then(json => json.url)
}
/*
let honk = getAnimalPicture('owl').then((result) => {
    console.log(result)
    return result
})
*/

module.exports = {getAnimalPicture, removeAnimalPicture, addAnimalPicture, getADuck};
