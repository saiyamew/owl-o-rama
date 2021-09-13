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
        return {'status':'400','message':'There was a problem getting the source data, please try again later.'}        
    }
    try { await validation(getData(localFileName),animal,url)
        addAnimalPicture(localFileName,getData(localFileName),animal,url)
        uploadAnimals(bucketName,fileName,localFileName)
        return {'status':'200','message':'Success! ' + animal + ' has been added'}
    } catch(error) {
        //console.log('validation catch block: ' + error.message)
        //throw new Error (error.message)
        return {'status':'400','message':error.message}
    }
}

//TESTING
//Get Animal Test
getAnimal('petting-zoo-data-test','animal.json','./animal.json','goose')

//Post Animal Test
const shit = async () => {
    
    let shite = await postAnimal('petting-zoo-data-test','animal.json','./animal.json','goose','https://snworksceo.imgix.net/dtc/3fb856c1-1399-4e9b-a2b3-74b8b094c618.sized-1000x1000.jpg?w=800')
    if(shite.status == 200){
        console.log("Success! " + shite.status + ',' + shite.message)
    } else {
        console.log("Failure! " + shite.message)
    }
    
}
shit()
