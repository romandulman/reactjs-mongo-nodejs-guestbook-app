# Guestbook App 
Gusetbook App - Mongo DB + Node.JS Backend and React.JS frontend 
## in dvelopment...

#### You need to execute in the MongoDB Docker container commands to add a database and collection for the first time:

Execute shell in our Mongo container
```
docker exec -i -t <your container name or ID> bash
```

Execute MongoDB shell
```
mongo
```

Create new DB "testdb"
```
use testdb
```

List all db to check if 'testdb' db is created
```
show dbs
```

Create new Collection "testcoll" and insert some data
```
db.createCollection("testcoll")

db.testcoll.insertMany( [
      { Name: "Aron", Body: "Aron was here" },
      { Name: "Sami", Body: "Sami was here" },
      { Name: "Benny", Body: "Benny was here"}
   ] );
```

Test the new collection
```
db.collection.find( { Name: "Aron" } )
```
