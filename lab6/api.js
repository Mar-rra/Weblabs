var fs = require("fs");
const express = require("express");
const router = express.Router();
const Animal = require("./animal")

let jsonbody = null;
let imgerror = null;
let backerr = null;

router.get("", (req, res)=>{
    var body = fs.readFileSync('Hello.html');
    res.writeHead(200, {"Content-Type": "text/html"});
    res.write(body);
    res.end();
});

router.get("/muggers", (req, res)=>{
    console.log(jsonbody);
    res.send(jsonbody);
});

router.post("/muggers", (req, res)=>{
    console.log(req.body);
    var name = req.body.name;
    var height = req.body.height;
    var width = req.body.width;
    var color = req.body.color;

    if (width == "")
    {
        width = Math.floor(Math.random() * 2000);
    }
    if (height == "")
    {
        height = Math.floor(Math.random() * 2000);
    }
    if (color == "")
    {
        var coloring = "abcdef0123456789";
        var color = "";
        for (var i = 0; i < 6; i++)
            color += coloring.charAt(Math.floor(Math.random() * coloring.length));
    }

    Animal.findOne({name: name})
    .then(animal => {
        if (animal != null)
        {
            Animal.findOne({width: width, height: height})
            .then(animal => {      
                if (animal != null)
                {
                    Animal.findOne({color: color})
                    .then(animal => {      
                        if (animal != null)
                        {
                            jsonbody = animal;
                            res.redirect("./muggers");
                        }
                        else
                        {
                            imgerror = {error: "Color error", name: name, width: width, height: height, color: color};
                            res.send(imgerror);
                        }
                    });
                }
                else 
                {
                    imgerror = {error: "Size error", name: name, width: width, height: height};
                    res.send(imgerror);
                }
            });
        }
        else
        {
            imgerror = {error: "Name error", name: name};
            res.send(imgerror);
        }
    });
    
});

/*router.post("/muggers", (req, res)=>{
    console.log(req.body);
    Animal.create(req.body)
    .then(animal => {
        res.send(animal)
    });
});*/

module.exports = router;