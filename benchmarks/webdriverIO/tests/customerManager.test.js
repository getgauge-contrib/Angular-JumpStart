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
        await (await $('input[name="email"]')).waitForExist();
        await (await $('input[name="email"]')).setValue('admin@customermanager.com');
        await (await $('input[name="password"]')).setValue('password1234');
        await (await $('button[type="submit"]')).click();
        assert.equal(await (await $('body > cm-app-component > main > cm-navbar > nav > div > div > span > ul > li:nth-child(4) > a')).getText(),'Logout');
    });

    it('should filter customers', async () => {
        await (await $('input[name="filter"]')).setValue('ted');
        await browser.keys("\uE007");
        assert.equal((await $$('.card')).length,1); 
    });

    it('should let adding customer', async () => {
        await (await $('a[href="/customers/0/edit"]')).click();
        await (await $('input[name="firstName"]')).waitForExist();
        await (await $('input[name="firstName"]')).setValue('first name');
        await (await $('input[name="lastName"]')).setValue('last name');
        await (await $('input[name="address"]')).setValue('address');
        await (await $('input[name="city"]')).setValue('city');
        await (await $('select[name="state"]')).selectByIndex(0);
        await browser.execute('window.scrollBy(0,500)');
        await (await $('button[type="submit"]')).click();
        await (await $('cm-pagination li:nth-child(4) a')).waitForExist();
        await browser.execute('window.scrollBy(0,500)');
        await (await $('cm-pagination li:nth-child(4) a')).click();
        let cards = await $$('.card .card-header .white');
        let matchFound = false;
        for(const card of cards){
            if ((await card.getText()) === 'First name Last name')matchFound = true;
        };
        assert.ok(matchFound);
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