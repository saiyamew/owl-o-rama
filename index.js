const animal = require('./animal.js')

exports.owlORama = async (req, res) => {
    switch (req.method) {
    case 'GET':
      console.log('Starting GET')
      try{
      let owl = await animal.getAnimal('petting-zoo-data-test','animal.json','/tmp/animal.json','owl');
      let message = {"message": "Brought to you by Joe's Owl-O-Rama", "url": owl.message};
      res.type('json');
      res.status(200).send(message);
      } catch (error) {
        res.status(400).send(error)
      }
      break;
    //Do I really need PUT?
    case 'PUT':
      res.status(403).send('Forbidden!');
      break;
    //I think the update should go in POST
    case 'POST':
      console.log('Starting POST')
      let url = req.body.url;
      console.log('URL provided = ' + url);      
      let newOwl;
      try{
      newOwl = await animal.postAnimal('petting-zoo-data-test','animal.json','/tmp/animal.json','owl',url)//TEMPORARY AS I FIGURE OUT HOW TO USE THE DATA FROM THE POST
      res.status(newOwl.status).send(newOwl.message);
      } catch (error) {
        console.log('Error: ' + error)
        res.end('Error: ' + newOwl.toString())
      }
      break;
    default:
      res.status(405).send('Something fucked up');
      break;
  }
};
