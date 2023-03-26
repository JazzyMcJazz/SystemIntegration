CREATE TABLE Customer (
  id   int(11) NOT NULL AUTO_INCREMENT, 
  name varchar(255) NOT NULL, 
  age  int(3), 
  PRIMARY KEY (id));
CREATE TABLE Item (
  id          int(11) NOT NULL AUTO_INCREMENT, 
  name        varchar(255) NOT NULL, 
  description varchar(255), 
  PRIMARY KEY (id));
CREATE TABLE Orders (
  Customerid int(11) NOT NULL, 
  Itemid     int(11) NOT NULL, 
  PRIMARY KEY (Customerid, Itemid));
ALTER TABLE Orders ADD CONSTRAINT FKOrders800082 FOREIGN KEY (Customerid) REFERENCES Customer (id) ON DELETE CASCADE ON UPDATE CASCADE;
ALTER TABLE Orders ADD CONSTRAINT FKOrders563382 FOREIGN KEY (Itemid) REFERENCES Item (id) ON DELETE CASCADE ON UPDATE CASCADE;