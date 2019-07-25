const chrome = require('selenium-webdriver/chrome');
const firefox = require('selenium-webdriver/firefox');
const keys = require('../../guestbook-backend/config/keys');
const url = require('./urls');
const {Builder, By, Key, until} = require('selenium-webdriver');


let driver = new Builder()
    .forBrowser('firefox')
    .usingServer(url.QATestServer.seleniumGridHub) /// Selenium grid server ip/domain
    .build();

describe('Login', () => {
    it('Should Login and go to Profile page',  (done) => {
        driver
          //.get(url.appTestServer.appContainerInstance) // Application Staging/Test server
            .get(url.appTestServer.appContainerInstanceLocal) // local machine without whole CD/CI
            .then(_ => driver.findElement(By.xpath('//*[@id="responsive-navbar-nav"]/div[4]/a')).click()) // Click to show login modal
            .then(_ => driver.findElement(By.xpath('/html/body/div[3]/div/div/div[2]/form/div[1]/input')).sendKeys(keys.testLogin.username)) // send username to the username input field
            .then(_ => driver.findElement(By.xpath('/html/body/div[3]/div/div/div[2]/form/div[2]/input')).sendKeys(keys.testLogin.password)) // send password to the password input field
            .then(_ => driver.findElement(By.xpath('/html/body/div[3]/div/div/div[3]/button[2]')).click()) // click login
            // User Loggeg in
            .then(_ => driver.wait(until.elementLocated(By.xpath('//*[@id="responsive-navbar-nav"]/div[3]/a/a')), 3000)) // wait until the profile link is appears
            .then(_ => driver.findElement(By.xpath('//*[@id="responsive-navbar-nav"]/div[3]/a/a')).click()) // click on the profile link
            .then(_ => done())
    })
});

describe('Add New Guest', () => {
    it('Should add new guest without taking web-cam shot', (done) => {
        driver
          //.get(url.appTestServer.appContainerInstance) // Application Staging/Test server
            .get(url.appTestServer.appContainerInstanceLocal) // local machine without whole CD/CI
            .then(_ => driver.findElement(By.xpath('//*[@id="responsive-navbar-nav"]/div[1]/a[2]')).click()) // click to show add new guest modal,
            .then(_ => driver.findElement(By.xpath('/html/body/div[3]/div/div/div[2]/form/div[1]/input')).sendKeys("Joe Dow")) // send guest name to input field
            .then(_ => driver.findElement(By.xpath('/html/body/div[3]/div/div/div[2]/form/div[2]/textarea')).sendKeys("Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut ")) // send password to the password input field
            .then(_ => driver.findElement(By.xpath('/html/body/div[3]/div/div/div[3]/button[2]')).click()) // click add guest
            .then(_ => done())
    })
});
