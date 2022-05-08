use educdb_v2;

-- -----------------------------------------------------
-- Insert utilisateurs
-- -----------------------------------------------------

insert into utilisateurs values (1, 'cuisinier', 'estelle' , 'prof', null, null, 'cuisinier@ecole.com', '$2a$10$k4VFjOVuscrWloGsMGxkreyyWx8oAguKB49WCM8FI0qzotvOCcoYu');
insert into utilisateurs values (2, 'einstein', 'albert', 'elève', 'M1', '5eme', 'EA@ecole.com', '$2a$10$k4VFjOVuscrWloGsMGxkreyyWx8oAguKB49WCM8FI0qzotvOCcoYu');
insert into utilisateurs values (3, 'meunier', 'arnaud', 'elève', 'M1', '5eme', 'a.meunier@gmail.com', '$2a$10$k4VFjOVuscrWloGsMGxkreyyWx8oAguKB49WCM8FI0qzotvOCcoYu');
insert into utilisateurs values (4, 'jean', 'paul', 'attente', 'M1', '5eme', 'j.paul@gmail.com', '$2a$10$k4VFjOVuscrWloGsMGxkreyyWx8oAguKB49WCM8FI0qzotvOCcoYu');
insert into utilisateurs values (5, 'tutu', 'totot', 'attente', null , null, 't.toto@ecole.com', '$2a$10$k4VFjOVuscrWloGsMGxkreyyWx8oAguKB49WCM8FI0qzotvOCcoYu');

-- -----------------------------------------------------
-- Insert cours
-- -----------------------------------------------------

insert into cours values (1, 1, 'Chimie 5ième', now());
insert into cours values (2, 1, 'Chimie 6ième', now());
insert into cours values (3, 1, 'Prépa médecine', now());

-- -----------------------------------------------------
-- Insert acces_cours
-- -----------------------------------------------------

insert into acces_cours values (1, 1, true, now());
insert into acces_cours values (1, 2, true, now());
insert into acces_cours values (1, 3, true, now());
insert into acces_cours values (2, 1, true, now());
insert into acces_cours values (3, 2, true, now());
insert into acces_cours values (3, 3, false, now());
insert into acces_cours values (4, 1, false, now());
insert into acces_cours values (5, 2, false, now());
insert into acces_cours values (5, 3, false, now());

-- -----------------------------------------------------
-- Insert chapitre
-- -----------------------------------------------------

insert into chapitre values (1, 'chapitre 1', true, 1);
insert into chapitre values (2, 'chapitre 2', true, 1);
insert into chapitre values (3, 'chapitre 1', true, 2);
insert into chapitre values (4, 'chapitre 2', true, 2);
insert into chapitre values (5, 'chapitre 3', false, 2);
insert into chapitre values (6, 'chapitre 1', false, 3);
insert into chapitre values (7, 'chapitre 2', false, 3);

-- -----------------------------------------------------
-- Insert quiz
-- -----------------------------------------------------

insert into quiz values(1, 'Quiz 1', 'Quiz du chapitre 1', true, 1);
insert into quiz values(2, 'Quiz 1', 'Quiz du chapitre 2', false, 2);
insert into quiz values(3, 'Quiz bonus', 'Quiz de préparation bonus', true, 3);
insert into quiz values(4, 'Quiz', 'Quiz de mise au point', true, 6);

-- -----------------------------------------------------
-- Insert questions
-- -----------------------------------------------------

insert into questions values (1, 'Q1', "Quelle est la formule de l'eau ?", False, 1, null, 1);
insert into questions values (2, 'Q2', "Quelle est la formule de l'oxygène ?", True, 1, null, 1);
insert into questions values (3, 'Q3', 'Quelle est la formule du zinc ?', False, 2, null, 1);
insert into questions values (4, 'Q4', "Ces associations de molécules d'eau voisines sont elles possibles ?", True, 2, 'img/formule1.jpg', 1);

-- -----------------------------------------------------
-- Insert reponses
-- -----------------------------------------------------

insert into reponses values (1, 'H2O', null, True, 1);
insert into reponses values (2, 'CO2', null, False, 2 );
insert into reponses values (3, 'HH', null, False, 2 );
insert into reponses values (4, 'O2', null, True, 2 );
insert into reponses values (5, 'O', null, False, 2 );
insert into reponses values (6, 'Zn', null, True, 3);
insert into reponses values (7, 'vrai', null, False, 4);
insert into reponses values (8, 'faux', null, True, 4);

-- -----------------------------------------------------
-- Insert scores
-- -----------------------------------------------------

insert into scores values (1, 1, 1, 4, 4, now());
insert into scores values (2, 3, 1, 1, 4, now());
insert into scores values (3, 3, 1, 3, 4, now());

commit; 