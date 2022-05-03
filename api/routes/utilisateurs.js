const express = require("express");
let router = express.Router();
const database = require("../mySqlDb");
const domain = require("./domain");
const passport = require('passport');

router.get("/:utilisateur_id/quiz", (req, res) =>{
    database.query(`
        call resultats_utilisateurs(?, ?) `,[domain, req.params.utilisateur_id], (err, rows) =>{

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

router.get("/:utilisateur_id/cours", (req, res) =>{
    database.query(`
        call cours_utilisateurs(?, ?)`,[domain, req.params.utilisateur_id], (err, rows) => {

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

router.get('/inscription', (req, res) =>{
    res.send({ title: 'INSCRIPTION' });
});

router.post('/inscription', async (req, res) =>{
    try {
        const hashedPassword = await bcrypt.hash(req.body.motDePasse, 10);
        database.query(
            `CALL ajoutUtilisateur(?,?,?,?,?,?)`, [req.body.nom, req.body.prenom, req.body.groupe, req.body.classe, req.body.email, hashedPassword], 
            (err, rows) => {

                if (!err){
                    rows.forEach(element => {
                        if (element.constructor == Array) {
                            res.send(element);
                        }
                        
                    })
                    
                }else {
                    res.send('An error occured');
                    console.log(err);
                }
                })

    } catch {
        res.redirect('/utilisateurs/inscription');
    }
});

router.get('/connexion', (req, res) => {
    res.send({ title: 'CONNEXION' });

});

router.post('/connexion', passport.authenticate('local',{
    successRedirect: '/',
    failureRedirect: '/utilisateurs/connexion',
    failureFlash : true
}));

router.delete('/deconnexion', (req, res) =>{
    //Pour que ça marche le formulaire doir => action="deconnexion?_method=DELETE"
    req.logOut();
    res.redirect('/utilisateurs/connexion');
})



module.exports = router;