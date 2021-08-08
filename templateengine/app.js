const express = require("express");
const app = express();

const expressLayouts = require("express-ejs-layouts");

const port = 3000;

//template engine ejs
app.set("view engine", "ejs");
app.use(expressLayouts);

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
