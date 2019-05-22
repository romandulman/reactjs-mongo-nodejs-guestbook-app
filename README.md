# Guestbook App 
Gusetbook App - Mongo DB + Node.JS Backend and React.JS frontend 
## in dvelopment...

### you need to execute in the Docker MongoDB container commands to add dtabase and collection for the first time:
Some basic Git commands are:
```
docker exec -i -t <your container name or ID> bash

mongo

use testdb

show dbs

db.testcoll.insertMany( [
      { Name: "Aron", Body: "Aron was here" },
      { Name: "Sami", Body: "Sami was here" },
      { Name: "Benny", Body: "Benny was here"}
   ] );

db.collection.find( { Name: "Aron" } )
```
