const express = require ('express');
const session = require ('express-session');

//Vérifie si l'utilisateur est connecté, si pas il est redirigé vers la page de connexion
function checkAuthentification (req, res, next){
    if (req.isAuthenticated()){
        return next();
    }

    return res.redirect('/utilisateurs/connexion');
}

//Vérifie si l'utilisateur n'est pas connecté, dans le cas contaraire, il est redirigé vers la page d'acceuil
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