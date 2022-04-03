const express = require("express");
let router = express.Router();

router.get("/:utilisateur_id", (req, res) =>{
    res.send({ title: 'TENTATIVES UTILISATEURS' });
})

module.exports = router;