const express = require('express');
const router = express.Router();
const Todo = require('../models/todo');

router.get('/', (req, res, next) => {
  // This will return all the data, exposing only the id and action field to the client
  res.json({ message: "Hello from API!" });
});

router.get('/todos', (req, res, next) => {
  // This will return all the data, exposing only the id and action field to the client
  Todo.find({}, 'action')
    .then((data) => res.json(data))
    .catch(next);
});

router.post('/todos', (req, res, next) => {
  if (req.body.action) {
    Todo.create(req.body)
      .then((data) => res.json(data))
      .catch(next);
  } else {
    res.json({
      error: 'The input field is empty',
    });
  }
});

router.delete('/todos/:id', (req, res, next) => {
  Todo.findOneAndDelete({ id: ObjectId(req.params.id) }) //tous les id sont de type ObjectId, et non plus un str
    .then((data) => res.json(data))
    .catch(next);
});

module.exports = router;