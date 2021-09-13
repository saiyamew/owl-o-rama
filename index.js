const animal = require('./animal.js')

exports.owlORama = async (req, res) => {
    switch (req.method) {
    case 'GET':
      let owl = await animal.getAnimalPicture('owl');
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
      res.status(403).send('What are you doing!?');
      break;
    default:
      res.status(405).send({error: 'Something blew up!'});
      break;
  }
};
