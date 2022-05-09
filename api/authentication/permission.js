const express = require ('express');
const session = require ('express-session');
const passport = require('passport'); 

//Redirige si user pas connecté
function checkAuthentification (req, res, next){
    if (req.isAuthenticated()){
        return next();
    }

    return res.redirect('/utilisateurs/connexion');
}

//Redirige si user déjà connecté
function checkNotAuthentification (req, res, next){
    if (req.isAuthenticated()){
        return res.redirect('/');
    }
    return next();
    
}


module.exports = {
    checkAuthentification,
    checkNotAuthentification
}