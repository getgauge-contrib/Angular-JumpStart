const assert = require('assert');

describe('test groceryWorks ', () => {
    before(async () => {
        await browser.url('http://127.0.0.1:8080');
    });

    it('should have the right title', async () => {
        const title = await browser.getTitle();
        assert.equal(title, 'GroceryWorks');
    });

    it('should add beans to order', async () => {
        const items = ['Flax Seeds','French Green Lentils', 'Green Split Peas','Lentils','Pinto Beans','White Navy Beans','Yellow Split Peas']
        for(const index in items){
            const itemElem = await $(`img[alt='${items[index]}']`);
            itemElem.click();
        };
        const total = await $('.cart-total');
        assert.equal(await total.getText(),'$5.13');
    });
});