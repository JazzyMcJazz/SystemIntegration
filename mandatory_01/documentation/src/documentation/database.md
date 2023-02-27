Database Integration
=======

This documentation describes how to access and interact with the `systint` database hosted at www.jazzymcjazz.dk. 

***
### <a href="/mro">Data Definitions</a>
***

### **Database Users**

**User**<br>
-u: <input type="text" disabled value="systint_user"><br>
-p: <input type="password" disabled value="ez4ence">

**Admin**<br>
-u: <input type="text" disabled value="systint_admin"><br>
-p: <input type="password" disabled value="ez4astralis">

***

### **Access**

**mariadb-client**
```shell
mariadb -h jazzymcjazz.dk -u <username> -p<password>
```

**mysql-client**
```shell
mysql -h jazzymcjazz.dk -u <username> -p<password>
```

**NOTE:** There is no space between `-p` and the password. You can also omit the password (`-p` is still required) and you will be prompted for it instead.

***

### **Queries**

**Select customers** (admin)
```sql
SELECT * FROM Customer;
```

**Select items**
```sql
SELECT * FROM Item;
```

**Select orders**
```sql
SELECT * FROM Orders;
```

**Insert customer** (admin)
```sql
INSERT INTO Customer (name, age) VALUES (<name>, <age>);
```

**Insert item**
```sql
INSERT INTO Item (name, description) VALUES (<name>, <description>);
```

**Insert order** (admin)
```sql
INSERT INTO Orders (CustomerId, ItemId) VALUE (<CustomerId>, <ItemId>);
```

**Select  orders with customer and item information** (admin)
```sql
SELECT * FROM Customer JOIN (Orders JOIN Item ON Orders.ItemId=Item.id) ON Orders.CustomerId=Customer.id;
```
