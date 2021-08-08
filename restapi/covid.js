const express = require("express");

const app = express();

const request = require("request");

app.get("/", (req, res) => {
  const options = {
    method: "GET",
    url: "https://covid19.mathdro.id/api/countries/Indonesia",
  };
  request(options, function (error, response, body) {
    if (error) throw new Error(error);

    var obj = JSON.parse(body);
    res.send(`<h1>Pasien Terkonfirmasi : ${obj.confirmed.value}</h1>`);
  });
});

app.listen(3000, () => console.log("server berjalan pada port 3000."));
