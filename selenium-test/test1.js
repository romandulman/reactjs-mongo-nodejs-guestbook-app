const chrome = require('selenium-webdriver/chrome');
const firefox = require('selenium-webdriver/firefox');
const {Builder, By, Key, until} = require('selenium-webdriver');


let driver = new Builder()
    .forBrowser('chrome')
    .usingServer('http://192.168.2.12:4444/wd/hub') /// Selenium grid server ip/domain
    .build();
driver.get('http://192.168.1.13:3000')
    .then(_ =>
//  driver.findElement(By.name('q')).sendKeys('webdriver', Key.RETURN))
        driver.findElement(By.name('modalOk')).click())
    .then(_ => driver.findElement(By.name('add')).click(), 2000)

//   .then(_ => driver.wait(), 1000)
    .then(_ => driver.findElement(By.name("addModaldialog")).isDisplayed());
//   .then(_ => console.log('passed'))
//  .then(_ => driver.quit());
