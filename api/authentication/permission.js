const express = require ('express');
const session = require ('express-session');
const passport = require('passport'); 

//Redirige si user pas connecté
function checkAuthentification (req, res, next){
    if (req.isAuthenticated()){
        return next();
    }

    return res.redirect('/connexion');
}

//Redirige si user déjà connecté
function checkNotAuthentification (req, res, next){
    if (req.isAuthenticated()){
        return res.redirect('/');
    }
    return next();
    
}

//Erreur si utilisateur a pas accès à la ressource
function checkStatut(req, res, next, statut){
    if (req.body.statut === statut){
        return next();
    }
    return res.statut(403);
}