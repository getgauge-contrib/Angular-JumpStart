const { describe, it, after, before } = require('mocha');
const webPage = require('../utils/driverActions');
const assert = require('assert');


describe ('Google search automated testing', async function () {
    let webpage, driver;

    before(async () => {
        webpage = new webPage();
        driver = webpage.driver;
        await webpage.visit('http://127.0.0.1:8080/');
    });

    after(async () => {
        await webpage.quit();
    });

    it('should have the right title', async () => {
        const title = await driver.getTitle();
        assert.equal(title, 'GroceryWorks');
    });

    it('should add beans to order', async () => {
        const items = ['Flax Seeds','French Green Lentils', 'Green Split Peas','Lentils','Pinto Beans','White Navy Beans','Yellow Split Peas']
        for(const index in items){
            const itemElem = await webpage.findByCss(`img[alt='${items[index]}']`);
            itemElem.click();
        };
        const total = await webpage.findByCss('.cart-total');
        assert.equal(await total.getText(),'$5.13');
    });
});
