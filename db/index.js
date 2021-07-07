const mongoose = require("mongoose");

var database_url =
  "mongodb+srv://AdminUser:SpazerDB@cluster0-ad0wl.mongodb.net/Spazer?retryWrites=true&w=majority";
//var database_url = process.env.DB_URI;

const connect = () =>
  mongoose
    .connect(database_url, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    })
    .then(() => console.log("connection succesful"))
    .catch((err) => console.error(err));

mongoose.Promise = global.Promise;

module.exports = { connect };
