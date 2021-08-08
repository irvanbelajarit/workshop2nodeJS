const express = require("express");
const app = express();
const morgan = require("morgan");

//module layouting ejs express
const expressLayouts = require("express-ejs-layouts");

//middleware built in express
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
const port = 3000;

//3rdparty middleware
app.use(morgan("tiny"));

const mahasiswa = [
  { id: 1, nama: "irvan" },
  { id: 2, nama: "irvan2" },
  { id: 3, nama: "irvan3" },
];

//template engine ejs
app.set("view engine", "ejs");
app.use(expressLayouts);

//middleware user defined
app.use(function (req, res, next) {
  console.log("log middleware...");
  next();
});

app.get("/api/mhs", (req, res) => {
  res.send(mahasiswa);
});

app.post("/api/mhs", (req, res) => {
  const datamahasiswa = {
    id: mahasiswa.length + 1,
    nama: req.body.nama,
  };
  mahasiswa.push(datamahasiswa);
  res.send(datamahasiswa);
});

app.get("/", (req, res) => {
  //  res.send("hello world ");
  // res.sendFile("./index.html", { root: __dirname });

  const peserta = [
    {
      nama: "irvan",
      email: "irvan@gmail.com",
    },
    {
      nama: "irvan2",
      email: "irvan2@gmail.com",
    },
    {
      nama: "irvan3",
      email: "irvan3@gmail.com",
    },
  ];

  res.render("index", {
    title: "homepage",
    peserta,
    layout: "layouts/main-layout",
  });
});
app.get("/about", (req, res) => {
  //  res.send("hello world about ");
  // res.sendFile("./about.html", { root: __dirname });
  res.render("about", { title: "about", layout: "layouts/main-layout" });
});
app.get("/contact", (req, res) => {
  // res.send("hello world contact");
  // res.sendFile("./contact.html", { root: __dirname });
  res.render("contact", {
    title: "Contact EJS",
    layout: "layouts/main-layout",
  });
});

app.listen(port, () => console.log(`server berjalan pada port ${port}.`));
