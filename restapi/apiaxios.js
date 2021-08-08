const express = require("express");
const axios = require("axios").default;
const app = express();

app.get("/", (req, res) => {
  axios
    .get("https://covid19.mathdro.id/api/countries/Indonesia")
    .then((response) => {
      // console.log(response);
      res.send(
        `<h1>Pasien Terkonfirmasi api axios : ${response.data.confirmed.value} </h1>`
      );
    });
});

app.listen(3000, () => console.log("server berjalan pada port 3000."));
