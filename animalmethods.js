//Require
const {Storage} = require('@google-cloud/storage');
const storage = new Storage();
const fs = require('fs')
const fetch = require('node-fetch')

//Pulled-out methods
//Downloads a file from GCP Bucket to local file
const downloadAnimals = async (bucketName,fileName,localFileName) => {
  const options = {
    destination: localFileName,
  };
  // Downloads the file
  await storage.bucket(bucketName).file(fileName).download(options);
  console.log(`${fileName} downloaded from ${bucketName} to ${localFileName}`)  
  return localFileName
}
//Provides Animals JSON data from local file
const getData = (localFileName) => {
    return JSON.parse(fs.readFileSync(localFileName));
}
//Retrieves animal picture from source
const retrieveAnimalPicture = (data,animal) => {
    if (data[animal]) {
        return data[animal][Math.floor(Math.random() * data[animal].length)]
    } else {
        return 'Fuck off!'
    }
}

//Validates animal picture from URL
const getAnimalPicture = async (url) => {
    return await fetch (url)
    .then((res) => {
        if(res.ok) {
          return {'status': '200','message': url}
      } else {
          return {'status': '400','message':'Y\'all done fucked up, A-A-Ron!'}
        }  
    })
}

//Add Animal Picture
const addAnimalPicture = (localFileName,data,animal,url) => {
    let source = data
    if (source[animal]) {
    source[animal].push(url)
    writeData(localFileName,source)
    }
}

//Write Data method
const writeData = (location,data) => {
    fs.writeFileSync(location,JSON.stringify(data))
}

//Upload Animals method
const uploadAnimals = async (bucketName,fileName,localFileName) => {
  await storage.bucket(bucketName).upload(localFileName, {
    destination: fileName,
  });
  console.log(`${localFileName} uploaded to ${bucketName}`);
}

//Validate if URL exists (receives 200 status code)
const validateURL = async (response) => {
    try {
        if(response.ok) {
            //console.log (`Valid URL = ${url}`)
            return true
    } throw new Error ('Link provided is not a valid URL')
    } catch (error) { 
        console.log('validateURL catch block, error: ' + error.message)
        throw new Error (error.message)
    }
}

//Validate if content-type is an image
const validateContentType = (response) => {
    let contentType = response.headers.get('content-type')
      try {if (contentType.startsWith('image')) {
        //console.log('Success - URL can be added')
        return true
    } throw new Error ('Content-type is not valid, make sure the link you provide is to some form of image')
    } catch (error) {
        console.log('validateContentType catch block, error: ' + error.message)
        throw new Error (error.message)
    }
}

//Validate if URL already exists (to prevent stacking/spamming)
const validateExistingContent = (data,animal,url) => {
   try{
       if (!data[animal].includes(url)) {
           //console.log('URL does not exist for this animal - Adding now!')
           return true
        } 
        throw new Error (`URL already exists for \'${animal}\', no action taken`)
    } catch (error) {
        //console.log('validateExistingContent Error: ' + error.message)
        throw new Error (error.message)
    }            
}

//Validation omnibus - does a Fetch, then confirms all the boxes are checked to add it.
const validation = async (data,animal,url) => {
    try { return await fetch(url)
        .then(response => {
        try {Promise.all([validateURL(response), validateContentType(response), validateExistingContent(data,animal,url)])
        .then(values => {return true})
        } catch(error) {
            //console.log('Trio of validation failed: ' + error.message)
            throw new Error (error.message) 
        }})
    } catch (error) {
        if(error.message == 'Only absolute URLs are supported') {
            error.message = 'Link provided isn\'t a valid URL.'
        }
        //console.log('validation error: ' + error.message)
        throw new Error (error.message)
    }
}


module.exports = {downloadAnimals,getData,getAnimalPicture,retrieveAnimalPicture,validation,addAnimalPicture,uploadAnimals}
