<img src="https://s3.amazonaws.com/devmountain/readme-logo.png" width="250" align="right">

# Project Summary

In this project, we will create a local node chat server. After building out the server, we'll use postman unit tests to make sure the API has been built out correctly and also use a pre-built front-end to interact with the API.

# Live Example

<a href="http://104.131.99.159:10007/">Click Me!</a>

<img src="https://github.com/DevMountain/node-1-afternoon/blob/solution/readme-assets/1.png" />

## Setup

* `Fork` this repository.
* `Clone` your `fork`.

## Step 1

### Summary

In this step, we will create a `package.json` and install our dependencies.

### Instructions

* In the root of the project, create a `package.json` file.
* Using npm, install and save `express` and `body-parser` to the `package.json`.

<details>

<summary> Detailed Instructions </summary>

<br />

Using `npm` we can quickly create a `package.json` file. In your terminal, when in the root of the project, run `npm init -y`. The `-y` flag will create a `package.json` file with all the default values. It's that simple. Now we can use `npm` to install packages and save them to the `package.json` file using the `--save` flag. Run `npm install --save express body-parser` to install and save both packages.

</details>

### Solution

<img src="https://github.com/DevMountain/node-1-afternoon/blob/solution/readme-assets/1g.gif" />

## Step 2

### Summary

In this step, we will create a `.gitignore` file so our `node_modules` folder doesn't get tracked.

### Instructions

* Create a `.gitignore` file in the root of the project.
* Add `node_modules` to the file.

### Solution

<details>

<summary> <code> .gitignore </code> </summary>

```
node_modules
```

</details>

## Step 3

### Summary

In this step, we will create our `index.js` file.

### Instructions

* Open `server/index.js`.
* Require `express` and `body-parser`.
* Create an express app.
* Configure the app to parse JSON from the body.
* Configure the app to listen on port 3001 and display a message when it is listening.

<details>

<summary> Detailed Instructions </summary>

<br />

To begin let's open `server/index.js` and require the packages our server will need. Express is a minimalist web framework for Node that will allow us to spin up a server in no-time. We can create an express application by requiring it and saving `express()` to a variable. Let's create a variable called `app` that equals `express()`.

```js
const express = require('express');
const bodyParser = require('body-parser');

const app = express();
```

We now have a full express application stored in `app`. If you were to console log app you would see it's a large object with many methods we can make use of. One of them we'll use is called `listen`. This will allow us to say what port the server should listen on. Let's have our server listen on port `3001`. We also need to set up our body parser so that we have access to req.body in our endpoints. set up an `app.use(bodyParser.json())`

```js
const express = require('express');
const bodyParser = require('body-parser');

const app = express();

app.use( bodyParser.json() );

const port = 3001;
app.listen( port, () => { console.log(`Server listening on port ${port}`); } );
```

Why did you use a port variable? This variable is not required. However, say for some reason you needed to change the port, you now only have to change it in one place instead of two. 

We now have an express server listening for requests on port 3001 and when we start up the server we'll see the console log of `Server listening on port 3001`.

</details>

### Solution

<details>

<summary> <code> server/index.js </code> </summary>

```js
const express = require('express');
const bodyParser = require('body-parser');

const app = express();

app.use( bodyParser.json() );

const port = 3001;
app.listen( port, () => { console.log(`Server listening on port ${port}.`); } );
```

</details>

## Step 4

### Summary

In this step, we will create a controller that will handle the logic to create, read, update, and delete messages. A message will be an object with an `id`, `text`, and `time` property. 

### Instructions

* Create a `controllers` folder in `server/`.
* Create a `messages_controller` in `server/controllers/`.
* Open `server/controllers/messages_controller.js`.
* Create an array to hold the messages.
* Create a variable that will keep track of what `id` to assign to messages.
  * The `id` should start at `0` and increment after every creation.
* Export an object with methods to create, read, update, and delete messages.
  * Create - Should be able to create a message using `text` and `time` off of the request body.
    * Should be able to assign a unique `id` to the message.
  * Read - Should be able to return the messages array.
  * Update - Should be able to update the `text` property of a message using the request body.
    * Should be able to determine which message to update using an `id` url parameter.
  * Delete - Should be able to delete a message using an `id` url parameter.
* All methods should send a response of the updated messages array.

<details>

<summary> Detailed Instructions </summary>

<br />

Now that we have a server listening for requests, let's create a controller that will execute logic when certain requests come in. Create a controllers folder in `server/` and a `messages_controller.js` file in `server/controllers`. Inside that file let's create an array that will keep track of all the messages. We'll also need a variable that will keep track of what ID to assign to new messages to keep them unique. Let's create an `id` variable that is equal to `0`.

```js
let messages = [];
let id = 0;
```

Now let's use `module.exports` to export an object. We'll put all our methods on this object. We are using `module.exports` so that we can import the controller into `index.js` to setup routes. I'll go into more detail when that time comes. For now, let's make a `create`, `read`, `update`, and `delete` method. Each method should be a function that has two parameters, one called `req` and one called `res`.

```js
let messages = [];
let id = 0;

module.exports = {
  create: ( req, res ) => {

  },
  read: ( req, res ) => {

  },
  update: ( req, res ) => {

  },
  delete: ( req, res ) => {

  }
}
```

The `create` method should create a new message object using `text` and `time` from the request body and also the global `id` variable. It should then push this new messsage object into the `messages` array. After a new message object is created, `id` should be incremented by one so that the previous `id` won't be used on any other future messages. This will effectively keep the `id` unique for every message. We'll then want to send the updated `messages` array.

```js
create: ( req, res ) => {
  const { text, time } = req.body;
  messages.push({ id, text, time });
  id++;
  res.status(200).send( messages );
}
```

The `read` method should return the entire messages array.

```js
read: ( req, res ) => {
  res.status(200).send( messages );
}
```

The `update` method should update the `text` property of a message using the `text` value from the request body. It should also determine which message to update based on the value of `id` from the request url parameters. We can use `.findIndex` to get the index where the `id`s match. We can then get the object using the index and update the object. Then we can return the updated `messages` array.

```js
update: ( req, res ) => {
  const { text } = req.body;
  const updateID = req.params.id;
  const messageIndex = messages.findIndex( message => message.id == updateID );
  let message = messages[ messageIndex ];

  messages[ messageIndex ] = {
    id: message.id,
    text: text || message.text,
    time: message.time
  };

  res.status(200).send( messages );
}
```

The `delete` method should delete a message using the value of `id` from the request url parameters. We can use `.findIndex` again with the `id` to get the `index` of the message object and then use `.splice` to remove it from the `messages` array. We'll then want to send the updated `messages` array.

```js
delete: ( req, res ) => {
  const deleteID = req.params.id;    
  messageIndex = messages.findIndex( message => message.id == deleteID );
  messages.splice(messageIndex, 1);
  res.status(200).send( messages );
}
```

We now have all the logic we need to `create`, `read`, `update`, and `delete` messages. Now we can import our controller into `index.js` and create routes that will execute the logic.

</details>

### Solution

<details>

<summary> <code> server/controllers/messages_controller.js </code> </summary>

```js
let messages = [];
let id = 0;

module.exports = {
  create: ( req, res ) => {
    const { text, time } = req.body;
    messages.push({ id, text, time });
    id++;
    res.status(200).send( messages );
  },

  read: ( req, res ) => {
    res.status(200).send( messages );
  },

  update: ( req, res ) => {
    const { text } = req.body;
    const updateID = req.params.id;
    const messageIndex = messages.findIndex( message => message.id == updateID );
    let message = messages[ messageIndex ];

    messages[ messageIndex ] = {
      id: message.id,
      text: text || message.text,
      time: message.time
    };

    res.status(200).send( messages );
  },

  delete: ( req, res ) => {
    const deleteID = req.params.id;    
    messageIndex = messages.findIndex( message => message.id == deleteID );
    messages.splice(messageIndex, 1);
    res.status(200).send( messages );
  }
};
```

</details>

## Step 5

### Summary

In this step, we will hook up our controller to our app in `server/index.js`.

### Instructions

* Open `server/index.js`.
* Require the messages controller.
* Create a `post`, `get`, `put`, and `delete` endpoint that use the corressponding method on the messages controller.
* The url for this api should be `/api/messages`.
  * Remember to add on a url parameter of `id` for the methods that are using it.

<details>

<summary> Detailed Instructions </summary>

<br />

Let's begin by opening `server/index.js`. Since we used `module.exports` in our `server/controllers/messages_controller.js` we can require it in our `index.js`. The entire `index.js` will have access to all the methods we put on the object ( `create`, `read`, `update`, and `delete` ).

```js
const mc = require('./controllers/messages_controller');
```

We can then use the built-in methods `express` gives us to create endpoints. We'll use `post` for `create`; `get` for `read`; `put` for `update`; and `delete` for `delete`. We'll also make a `messagesBaseUrl` variable so that if the URL ever changes we won't have to update in four different places. The `messagesBaseUrl` should equal `/api/messages`.

```js
const messagesBaseUrl = "/api/messages";
app.post( messagesBaseUrl, mc.create );
app.get( messagesBaseUrl, mc.read );
app.put( messagesBaseUrl, mc.update );
app.delete( messagesBaseUrl, mc.delete );
```

For the `put` and `delete` endpoints, we need to add on a url parameter of `id`. A url paramter can be defined by adding `:variableName` when making the URL for an endpoint.

```js
const messagesBaseUrl = "/api/messages";
app.post( messagesBaseUrl, mc.create );
app.get( messagesBaseUrl, mc.read );
app.put( `${messagesBaseUrl}/:id`, mc.update );
app.delete( `${messagesBaseUrl}/:id`, mc.delete );
```

Now when a `get` request is sent to `http://localhost:3001` our `read` function will be executed in our `messages_controller`. Which will then send a response of the messages array. Here is a map of what happens when certain requests come through:

* http://localhost:3001 ( POST ) - `create` from `messages_controller` executes - responds with `messages` array.
* http://localhost:3001 ( GET ) - `read` from `messages_controller` executes - responds with `messages` array.
* http://localhost:3001 ( PUT ) - `update` from `messages_controller` executes - responds with `messages` array.
* http://localhost:3001 ( DELETE ) - `delete` from `messages_controller` executes - responds with `messages` array.

</details>

### Solution

<details>

<summary> <code> server/index.js </code> </summary>

```js
const express = require('express');
const bodyParser = require('body-parser');
const mc = require('./controllers/messages_controller');

const app = express();

app.use( bodyParser.json() );

const messagesBaseUrl = "/api/messages";
app.post( messagesBaseUrl, mc.create );
app.get( messagesBaseUrl, mc.read );
app.put( `${messagesBaseUrl}/:id`, mc.update );
app.delete( `${messagesBaseUrl}/:id`, mc.delete );

const port = 3001;
app.listen( port, () => { console.log(`Server listening on port ${port}.`); } );
```

</details>

## Step 6

### Summary

In this step, we will test the API endpoints using postman unit tests.

### Instructions

* Startup the API and make sure it doesn't crash.
* Open postman.
* Import the `postman_collection` into postman.
* Run the collection's tests.
  * If all tests do not pass, revist previous steps.
  * **TESTS WILL ONLY PASS IF THE 'MESSAGES' ARRAY IS EMPTY WHEN THE POSTMAN COLLECTION STARTS** Restart your server (the command is 'rs') to reset your array to empty. 

### Solution

<img src="https://github.com/DevMountain/node-1-afternoon/blob/solution/readme-assets/2.png" />

## Step 7

### Summary

In this step, we will setup the API to serve our front-end files.

### Instructions

* Open `server/index.js`.
* Use `express.static` to serve the `public/build` folder.
  * Restart the API or Start the API.
* Open `http://localhost:3001/` to see the front-end interact with the API.

### Solution

<details>

<summary> <code> server/index.js </code> </summary>

```js
const express = require('express');
const bodyParser = require('body-parser');
const mc = require('./controllers/messages_controller');

const app = express();

app.use( bodyParser.json() );
app.use( express.static( __dirname + '/../public/build' ) );

const  messagesBaseUrl = "/api/messages";
app.post(  messagesBaseUrl, mc.create );
app.get(  messagesBaseUrl, mc.read );
app.put( `${ messagesBaseUrl}/:id`, mc.update );
app.delete( `${ messagesBaseUrl}/:id`, mc.delete );

const port = 3001;
app.listen( port, () => { console.log(`Server listening on port ${port}.`); } );
```

</details>

<br />

<img src="https://github.com/DevMountain/node-1-afternoon/blob/solution/readme-assets/2g.gif" />

## Black Diamond

* Modify the chat api to include a display name for each message.
* Host the chat api.
* Modify the `create-react-app` front-end to hit the hosted chat api instead.
* See if you can chat with your classmates.

## Contributions

If you see a problem or a typo, please fork, make the necessary changes, and create a pull request so we can review your changes and merge them into the master repo and branch.

## Copyright

© DevMountain LLC, 2017. Unauthorized use and/or duplication of this material without express and written permission from DevMountain, LLC is strictly prohibited. Excerpts and links may be used, provided that full and clear credit is given to DevMountain with appropriate and specific direction to the original content.

<p align="center">
<img src="https://s3.amazonaws.com/devmountain/readme-logo.png" width="250">
</p>

# basic-node-setup
