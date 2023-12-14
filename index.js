// IMPORT express so we can use it

const express = require("express");
const path = require("path");
const heroRouter = require("./routes/heroRouter");


const server = express();
const PORT = 3000;

const namesPath = path.join(__dirname, "names.json");

server.use(express.json());
server.use("/hero", heroRouter);

server.get("/", (req, res) => {
    console.log("base path GET: sending JSON file");
    res.sendFile(namesPath);
});

server.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});