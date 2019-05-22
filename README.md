# Guestbook App 
Gusetbook App - Mongo DB + Node.JS Backend and React.JS frontend 
## in dvelopment...

#### You need to execute in the MongoDB Docker container commands to add a database and collection for the first time:
Some basic Git commands are:
```
docker exec -i -t <your container name or ID> bash

mongo

use testdb

show dbs

db.createCollection("testcoll")

db.testcoll.insertMany( [
      { Name: "Aron", Body: "Aron was here" },
      { Name: "Sami", Body: "Sami was here" },
      { Name: "Benny", Body: "Benny was here"}
   ] );
```

Find one object for testing the new collection
```
db.collection.find( { Name: "Aron" } )
```
