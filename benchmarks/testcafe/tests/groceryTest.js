import { Selector } from 'testcafe';

fixture `Getting Started`
    .page `http://127.0.0.1:8080`;

test('should have the right title', async (t) => {
    await t.expect(Selector("title").innerText).eql('GroceryWorks')
});

test('should add beans to order', async (t) => {
    const items = ['Flax Seeds','French Green Lentils', 'Green Split Peas','Lentils','Pinto Beans','White Navy Beans','Yellow Split Peas']
    for(const index in items){
        const bean = Selector(`img[alt='${items[index]}']`);
        await t.click(bean);
    }
    const total = await Selector('.cart-total').innerText;
    await t.expect(total).eql('$5.13');
});