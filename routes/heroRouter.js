// Thise file is focused soley on routing pertaining to the heros
const path = require("path");
const express = require("express");
const fs = require("fs");

const filePath = path.join(__dirname, "../fake_db/heros.json");
// use express to create an app router
const router = express.Router();

//We're going to handle all the various endpoints and their corresponding responses here
router.get("/", (req, res) => {
    console.log("hero GET: sending JSON file");
    res.sendFile(filePath);
});

router.post("/newHero", (req, res) => {
    const {body} = req;
    console.log(body);

    // Open  and read the file
    // add the new hero to the file
    // we will need access to the file path
    const rawData = fs.readFileSync(filePath, "utf-8");
    const heroData = JSON.parse(rawData);
    heroData.push(body);

    fs.writeFileSync(filePath, JSON.stringify(heroData));
    console.log(heroData);
    res.end("received");
});

router.put("/updateHero", (req, res) => {
    const {body} = req;

    const rawData = fs.readFileSync(filePath, "utf-8");
    const heroData = JSON.parse(rawData);

    const heroID = body.id;

    const updateHerosData = heroData.map((hero) => {
        if(hero.id === heroID){
            return body;
        }
        return hero;
    });

    fs.writeFileSync(filePath, JSON.stringify(updateHerosData));

    res.end("updated");
    });

router.delete("/removeHero/:id", (req, res) => {
    
    const { id } = req.params;
    
    const rawData = fs.readFileSync(filePath, "utf-8");
    const heroData = JSON.parse(rawData);

    const filteredHeros = heroData.filter((hero) => {
        return hero.id !== id;
    });

    fs.writeFileSync(filePath, JSON.stringify(filteredHeros));

    res.end("deleted")
});

// Dont forget to export the router
module.exports = router;