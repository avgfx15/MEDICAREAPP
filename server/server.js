const express = require("express");
const app = express();

// Config Secret for PORT
const config = require("./config/configSecret");
const port = config.port;

// Database connection
const dbConnect = require("./db/db");

/// Middlewares

const cors = require("cors");
const cookieParser = require("cookie-parser");
const userRoute = require("./routes/userRoutes");
const categoryRoute = require("./routes/categoryRoutes");
const adminRoute = require("./routes/adminRoutes");

///` Middleware
app.use(cors());
app.use(express.json());
app.use(cookieParser());

app.use("/route", userRoute);
app.use("/admin", adminRoute);
app.use("/", categoryRoute);

app.get("/", (req, res) => res.send("Hello World!"));
app.listen(port, () =>
  console.log(`Medical Store App listening on port ${port}!`)
);
