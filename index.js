const express = require('express');
const bodyParser = require('body-parser');
const mc = require( __dirname + '/controllers/messages_controller');
const Path = require('path');

const app = express();

app.use( bodyParser.json() );
app.use( express.static( __dirname + '/../public/build' ) );

const messagesBaseUrl = "/api/messages";
app.post( messagesBaseUrl, mc.create );
app.get( messagesBaseUrl, mc.read );
app.put( `${messagesBaseUrl}/:id`, mc.update );
app.delete( `${messagesBaseUrl}/:id`, mc.delete );

app.use( express.static( __dirname + '/public/build/') );
app.get( '*', ( req, res, next ) => {
  res.sendFile( Path.resolve( __dirname + '/public/build/index.html' ) );
});

const port = 10005;
app.listen( port, () => { console.log(`Server listening on port ${port}.`); } );