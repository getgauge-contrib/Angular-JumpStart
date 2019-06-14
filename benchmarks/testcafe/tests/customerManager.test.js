import { Selector } from 'testcafe';

fixture `test customer manager`
    .page `http://localhost:3000`;

test('should have the right title', async (t) => {
    await t.expect(Selector("title").innerText).eql('Angular TypeScript JumpStart App')
});

test('should let user login',async (t) => {
    await t.click(Selector('body > cm-app-component > main > cm-navbar > nav > div > div > span > ul > li:nth-child(4) > a'));
    await t.typeText(Selector('input[name="email"]'),'admin@customermanager.com');
    await t.typeText(Selector('input[name="password"]'),'password1234');
    await t.click(Selector('button[type="submit"]'));
    await t.expect(await Selector('body > cm-app-component > main > cm-navbar > nav > div > div > span > ul > li:nth-child(4) > a').innerText).eql('Logout');
});

test('should filter customers', async (t) => {
    await t.typeText(Selector('input[name="filter"]'),'ted');
    await t.pressKey('enter');
    await t.expect(await Selector('.card').count).eql(1);
});

test('should let adding customer', async (t) => {
    await t.click(Selector('a[href="/customers/0/edit"]'));
    await t.typeText(Selector('input[name="email"]'),'admin@customermanager.com');
    await t.typeText(Selector('input[name="password"]'),'password1234');
    await t.click(Selector('button[type="submit"]'));
    await t.typeText(Selector('input[name="firstName"]'),'first name');
    await t.typeText(Selector('input[name="lastName"]'),'last name');
    await t.typeText(Selector('input[name="address"]'),'address');
    await t.typeText(Selector('input[name="city"]'),'city');
    await t.click(Selector('select[name="state"]'));
    await t.click(await (Selector('select[name="state"]').find('option')).withText('Alabama'));
    await t.click(Selector('button[type="submit"]'));
    await t.click(Selector('cm-pagination li:nth-child(4) a'));
    await t.expect(await (await Selector('.card .card-header .white').withText('First name Last name')).exists).ok();
});

test('should let edit customer', async (t) => {
    await t.click(Selector('cm-pagination li:nth-child(4) a'));
    await t.click(Selector('a[href="/customers/23/details"]'));
    await t.click(('a[href="/customers/23/edit"]'));
    await t.typeText(Selector('input[name="email"]'),'admin@customermanager.com');
    await t.typeText(Selector('input[name="password"]'),'password1234');
    await t.click(Selector('button[type="submit"]'));
    await t.typeText(Selector('input[name="firstName"]'),'updated');
    await t.click(('button[type="submit"]'));
    await t.click(('a[href="/customers/23/details"]'));
    await t.expect(await Selector('cm-customer-details h4').innerText).contains('First nameupdated');
});

test('should let view customer order', async (t) => {
    await t.click(Selector('a[href="/customers/1/orders"]'));
    await t.expect(await Selector(('tbody > tr:nth-child(1) > td:nth-child(1)')).innerText).eql('Basketball');
    await t.expect(await Selector(('tbody > tr:nth-child(2) > td:nth-child(1)')).innerText).eql('Shoes');
    await t.expect(await Selector(('.summary-border td:nth-child(2)')).innerText).eql('$207.98');
});