const express = require("express");
const app = express();

// Config Secret for PORT
const config = require("./config/configSecret");
const port = config.port;

// Database connection
const dbConnect = require("./db/db");

// Middlewares
const cors = require("cors");
const morgan = require("morgan");
const userRoute = require("./routes/userRoutes");
app.use(cors());
app.use(morgan("dev"));
app.use(express.json());

app.use("/route/user", userRoute);

app.get("/", (req, res) => res.send("Hello World!"));
app.listen(port, () =>
  console.log(`Medical Store App listening on port ${port}!`)
);
