const express = require("express");
const path = require("path");

const bodyParser = require("body-parser");
const cors = require("cors");
const mongoose = require("mongoose");
const passport = require("passport");

//insialisasi express
const app = express();

const users = require("./routes/users");
const exp = require("constants");

const port = 3000;

//passport initialization
app.use(passport.initialize());
app.use(passport.session());

//koneksi database
const config = require("./config/database");

//koneksi mongoose
mongoose.connect(config.database, {
  useCreateIndex: true,
  useNewUrlParser: true,
  useUnifiedTopology: true,
});

mongoose.connection.on("connected", () => {
  console.log(`database ${config.database} terhubung`);
});

//require passportjs
require("./config/passport")(passport);

//cors init
app.use(cors());
app.use(bodyParser.json());

//url halaman users
app.use("/users", users);

//route root
app.get("/", (req, res) => {
  res.send("end point");
});

//static
app.use(express.static(path.join(__dirname, "public")));

app.listen(port, () => {
  console.log(`server berjalan pada port ${port}`);
});
