import express from 'express';
const router = express.Router();
import Command from '../models/command.js';
import ObjectId from 'mongodb';
import {wsUpdateCommands} from '../controllers/command.js';


router.get('/', (req, res, next) => {
  // This will return all the data, exposing only the id and action field to the client
  console.log("getting commands");
  Command.find({})
    .then((data) => res.json(data))
    .catch(next);
});

router.get('/gettype/:type', (req, res, next) => {
  // This will return all the data, exposing only the id and action field to the client
  Command.find({ "content.status": req.params.type })
    .then((data) => res.json(data))
    .catch(next);
});

router.put('/changestatus', (req, res, next) => {
  let querry = {
    _id: req.body.id,
    "content.id": req.body.item_id
  }
  console.log(querry);
  let update = {
    $set: { 
      last_update: req.body.last_update,
      "content.$.status": req.body.status 
    }
  }
  Command.findOneAndUpdate(querry, update)
    .then((data) => {
      wsUpdateCommands()
      return res.json(data)
    })
    .catch(next);
});

router.post('/add', (req, res, next) => {
  if (req.body.content && req.body.name) {
    Command.create(req.body)
      .then((data) => {
        wsUpdateCommands()
        return res.json(data)
      })
      .catch(next);
  } else {
    res.json({
      error: 'The input field is empty',
    });
  }
});

router.delete('/remove/:id', (req, res, next) => {
  Command.findOneAndDelete({ id: ObjectId(req.params.id) }) //tous les id sont de type ObjectId, et non plus un str
    .then((data) => res.json(data))
    .catch(next);
});

router.delete('/removeall', (req, res, next) => {
  Command.deleteMany({}) //tous les id sont de type ObjectId, et non plus un str
    .then((data) => res.json(data))
    .catch(next);
});


export default router;