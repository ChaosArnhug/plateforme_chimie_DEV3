DROP procedure IF EXISTS `ajoutUtilisateur`;

DELIMITER $$
USE `educdb_v2`$$
CREATE PROCEDURE `ajoutUtilisateur` (
IN _nom varchar(45),
IN _prenom varchar(45),
IN _groupe varchar(45),
IN _classe varchar(45),
IN _email varchar (45),
IN _motDePasse varchar (60)
)
BEGIN
	
    # Gestion si utilisateur déjà existant
	declare exit handler for 1062 select "L'adresse email existe déjà" Erreur ;

    # ajout nouvel utilisateur
	insert into utilisateurs (nom, prenom, groupe, classe, email, motDePasse, statut)
    values (_nom, _prenom, _groupe, _classe, _email, _motDePasse, 'élève');
    
END$$

DELIMITER ;
