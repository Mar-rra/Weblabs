const express = require("express");
var fs = require("fs");
const Gazel = require("./gazel");
const Gekkon = require("./gekkon");
const Giena = require("./giena");
const router = express.Router();

var navivod;

router.get("/", (req, res) => {
  console.log("GET /");
  var body = fs.readFileSync('six.html');
  res.writeHead(200, {
    "Content-Type": "text/html"
  });
  res.write(body);
  res.end();
});

router.post("/gazel", async (req, res) => {
  var result = req.body;
  console.log(result);
  var acjson = JSON.parse(result);
  if (acjson.value == null) {
    acjson.value = Math.floor(Math.random() * 9 + 1);
    console.log(acjson.value);
  }
  const data = await Gazel.find({
    value: acjson.value
  }).exec();
  console.log(data[0].color);

  navivod = proverka("gazel", acjson, data[0]);
  console.log("POST /gazel")
  res.redirect("/gazel")
})

router.get("/gazel", async (req, res) => {
  console.log(req.body);
  res.json(navivod);
  console.log("GET /gazel")
  navivod = "";
})

router.post("/gekkon", async (req, res) => {
  var result = req.body;
  console.log(result);
  var acjson = JSON.parse(result);
  if (acjson.value == null) {
    acjson.value = Math.floor(Math.random() * 9 + 1);
    console.log(acjson.value);
  }
  const data = await Gekkon.find({
    value: acjson.value
  }).exec();
  console.log(data[0].color);

  navivod = proverka("gekkon", acjson, data[0]);
  res.redirect("/gekkon");
  console.log("POST /gekkon");
})

router.get("/gekkon", (req, res) => {
  console.log(req.body);
  console.log(navivod);
  res.json(navivod);
  console.log("GET /gekkon");
  navivod = "";
})

router.post("/giena", async (req, res) => {
  var result = req.body;
  console.log(result);
  var acjson = JSON.parse(result);
  if (acjson.value == null) {
    acjson.value = Math.floor(Math.random() * 9 + 1);
    console.log(acjson.value);
  }
  const data = await Giena.find({
    value: acjson.value
  }).exec();
  console.log(data[0].color);

  navivod = proverka("giena", acjson, data[0]);
  res.redirect("/giena");
  console.log("POST /giena");
})

router.get("/giena", (req, res) => {
  console.log(req.body);
  console.log(navivod);
  res.json(navivod);
  console.log("GET /giena");
    navivod = "";
})


function proverka(animal, acjson, data) {
  if (acjson.width == null & acjson.height == null) {
    acjson.width = data.width;
    acjson.height = data.height;
    if (acjson.color == null) {
      acjson.color = data.color;
    }
  }
  if (acjson.width == null) {
    acjson.width = Math.floor(Math.random() * 3000);
  }
  if (acjson.height == null) {
    acjson.height = Math.floor(Math.random() * 3000);
  }
  if (acjson.color == null) {
    var possible = "abcdefghijklmnopqrstuvwxyz0123456789";
    var text = "";
    for (var i = 0; i < 6; i++)
      text += possible.charAt(Math.floor(Math.random() * possible.length));
    acjson.color = "#" + text;
  }
  if (acjson.value == data.value & acjson.width == data.width &
    acjson.height == data.height & acjson.color == data.color) {
    console.log("Vse Norm");
  } else {
    console.log("error");
    return ["Error" ,{
      "value": acjson.value
    }, {
      "width": acjson.width
    }, {
      "height": acjson.height
    }, {
      "color": acjson.color
    }];
  }
  return [animal + "/" + acjson.value + '.jpg', {
    "value": acjson.value
  }, {
    "width": acjson.width
  }, {
    "height": acjson.height
  }, {
    "color": acjson.color
  }]
}

module.exports = router;
