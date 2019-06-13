const {Builder, By} = require('selenium-webdriver');

const chrome = require('selenium-webdriver/chrome');
let o = new chrome.Options();
o.addArguments('headless');

const webPage = function() {
    this.driver = new Builder()
        .setChromeOptions(o)
        .forBrowser('chrome')
        .build();

    // visit a webpage
    this.visit = async function(theUrl) {
        return await this.driver.get(theUrl);
    };

    // quit current session
    this.quit = async function() {
        return await this.driver.quit();
    };

    // find a specific element with it's css
    this.findByCss = async function(css) {
        return await this.driver.findElement(By.css(css));
    };

};

module.exports = webPage;