const assert = require('assert');

describe('test customer manager', () => {
    before(async () => {
        await browser.url('http://localhost:3000');
    });

    it('should navigate to right page', async () => {
        const pageTitle = await browser.getTitle();
        assert.equal(pageTitle, 'Angular TypeScript JumpStart App');
    });

    it('should let user login',async () => {
        (await $('body > cm-app-component > main > cm-navbar > nav > div > div > span > ul > li:nth-child(4) > a')).click();
        await browser.pause(1000);
        await (await $('input[name="email"]')).setValue('admin@customermanager.com');
        await (await $('input[name="password"]')).setValue('password1234');
        await (await $('button[type="submit"]')).click();
        assert.equal(await (await $('body > cm-app-component > main > cm-navbar > nav > div > div > span > ul > li:nth-child(4) > a')).getText(),'Logout');
    });

    xit('should filter customers', async () => {
        await write('ted',into(inputField(below('Filter:'))));
        await press('Enter');
        assert.equal((await text('View Orders').get()).length,1); 
    });

    xit('should let adding customer', async () => {
        await click('New Customer');
        await write('first name',into(textBox(below('First Name'))));
        await write('last name',into(textBox(below('Last Name'))));
        await write('address',into(textBox(below('Address'))));
        await write('city',into(textBox(below('City'))));
        await dropDown(below('State')).select('Alabama');
        await click('Insert');
        await click('3');
        assert.ok(await text('First name Last name').exists());
    });

    xit('should let edit customer', async () => {
        await click('First name Last name');
        await click('Edit customer');
        await write('updated',into(textBox(below('First Name'))));
        await click('update');
        await click('Customer Details');
        assert.ok(await text('First nameupdated Last name').exists());
    });

    xit('should let view customer order', async () => {
        await click('Customer Manager');
        await click(text('View Orders',below('Ted James')));
        assert.ok(await text('Basketball').exists());
        assert.ok(await text('Shoes').exists());
        assert.ok(await text('$207.98').exists());
    });


});