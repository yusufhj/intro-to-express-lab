const express = require('express');

const app = express();

app.listen(3000, () => {
    console.log('Server is running on http://localhost:3000');
});

app.get('/', (req, res) => {
    res.send('');
});

app.get('/greetings/:username', (req, res) => {
    res.send(`Hello there ${req.params.username}!`);
});

app.get('/roll/:num', (req, res) => {
    if (isNaN(req.params.num)) {
        res.send('You must specify a number.');
    } else {
        let num = Math.floor(Math.random() * req.params.num) + 1;
        res.send(`You rolled a ${num}`);
    }
});

app.get('/collectibles/:index', (req, res) => {
    const collectibles = [
        { name: 'shiny ball', price: 5.95 },
        { name: 'autographed picture of a dog', price: 10 },
        { name: 'vintage 1970s yogurt SOLD AS-IS', price: 0.99 }
    ];
    const index = req.params.index;
    if (index >= 0 && index < collectibles.length) {
        res.send(`So, you want the ${collectibles[index].name}? For ${collectibles[index].price}, it can be yours!`);
    } else if (isNaN(index)) {
        res.send('You must specify a number for the index.');
    } else {
        res.send('This item is not yet in stock. Check back soon!')
    }
});

app.get('/shoes', (req, res) => {
    const shoes = [
        { name: "Birkenstocks", price: 50, type: "sandal" },
        { name: "Air Jordans", price: 500, type: "sneaker" },
        { name: "Air Mahomeses", price: 501, type: "sneaker" },
        { name: "Utility Boots", price: 20, type: "boot" },
        { name: "Velcro Sandals", price: 15, type: "sandal" },
        { name: "Jet Boots", price: 1000, type: "boot" },
        { name: "Fifty-Inch Heels", price: 175, type: "heel" }
    ];

    const min_price = req.query.min_price;
    const max_price = req.query.max_price;
    const type = req.query.type;

    let filteredShoes = shoes;

    if (min_price && max_price && type) {
        filteredShoes = shoes.filter(shoe => shoe.price >= min_price && shoe.price <= max_price && shoe.type === type);
    } else if (min_price && max_price) {
        filteredShoes = shoes.filter(shoe => shoe.price >= min_price && shoe.price <= max_price);
    }
    else if (min_price) {
        filteredShoes = shoes.filter(shoe => shoe.price >= min_price);
    }
    else if (max_price) {
        filteredShoes = shoes.filter(shoe => shoe.price <= max_price);
    }
    else if (type) {
        filteredShoes = shoes.filter(shoe => shoe.type === type);
    }

    let string = '';
    for (let i = 0; i < filteredShoes.length; i++) {
        string += `${i+1}: Name: ${filteredShoes[i].name}, Price: ${filteredShoes[i].price}, Type: ${filteredShoes[i].type} <br>`;
    }
    res.send(string);

    // to test:
    // http://localhost:3000/shoes?min_price=50&max_price=500&type=sneaker
    // http://localhost:3000/shoes?min_price=50&max_price=500
    // http://localhost:3000/shoes?type=sandal
    // http://localhost:3000/shoes?min_price=50
    // http://localhost:3000/shoes?max_price=50
    // http://localhost:3000/shoes
});
