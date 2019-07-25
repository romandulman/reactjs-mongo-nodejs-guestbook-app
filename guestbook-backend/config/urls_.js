module.exports = {
  QATestServer: {
    seleniumGridHub: "http://your-ip/domain:4444/wd/hub"  //should run on Zalenium
  },
  appTestServer: {
    appContainerInstanceLocal: "http://your-local-machine-ip:3000", //not mandatory, i using this for local testing before i run all CD/CI process
    appContainerInstance: "http://your-app-stating-server:8080" //  deployed within the CD/CI process
  }
};
