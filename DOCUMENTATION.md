#Migrations 

documentation 
user
user uniq (PK) varchar
username : not null , unique varchar
Buser(bankUser) : not null varchar
bnumber : not null , unique number
BnumberUser : not null varchar
Umail : optional can null, varchar
Nhp :  not null , unique , number

event
password : not null 
is_verified : boolean 
is_favorite :  varchar(50)[]
created_at : TEXT
last_login :TEXT
updated_at :TEXT 

refferal
code_refs : varchar , pk
userid : varchar , users(id) , not null
refferal :  varchar // object array bisa mausukan username dan joindate
commisomn : desimal 2 terakhir 
transaction :  varchar 