const express = require("express");
const app = express();
const morgan = require("morgan");
const methosOverride = require("method-override");
//validator
const {
  body,
  valitationResult,
  check,
  validationResult,
} = require("express-validator");

//module layouting ejs express
const expressLayouts = require("express-ejs-layouts");

//module tambahan session cookie-parser flash

const session = require("express-session");
const cookieParser = require("cookie-parser");
const flash = require("connect-flash");

//config flash message
app.use(cookieParser("secrect"));
app.use(
  session({
    cookie: { maxAge: 6000 },
    secret: "secret",
    resave: true,
    saveUninitialized: true,
  })
);
app.use(flash());

//use method override
app.use(methosOverride("_method"));

//middleware built in express
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
const port = 3000;

//3rdparty middleware
app.use(morgan("tiny"));

//database mongodb
require("./config/db");
const Contact = require("./model/contact");

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
app.get("/contact", async (req, res) => {
  // res.send("hello world contact");

  // res.sendFile("./contact.html", { root: __dirname });

  const contacts = await Contact.find();

  res.render("contact", {
    title: "Contact EJS",
    layout: "layouts/main-layout",
    contacts,
    msg: req.flash("msg"),
  });
});

//tambah data
app.get("/contact/add", (req, res) => {
  res.render("tambah-data", {
    title: "tambah data kontak",
    layout: "layouts/main-layout",
  });
});

//proses simpan data
app.post(
  "/contact",
  [
    body("nama").custom(async (value) => {
      const duplikat = await Contact.findOne({ nama: value });
      if (duplikat) {
        throw new Error("nama contact sudah digunakan!");
      }
      return true;
    }),
    check("email", "Email tidak valid").isEmail(),
    check("nohp", "no HP tidak valid").isMobilePhone("id-ID"),
  ],
  (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      res.render("tambah-data", {
        title: "form Tambah data kontak",
        layout: "layouts/main-layout",
        errors: errors.array(),
      });
    } else {
      Contact.insertMany(req.body, (error, result) => {
        req.flash("msg", "Data Kontak berhasil ditambahkan!");
        res.redirect("/contact");
      });
    }
  }
);

//hapus data
app.delete("/contact", (req, res) => {
  Contact.findByIdAndDelete(req.body.id).then((result) => {
    req.flash("msg", "Data Kontak berhasil Dihapus!");
    res.redirect("/contact");
  });
});

//panggil halaman edit
app.get("/contact/edit/:id", async (req, res) => {
  const contact = await Contact.findById(req.params.id);
  res.render("edit-data", {
    title: "form ubah data kontak",
    layout: "layouts/main-layout",
    contact,
  });
});

//edit data
app.put(
  "/contact",
  [
    // body("nama").custom(async (value) => {
    //   const duplikat = await Contact.findOne({ nama: value });
    //   if (duplikat) {
    //     throw new Error("nama contact sudah digunakan!");
    //   }
    //   return true;
    // }),
    check("email", "Email tidak valid").isEmail(),
    check("nohp", "no HP tidak valid").isMobilePhone("id-ID"),
  ],
  (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      res.render("edit-data", {
        title: "form Tambah data kontak",
        layout: "layouts/main-layout",
        errors: errors.array(),
      });
    } else {
      Contact.updateOne(
        { _id: req.body._id },
        {
          $set: {
            nama: req.body.nama,
            email: req.body.email,
            nohp: req.body.nohp,
          },
        }
      ).then((result) => {
        req.flash("msg", "Data Kontak berhasil Diubah!");
        res.redirect("/contact");
      });
    }
  }
);

app.get("/contact/:id", async (req, res) => {
  const contact = await Contact.findById(req.params.id);

  res.render("detail", {
    title: "detail contact",
    layout: "layouts/main-layout",
    contact,
  });
});

app.listen(port, () => console.log(`server berjalan pada port ${port}.`));
