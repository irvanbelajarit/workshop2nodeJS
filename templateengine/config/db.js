const mongoose = require("mongoose");

mongoose.connect("mongodb://127.0.0.1:27017/workshopuikadb", {
  useCreateIndex: true,
  useUnifiedTopology: true,
  useNewUrlParser: true,
});

// //schema
// const Contact = mongoose.model("Contact", {
//   nama: {
//     type: String,
//     required: true,
//   },
//   nohp: {
//     type: String,
//     required: true,
//   },
//   email: { type: String },
// });

// //const tambah data
// const Contact1 = new Contact({
//   nama: "irvanL",
//   nohp: "085695300037",
//   email: "irvanln@gmail.com",
// });

// //simpan data
// Contact1.save().then((contact) => console.log(contact));
