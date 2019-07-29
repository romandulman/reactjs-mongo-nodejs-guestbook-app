module.exports = {
  QATestServer: {
    seleniumGridHub: "http://192.168.2.12:4444/wd/hub"
  },
  appTestServer: {
    appContainerInstanceLocal: "http://192.168.1.13:3000",
    appContainerInstance: "http://192.168.2.15:8080",
    appContainerInstanceHttps: "https://192.168.2.15:8443"
  }
};
