const express = require('express');
const bodyParser = require('body-parser');
const mongoose = require('mongoose');
const routes = require('./routes/api');
require('dotenv').config();

const app = express();

const port = process.env.PORT || 8080;

// Connect to the database
mongoose
  .connect(process.env.DB, { useNewUrlParser: true })
  .then(() => console.log(`Database connected successfully`))
  .catch((err) => console.log(err));

// Since mongoose's Promise is deprecated, we override it with Node's Promise
mongoose.Promise = global.Promise;

app.use((req, res, next) => {
  res.header('Access-Control-Allow-Origin', '*');
  res.header('Access-Control-Allow-Methods', '*');
  res.header('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content-Type, Accept');
  next();
});

app.use(bodyParser.json());

app.get("/", (req, res, next) => {
  res.json({ message: "Hello from server!" });
  next();
});

app.use('/api', routes);


app.use((err, req, res, next) => {
  console.log(err);
  next();
});

app.listen(port, '0.0.0.0', function(err) {
  console.log("Started listening on %s", app.url);
},() => {
  console.log(`Server running on port ${port}`);
} );