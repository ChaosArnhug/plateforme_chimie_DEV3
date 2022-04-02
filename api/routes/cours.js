const express = require("express");
let router = express.Router();

router.get("/", (req, res) =>{
    res.send({ title: 'COURS_LISTE' });
})

router.get("/{cours}", (req, res) =>{
    res.send({ title: 'COURS' });
})

module.exports = router;