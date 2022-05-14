-- ----------------- Procédure d'ajout d'un utilisateur --------------------------

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

-- ----------------- Procédure d'ajout d'une question --------------------------

DROP procedure IF EXISTS `ajoutQuestion`;

DELIMITER $$
USE `educdb_v2`$$
CREATE PROCEDURE `ajoutQuestion` (
IN _titreQuestion varchar(45),
IN _enonce varchar(300),
IN _estQCM tinyint,
IN _points float,
IN _idQuiz int
)
-- NO RESULT SET
BEGIN
	
    -- Création d'un nouveau quiz
	insert into quiz (titre, enonce, estQCM, points, idQuiz)
    values (_titreQuestion, _enonce, _estQCM, _points, _idQuiz);
    
END$$

DELIMITER ;

-- ----------------- Procédure d'ajout d'une réponse --------------------------

DROP procedure IF EXISTS `ajoutReponse`;

DELIMITER $$
USE `educdb_v2`$$
CREATE PROCEDURE `ajoutReponse` (
IN _texteReponse varchar(300),
IN _estCorrect tinyint,
IN _idQuestion int
)
-- NO RESULT SET
BEGIN
	
    -- Création d'un nouveau quiz, problème avec la colonne nommée "description"
	insert into quiz (texteReponse, estCorrect, idQuestions)
    values (_texteReponse, _estCorrect, _idQuestion);
    
END$$

DELIMITER ;

-- ----------------- Procédure d'ajout d'un quiz --------------------------

DROP procedure IF EXISTS `ajoutQuiz`;

DELIMITER $$
USE `educdb_v2`$$
CREATE PROCEDURE `ajoutQuiz` (
IN _titre varchar(45),
IN _description varchar(300),
IN _estVisible tinyint,
IN _idCours int
-- IN _titreQuestion varchar(45),
-- IN _enonce varchar(300),
-- IN _estQCM tinyint,
-- IN _points float,
-- IN _texteReponse varchar(300),
-- IN _estCorrect tinyint
)
-- NO RESULT SET
BEGIN
	-- DECLARE idQuiz int ;
	-- DECLARE idQuestion int ;

    -- Création d'un nouveau quiz, problème avec la colonne nommée "description"
	insert into quiz (titre, description, estVisible, idCours)
    values (_titre, _description, _estVisible, _idCours);

    -- SET idQuiz = (SELECT distinct max(idQuiz) FROM educdb_v2.quiz);

    -- CALL ajoutQuestion(_titreQuestion, _enonce, _estQCM, _points, idQuiz);

    -- SET idQuestion = (SELECT distinct max(idQuestions) FROM educdb_v2.questions);

    -- CALL ajoutReponse(_texteReponse, _estCorrect, idQuestion);

    -- Normalement ne pose pas de problème lorsqu'on va SELECT idQuiz et idQuestion. On va chercher la plus grande valeur et comme celle-ci
    -- est autoincrement on devrait prendre l'id du quiz/la question qu'on vient de créer.
    -- Il se pourrait que la prof crée deux quiz presque parfaitement n même temps -> ALORS PROBLEME !
    
END$$

DELIMITER ;


-- ============================================= COURS =============================================

-- ----------------------------------------- endpoint /cours ---------------------------------------
DROP procedure IF EXISTS `liste_cours`;
;

DELIMITER $$
USE `educdb_v2`$$
CREATE PROCEDURE `liste_cours`(
IN _domaine varchar(45)
)
BEGIN

	select cours.nom, DATE_FORMAT(cours.dateCreation, '%Y-%m-%d') as dateCreation, CONCAT(utilisateurs.nom,' ',utilisateurs.prenom) as responsable, concat( _domaine, 'cours/',urlencode(cours.nom)) as url, concat( _domaine, 'cours/',urlencode(cours.nom), '/inscription') as inscription   from cours
	inner join utilisateurs on cours.responsable = utilisateurs.idUtilisateur; 
    
END$$

DELIMITER ;

-- --------------------------------------- endpoint /cours/{cours} -----------------------------------
DROP procedure IF EXISTS `educdb_v2`.`data_cours`;
;

DELIMITER $$
USE `educdb_v2`$$
CREATE PROCEDURE `data_cours`(
IN _domaine varchar(45),
IN _nom_cours varchar(45),
IN _idUtilisateur int
)
BEGIN
	declare acces tinyint default null;
    
	select accepte into acces from acces_cours
	join cours on cours.idCours = acces_cours.idCours
	where idUtilisateur = _idUtilisateur and nom = _nom_cours;

	if acces = 1 then
		select cours.nom, DATE_FORMAT(cours.dateCreation, '%Y-%m-%d') as dateCreation, CONCAT(utilisateurs.nom,' ',utilisateurs.prenom) as responsable, concat(_domaine, 'cours/',urlencode(cours.nom),'/quiz') as quiz from cours
		inner join utilisateurs on cours.responsable = utilisateurs.idUtilisateur
		where cours.nom = _nom_cours;
        
	else
		select "Vous n'avez pas accès au cours ou il n'existe pas" as Erreur;
        
	end if;
END$$

DELIMITER ;
;



-- ---------------------------------------- endpoint /quiz/{cours} ------------------------------------
DROP procedure IF EXISTS `educdb_v2`.`liste_quiz`;
;

DELIMITER $$
CREATE PROCEDURE `liste_quiz`(
IN _domaine varchar(45),
IN _nom_cours varchar(45), 
IN _idUtilisateur int
)
BEGIN
	declare acces tinyint default null;
    
	select accepte into acces from acces_cours
	join cours on cours.idCours = acces_cours.idCours
	where idUtilisateur = _idUtilisateur and nom = _nom_cours;

	if acces = 1 then
    
		select quiz.idQuiz, quiz.titre, quiz.description, quiz.estVisible as disponnible, concat(_domaine, 'quiz/', quiz.idQuiz) as toQuiz, chapitre.idChapitre, chapitre.titreChapitre, chapitre.estVisible as chapEstVisible from quiz
		inner join chapitre on chapitre.idChapitre = quiz.idChapitre
		inner join cours on cours.idCours = chapitre.idCours
		where cours.nom = _nom_cours
		order by idChapitre;

    else
		select "Vous n'avez pas accès au cours ou il n'existe pas" as Erreur;
        
	end if;

END$$

DELIMITER ;
;

-- ----------------------------------------- endpoint /quiz/{id_quiz} ----------------------------------
DROP procedure IF EXISTS `data_quiz`;

DELIMITER $$
CREATE PROCEDURE `data_quiz`(
IN _idQuiz int,
IN _idUtilisateur int
)
BEGIN
	declare acces tinyint default null;
    
	select accepte into acces from acces_cours
	inner join cours on cours.idCours = acces_cours.idCours
    inner join chapitre on chapitre.idCours = cours.idCours
    inner join quiz on quiz.idChapitre = chapitre.idChapitre
	where idUtilisateur = _idUtilisateur and idQuiz = _idQuiz;

	if acces = 1 then
    
		select quiz.titre, quiz.description, quiz.estVisible, concat('[', group_concat('{', '"titreQuestion":"', QQ.titre, '",', '"enonce":"', QQ.enonce, '",', '"estQCM":"', QQ.estQCM, '",', '"points":', QQ.points, ',', '"reponses":',
	        (select concat('[',group_concat('{','"texteReponse":"',reponses.texteResponse,'",', '"estCorrecte":',reponses.estCorrecte, '}'), ']' ) from questions QR
	        inner join reponses on reponses.idQuestions = QR.idQuestions
	        where QR.idQuestions = QQ.idQuestions
	        group by QR.enonce),
        "}"   ), ']') as questions from quiz 
        left join questions as QQ on QQ.idQuiz = quiz.idQuiz
        inner join chapitre on chapitre.idChapitre = quiz.idChapitre
        inner join cours on cours.idCours = chapitre.idCours
        where quiz.idQUIZ = _idQuiz
        group by quiz.idQuiz;
        
        
	else
		select "Vous n'avez pas accès à ce quiz" as Erreur1;
        
	end if;
END

DELIMITER ;

-- -------------------------------- endpoint /utilisateurs/{utilisateur_id}/quiz -----------------------------
DROP procedure IF EXISTS `resultats_utilisateurs`;

DELIMITER $$
CREATE  PROCEDURE `resultats_utilisateurs`(
IN _domaine varchar(45),
IN _idUtilisateur INT
)
BEGIN
	declare status varchar(45) default null;
    select statut into status from utilisateurs
    where idUtilisateur = _idUtilisateur;
    
    if status = 'prof' then
		select concat(utilisateurs.nom, ' ', utilisateurs.prenom) as utilisateur, titre, resultat, total, concat(_domaine, 'quiz/', quiz.idQuiz) as quiz from scores
		join quiz on quiz.idQuiz = scores.idQuizs
		join utilisateurs on utilisateurs.idUtilisateur = scores.idUtilisateurs;
        
    else
		select titre, resultat, total, concat(_domaine, 'quiz/', quiz.idQuiz) as quiz from scores
		join quiz on quiz.idQuiz = scores.idQuizs
		where scores.idUtilisateurs = _idUtilisateur;

	end if;
END$$

DELIMITER ;

-- ---------------------------------- endpoint /utilisateurs/{utilisateur_id}/cours --------------------------
DROP procedure IF EXISTS `cours_utilisateurs`;

DELIMITER $$
USE `educdb_v2`$$
CREATE PROCEDURE `cours_utilisateurs` (
IN _domaine varchar(45),
IN _idUtilisateurs INT
)
BEGIN

	select cours.nom, concat(_domaine, 'cours/',urlencode(cours.nom)) as url from acces_cours
    join cours on cours.idCours = acces_cours.idCours
    join utilisateurs on utilisateurs.idUtilisateur = acces_cours.idUtilisateur
    where utilisateurs.idUtilisateur = _idUtilisateurs;
    
END$$

DELIMITER ;

-- --------------------------------------------- endpoint /cours/utilisateurs --------------------------------
DROP procedure IF EXISTS `liste_demande_cours`;
;

DELIMITER $$
USE `educdb_v2`$$
CREATE PROCEDURE `liste_demande_cours`(
IN _domaine varchar(45),
IN _responsable int
)
BEGIN
	select concat(utilisateurs.nom, ' ', utilisateurs.prenom) as utilisateur, groupe, classe, cours.nom as cours, date_demande, concat(_domaine, 'cours/utilisateurs/demande?idUtilisateur=',utilisateurs.idUtilisateur, '&idCours=', cours.idCours) as confirmation from acces_cours
	join utilisateurs on utilisateurs.idUtilisateur = acces_cours.idUtilisateur
	join cours on cours.idCours = acces_cours.idCours
	where accepte = 0 and responsable = _responsable;
END$$

DELIMITER ;
;

-- ----------------------------------------- endpoint /cours/utilisateurs?idUtilisateur= -------------------------
DROP procedure IF EXISTS `confirmation_inscription`;

DELIMITER $$
USE `educdb_v2`$$
CREATE PROCEDURE `confirmation_inscription` (
IN _idUtilisateur int,
IN _idCours int,
IN _responsable int
)
BEGIN	
	declare isUtilisateur int default null;
    declare isResponsable int default null;
    
    select idUtilisateur into isUtilisateur from acces_cours
    where idUtilisateur = _idUtilisateur and acces_cours.idCours = _idCours;
    
    select responsable into isResponsable from cours
    inner join acces_cours on acces_cours.idCours = cours.idCours
    where acces_cours.idUtilisateur = _idUtilisateur and acces_cours.idCours = _idCours; 
    
    if isUtilisateur is null then 
		select "L'utilisateur n'existe pas ou n'a pas fait de demande" as Erreur1;
        
    elseif isResponsable is null or isResponsable <> _responsable then
		select "Vous ne disposez pas des permissions nécessaire" as Erreur2;
	else
		update acces_cours
		set accepte = 1
		where idUtilisateur = _idUtilisateur and idCours = _idCours;
        
	end if;
END$$

DELIMITER ;

-- ---------------------------------- endpoint /cours/{cours}/inscription ---------------------------------
DROP procedure IF EXISTS `demande_cours`;


DELIMITER $$
CREATE PROCEDURE `demande_cours`(
IN _idUtilisateur int,
IN _nomCours varchar(45)
)
BEGIN
	# Gestion si utilisateur déjà existant
	declare exit handler for 1062 select "La demande a déjà été effectuée" Erreur1 ;
    declare exit handler for 1048 select "Le cours n'existe pas" Erreur2 ;
    
    
    # Nouvelle demande
    insert into acces_cours (idUtilisateur, idCours, accepte, date_demande)
    values (_idUtilisateur, (select idCours from cours where nom = _nomCours) , 0, now());

END$$

DELIMITER ;
;

-- --------------------------- enpoint /quiz/{quiz_id}
DROP procedure IF EXISTS `ajoutResultat`;

DELIMITER $$
CREATE  PROCEDURE `ajoutResultat`(
IN _idQuiz int,
IN _idUtilisateur int,
IN _resultat float,
IN _total float
)
BEGIN

	insert into scores (idUtilisateurs, idQuizs, resultat, total, date_score)
    value(_idUtilisateur, _idQuiz, _resultat, _total, now());
    
END$$

DELIMITER ;

-- --------------------------- enpoint /quiz/{cours}/creation

------ procédure d'ajout dans la table quiz    // On ne mets pas le cours ? Info donnée par le chapitre
DROP procedure IF EXISTS `ajoutQuiz`;

DELIMITER $$
CREATE  PROCEDURE `ajoutQuiz`(
IN _titre varchar(45),
IN _description varchar(300),
IN _estVisible tinyint DEFAULT 1,
IN _idChapitre int DEFAULT null
)
BEGIN

	insert into scores (idUtilisateurs, idQuizs, resultat, total, date_score)
    value(_idUtilisateur, _idQuiz, _resultat, _total, now());
    
END$$

DELIMITER ;


------ procédure d'ajout dans la table questions  // Ajout d'images ? 
DROP procedure IF EXISTS `ajoutQuestion`;

DELIMITER $$
CREATE  PROCEDURE `ajoutQuestion`(
IN _titre varchar(45),
IN _enonce varchar(300),
IN _estQCM tinyint,
IN _points float DEFAULT 1,
IN _idQuiz int
)
BEGIN

	insert into scores (idUtilisateurs, idQuizs, resultat, total, date_score)
    value(_idUtilisateur, _idQuiz, _resultat, _total, now());
    
END$$

DELIMITER ;


------ procédure d'ajout dans la table    //Ajout d'images ?
DROP procedure IF EXISTS `ajoutReponse`;

DELIMITER $$
CREATE  PROCEDURE `ajoutReponse`(
IN _texteReponse varchar(300),
IN _estCorrect tinyint,
IN _resultat float,
IN _idQuestion int
)
BEGIN

	insert into scores (idUtilisateurs, idQuizs, resultat, total, date_score)
    value(_idUtilisateur, _idQuiz, _resultat, _total, now());
    
END$$

DELIMITER ;