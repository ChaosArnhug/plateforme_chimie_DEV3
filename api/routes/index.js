const express = require("express");
let router = express.Router();

router.get("/", (req, res, next) =>{
    res.send([{ title: 'INDEX' }]);
})

module.exports = router;