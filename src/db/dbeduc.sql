Use educdb;

CREATE TABLE quiz_list (
quiz_id int(10) not null auto_increment,
name varchar(100), 
eval_date date,
primary key (quiz_id)
);



CREATE TABLE questions (
question_id int(10) not null auto_increment,
quiz_id int(10),
name varchar(100), 
question_txt varchar(300),
score int(3),
img varchar(100),
is_qcm bool,
primary key (question_id)
);

CREATE TABLE choice (
choice_num int(8) not null auto_increment, 
quiz_id int(10), 
question_id int(12), 
choice_text varchar (300), 
is_correct bool, 
primary key (choice_num, quiz_id, question_id)
); 


insert into quiz_list values (1, 'Quiz chap1', now()); 
insert into quiz_list values (2, 'Quiz chap2', now());
insert into quiz_list values (3, 'Quiz chap3', now());




insert into questions values (1, 1, 'Q1', 'Quelle est la formule de l\'eau', 2, null, False);
insert into questions values (2, 1, 'Q2', 'Quelle est la formule de l\'oxygène', 2, null, False);
insert into questions values (3,1, 'Q3', 'Quelle est la formule du zinc', 2, null, False);
commit; 



