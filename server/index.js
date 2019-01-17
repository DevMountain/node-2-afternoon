const express = require("express");
const bodyParser = require("body-parser");
const mc = require("./controllers/messages_controller");
const messagesBaseUrl = "/api/messages";

const app = express();

app.use(bodyParser.json());

app.post(messagesBaseUrl, mc.create);
app.get(messagesBaseUrl, mc.read);
app.put(`${messagesBaseUrl}/:id`, mc.update);
app.delete(`${messagesBaseUrl}/:id`, mc.delete);

const port = 3001;
app.listen(port, () => {
  console.log(`Listening on port ${port}`);
});
