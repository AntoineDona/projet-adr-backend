const express = require('express');
const router = express.Router();
const Command = require('../models/command');
var ObjectId = require('mongodb').ObjectId;

router.get('/', (req, res, next) => {
  // This will return all the data, exposing only the id and action field to the client
  res.json({ message: "Hello from API!" });
});

router.get('/commands', (req, res, next) => {
  // This will return all the data, exposing only the id and action field to the client
  Command.find({})
    .then((data) => res.json(data))
    .catch(next);
});

router.get('/commands/gettype/:type', (req, res, next) => {
  // This will return all the data, exposing only the id and action field to the client
  Command.find({ "content.status": req.params.type })
    .then((data) => res.json(data))
    .catch(next);
});

router.put('/commands/changestatus', (req, res, next) => {
  let querry = {
    _id: req.body.id,
    "content.id": req.body.item_id
  }
  console.log(querry);
  let update = {
    $set: { "content.$.status": req.body.status }
  }
  console.log(update);
  Command.findOneAndUpdate(querry, update)
    .then((data) => res.json(data))
    .catch(next);
});

router.post('/commands/add', (req, res, next) => {
  if (req.body.content && req.body.name) {
    Command.create(req.body)
      .then((data) => res.json(data))
      .catch(next);
  } else {
    res.json({
      error: 'The input field is empty',
    });
  }
});

router.delete('/commands/remove/:id', (req, res, next) => {
  Command.findOneAndDelete({ id: ObjectId(req.params.id) }) //tous les id sont de type ObjectId, et non plus un str
    .then((data) => res.json(data))
    .catch(next);
});

router.delete('/commands/removeall', (req, res, next) => {
  Command.deleteMany({}) //tous les id sont de type ObjectId, et non plus un str
    .then((data) => res.json(data))
    .catch(next);
});


module.exports = router;