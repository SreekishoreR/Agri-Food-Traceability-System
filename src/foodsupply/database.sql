
ingredient supplier->sid
                     sname
                     mobile
                     blockchainaddress
                     privatekey
Manufacture -> mid
               Manufacturename
               mobile
               blockchainaddress
               privatekey
Distributer-> did
              dname
              mobile
              blockchainaddress
              privatekey
pharmacy->pid
          pharmacyname
          blockchainaddress
          privatekey
patient-> patientid
          patientname
          blockchainaddress
          privatekey
ingredient-> iid
             ingredientname
             status
Druglot-> drugid
          drugname
          owner
          iid

transaction-tid
            drugid
            personid
            transactiondate
            transaddress
            remark



create table users( uid int primary key,
    fname varchar(1000),
    mobile varchar(10),
    blockchainaddress text,
    privatekey text,
    role varchar(100),
    approve int);
create table   seed(seedid int primary key,
               seedname varchar(1000),
               growthtime int
               ,ownerid int);

create table  productlot( productid int primary key,
            productname varchar(1000),
            owners int(100),
            seedid int(100));
  
create table transaction(tid int primary key,
              prod_id int,
              fromid int,
              toid int,
              transactiondate date default current_timestamp,
              transaddress text,
              remark  text);        

