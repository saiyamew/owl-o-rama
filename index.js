const animal = require('./animal.js')

exports.owlORama = async (req, res) => {
    switch (req.method) {
    case 'GET':
      let owl = await animal.getAnimal('petting-zoo-data-test','animal.json','./animal.json','owl');
      let message = {"message": "Brought to you by Joe's Owl-O-Rama", "url": owl};
      res.type('json');
      res.status(200).send(message);
      break;
    //Do I really need PUT?
    case 'PUT':
      res.status(403).send('Forbidden!');
      break;
    //I think the update should go in POST
    case 'POST':
      let newOwl = await animal.postOwl('petting-zoo-data-test','animal.json','./animal.json','goose','http://fuck.biz/ass')//TEMPORARY AS I FIGURE OUT HOW TO USE THE DATA FROM THE POST
      res.status(newOwl.status).send(newOwl.message);
      break;
    default:
      res.status(405).send({error: 'Something blew up!'});
      break;
  }
};
