use educdb_v2;
insert into utilisateurs values (1, 'Cuisinier', 'Estelle' , 'prof', null, null, 'cuisinier@ecole.com', '123');

insert into utilisateurs values (2, 'Einstein', 'Albert', 'elève', 'M1', '5eme', 'EA@ecole.com', '123');

insert into cours values (1, 1, 'les molécules', now());
insert into cours values (2, 1, 'l\'ADN', now());
insert into cours values (3, 1, 'les centrales nucléaires', now());

insert into quiz values (1, 'Quiz1', 'quiz du chap1', True, 1); 
insert into quiz values (2, 'Quiz1','quiz du chap2', True, 2);
insert into quiz values (3, 'Quiz1', 'quiz du chap3', False, 3);
insert into quiz values (4, 'Quiz2', 'quiz du chap3', True, 3);

insert into questions values (1, 'Q1', 'Quelle est la formule de l\'eau', False, 1, null, 1);
insert into questions values (2, 'Q2', 'Quelle est la formule de l\'oxygène', True, 1, null, 1);
insert into questions values (3, 'Q3', 'Quelle est la formule du zinc', False, 2, null, 1);
insert into questions values (4, 'Q4', 'Ces associations de molécules d\'eau voisines sont elles possibles?', True, 2, 'img/formule1.jpg', 1);


insert into reponses values (1, 'H2O', null, True, 1);

insert into reponses values (2, 'CO2', null, False, 2 );
insert into reponses values (3, 'HH', null, False, 2 );
insert into reponses values (4, 'O2', null, True, 2 );
insert into reponses values (5, 'O', null, False, 2 );

insert into reponses values (6, 'Zn', null, True, 3);

insert into reponses values (7, 'vrai', null, False, 4);
insert into reponses values (8, 'faux', null, True, 4);

insert into acces_cours values (1, 1);
insert into acces_cours values (2, 1);

insert into scores values (1, 1, 1, 15, 20, 2022-2-2);

commit; 