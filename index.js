import express from 'express';
import bodyParser from 'body-parser';
import mongoose from 'mongoose';
import dotenv from 'dotenv'

const app = express();
import { WebSocketServer } from 'ws';
import http from 'http';

dotenv.config()

import commandRoutes from './routes/command.js';
import userRoutes from './routes/user.js';

const port = process.env.PORT || 8080;

const server = http.createServer(app);

//initialize the WebSocket server instance
const wss = new WebSocketServer({ server });


export function sendToAll(data) {
  console.log("inside send to all")
  let str = JSON.stringify({
    data: data,
    type: "commands"
  });
  console.log(str)
  wss.clients.forEach((client) => {
    client.send(str);
  });
}

wss.on('connection', (ws) => {
    console.log(wss.clients)
  
    //connection is up, let's add a simple simple event
    ws.on('message', (message) => {

      //log the received message and send it back to the client
      console.log('received: %s', message);

      const broadcastRegex = /^broadcast\:/;

      if (broadcastRegex.test(message)) {
          message = message.toString().replace(broadcastRegex, '');

          //send back the message to the other clients
          wss.clients
              .forEach(client => {
                  if (client != ws) {
                      client.send(JSON.stringify({type: "string", data: `Hello, broadcast message -> ${message}`}));
                  }    
              });
          
      } else {
          ws.send(JSON.stringify({type: "string", data: `Hello, you sent -> ${message}`}));
      }
  });

    //send immediatly a feedback to the incoming connection    
    ws.send(JSON.stringify({type: "string", data:'Hi there, I am a WebSocket server'}));
});

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

app.get('/', (req, res, next) => {
  // This will return all the data, exposing only the id and action field to the client
  res.json({ message: "Hello from API!" });
  next();
});

app.use('/commands', commandRoutes);
app.use('/user', userRoutes);


app.use((err, req, res, next) => {
  console.log(err);
  next();
});

server.listen(port,() => {
  console.log(`Server running on port ${port}`);
} );
