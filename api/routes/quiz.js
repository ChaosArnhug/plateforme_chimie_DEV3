const express = require("express");
let router = express.Router();

router.get("/", (req, res) =>{
    res.send({ title: 'QUIZ' });
})

router.get("/{quiz_id}", (req, res) =>{
    res.send({ title: 'QUIZ_ID' });
})

router.post("/{quiz_id}", (req, res) =>{
    res.send({ title: 'QUIZ_ID' });
})

router.get("/creation", (req, res) =>{
    res.send({ title: 'QUIZ_CREATION' });
})

router.post("/creation", (req, res) =>{
    res.send({ title: 'QUIZ_CREATION' });
})

module.exports = router