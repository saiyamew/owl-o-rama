const {downloadAnimals, getAnimalPicture, retrieveAnimalPicture, getData, validation, addAnimalPicture, uploadAnimals} = require('./animalmethods.js')

//GET Animal Method
const getAnimal = async (bucketName,fileName,localFileName,animal) => {
  let finalanswer
  //console.log(finalanswer)
  finalanswer = await getAnimalPicture(retrieveAnimalPicture(await getData(await downloadAnimals(bucketName,fileName,localFileName)),animal))
  console.log(finalanswer)
  return finalanswer
}

//POST Animal Method
const postAnimal = async (bucketName,fileName,localFileName,animal,url) => {
    try { await downloadAnimals(bucketName,fileName,localFileName)   
    } catch (error) {
        console.log('Fuck, the GCP download didn\'t work, fix it!')
        return {"status":400,"message":"There was a problem getting the source data, please try again later."}        
    }
    try { await validation(getData(localFileName),animal,url)
        addAnimalPicture(localFileName,getData(localFileName),animal,url)
        uploadAnimals(bucketName,fileName,localFileName)
        return {"status":200,"message":`Success! ${animal} has been added`}
    } catch(error) {
        //console.log('validation catch block: ' + error.message)
        //throw new Error (error.message)
        return {"status":"400","message":error.message}
    }
}
module.exports = {getAnimal,postAnimal}
