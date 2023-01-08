const express = require("express");
const app = express();
const config = require("./config/configSecret");
const port = config.port;

app.get("/", (req, res) => res.send("Hello World!"));
app.listen(port, () =>
  console.log(`Medical Store App listening on port ${port}!`)
);
