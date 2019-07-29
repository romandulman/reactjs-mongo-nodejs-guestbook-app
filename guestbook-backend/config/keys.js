module.exports = {
  google: {
    clientID:
      "408762446780-bbe353b9unu99l2td3rnknn7uf367ek9.apps.googleusercontent.com",
    clientSecret: "q46anuHqmHTCARt7nQ9SIMLY"
  },

  authMongoDB: {
    dbURL: "mongodb://192.168.2.14:27017/testdb",
    useNewUrlParser: true
  },
  session: {
    cookie_key: "ssshhhh"
  },

  testLogin:{
    username: 'roman',
    password: '123456'
  },
  httpsCerts:{
    key:'./config/certs/server.key',
    cert:'./config/certs/server.cert'
  }
};
