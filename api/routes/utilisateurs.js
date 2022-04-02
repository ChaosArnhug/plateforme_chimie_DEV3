const express = require("express");
let router = express.Router();

router.get("/", (req, res) =>{
    res.send({ title: 'TENTATIVES UTILISATEURS' });
})

module.exports = router;