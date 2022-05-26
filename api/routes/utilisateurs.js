const express = require("express");
let router = express.Router();
const database = require("../mySqlDb");
const domain = require("./domain");
const passport = require('passport');
const bcrypt = require ('bcrypt');
const permission = require("../authentication/permission");

router.get("/quiz", /*permission.checkAuthentification,*/ (req, res) =>{
    database.query(`
        call resultats_utilisateurs(?, ?) `,[domain, /*req.user.idUtilisateur*/1 ], (err, rows) =>{
        if (! err){
            rows.forEach(element => {
                if (element.constructor == Array) {
                    res.send(element); 
                }
            });

        }else{
            res.send("An error occured");
            console.log(err);
        }
    })
})

router.get("/cours", /*permission.checkAuthentification,*/ (req, res) =>{
    database.query(`
        call cours_utilisateurs(?, ?)`,[domain, /*req.user.idUtilisateur*/1], (err, rows) => {

        if (! err){
            rows.forEach(element => {
                if (element.constructor == Array) {
                    res.send(element); 
                }
            });

        }else{
            res.send("An error occured");
            console.log(err);
        }
    })
})

router.get("/demande", /*permission.checkAuthentification,*/ (req, res) =>{
    database.query(`
    CALL liste_demande_cours(?, ?)`,[domain, /*req.user.idUtilisateur*/], (err, rows) =>{
        if (! err){
            rows.forEach(element => {
                if (element.constructor == Array) {
                    res.send(element);
                }
            });

        } else{
            res.send("An error occured");
            res.status(500);
            console.log(err);
        }
    } )
})

router.post("/demande", /*permission.checkAuthentification,*/ (req, res) =>{
    database.query(`
    CALL confirmation_inscription(?, ?, ?)`,[req.query.idUtilisateur, req.query.idCours, /*req.user.idUtilisateur*/1], (err, rows) =>{
        if (! err){
            if (rows.constructor == Array){
                rows.forEach(element => {
                    if (element.constructor == Array) {

                        if(element[0].Erreur1){ //si utilsateur existe pas ou a pas fait de demande
                            res.status(404);
                        }
                        if(element[0].Erreur1){ //si utilsateur n'a pas les perm
                            res.status(403);
                        }

                        res.send(element); 
                    }
                });


            }else{
                res.status(201);
                res.send();
            }   

        }else{
            res.send("An error occured");
            res.status(500);
            console.log(err);
        }
    } )
})


router.get('/inscription',permission.checkNotAuthentification, (req, res) =>{
    res.send([{ title: 'INSCRIPTION' }]);
});

router.post('/inscription',permission.checkNotAuthentification, async (req, res) =>{
    try {
        const hashedPassword = await bcrypt.hash(req.body.motDePasse, 10);
        database.query(
            `CALL ajoutUtilisateur(?,?,?,?,?,?)`, [req.body.nom, req.body.prenom, req.body.groupe, req.body.classe, req.body.email, hashedPassword], 
            (err, rows) => {

                if (!err){
                    res.status(201);
                    
                }else {
                    res.send('An error occured');
                    console.log(err);
                }
                })

    } catch (err){
        res.redirect('/utilisateurs/inscription');
        console.log(err);
    }
});

router.get('/connexion', permission.checkNotAuthentification, (req, res) => {
    res.send([{ title: 'CONNEXION' }]);

});

router.post('/connexion', passport.authenticate('local',{
    successRedirect: '/',
    failureRedirect: '/utilisateurs/connexion',
    failureFlash : true
}));

router.delete('/deconnexion', permission.checkAuthentification, (req, res) =>{
    //Pour que ça marche le formulaire doir => action="deconnexion?_method=DELETE"
    req.logOut();
    res.redirect('/utilisateurs/connexion');
})



module.exports = router;
