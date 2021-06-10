"use strict";

require('dotenv').config();
const mongoose = require("mongoose");
const db = require("./db");
const firebase = require("./firebase");
const config = require("./keys");

const path = require("path"),
  http = require("http"),
  cors = require("cors"),
  logger = require("morgan"),
  express = require("express"),
  bodyParser = require("body-parser"),
  app = express();

/*const corsOptions = {
  origin: '*'
};*/

//database Conection
db.connect();

//firebase conection
firebase.connect();

//middlewares

app.use(cors());
//Settings
console.log("port",process.env.DEV);
app.set("port", process.env.PORT || 4000);
app.set('llave', config.llave);

app.use(logger("dev"));
app.use(bodyParser.urlencoded({limit: '50mb', extended: true}));
app.use(bodyParser.json({limit: '50mb', extended: true}));

/*app.use(function(req, res, next) {
    res.header("Access-Control-Allow-Origin", '*');
    res.header("Access-Control-Allow-Credentials", true);
    res.header('Access-Control-Allow-Methods', 'GET,PUT,POST,DELETE,OPTIONS');
    res.header("Access-Control-Allow-Headers", 'Origin,X-Requested-With,Content-Type,Accept,content-type,application/json');
    next();
});*/

app.use(express.static(path.join(__dirname, "public")));
app.use("/user/", require("./routes/user"));
app.use("/company/", require("./routes/company"));
app.use("/businessCategory/", require("./routes/businessCategory"));
app.use("/branchOffice/", require("./routes/branchOffice"));
app.use("/booking/", require("./routes/booking"));
app.use("/bann/", require("./routes/bann"));
app.use("/schedule/", require("./routes/schedule"));
app.use("/service/", require("./routes/service"));
app.use("/slot/", require("./routes/slot"));
app.use("/feature/", require("./routes/feature"));
app.use("/request/", require("./routes/request"));
app.use("/auth/", require("./routes/auth"));
app.use("/role/", require("./routes/role"));

app.get('/', (req, res) => {
  res.send("API Rest Spazer App third deploy!");
});


const server = http.createServer(app);
server.listen(app.get("port"), () => {
  console.log("Listening in:", app.get("port"));
});
