# Guestbook Web App
### In development progress...

Gusetbook App - Mongo DB + Node.JS Backend and React.JS frontend, Docker and Jenkins CD/CI pipeline

#### This Example project implements:

- Node.JS as backend with express, rest api and Mongoose
- React.JS & Redux as frontend 
- Unit tests both in frontend & backend (Mocha, Chai, Chai-HTTP, Jest)
- Load & Performance tests
- Selenium UI tests with Node.JS
- Static Code Analysis with SonarQube
- jenkins CD/CI pipeline
- Build Docker image from Docker file and deploy whole env with Docker Compose
- Publish artifacts to SonaType Nexus OSS

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



Create new Collection "testcoll" and insert some data
```
db.createCollection("testcoll")

db.testcoll.insertMany( [
      { Name: "Aron", Body: "Aron was here" },
      { Name: "Sami", Body: "Sami was here" },
      { Name: "Benny", Body: "Benny was here"}
   ] );
```

List all db to check if 'testdb' db is created
```
show dbs
```

Test the new collection
```
db.testcoll.find( { Name: "Aron" } )
```
