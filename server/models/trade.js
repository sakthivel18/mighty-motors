const { DateTime } = require("luxon");
const { v4: uuidv4 } = require("uuid");

const categories = [
    {   
        categoryId: uuidv4(),
        categoryName: "Sedans",
        trades: [
            {
                id: uuidv4(),
                name: "Audi A5",
                location: "Charlotte, NC",
                description: "This is Audi A5",
                image: "../images/car1.jpg",
                createdAt: DateTime.now().toLocaleString(DateTime.DATETIME_SHORT)
            },
            {
                id: uuidv4(),
                name: "Honda Accord",
                location: "Austin, TX",
                description: "This is Honda Accord",
                image: "../images/car2.jpg",
                createdAt: DateTime.now().toLocaleString(DateTime.DATETIME_SHORT)
            },
            {
                id: uuidv4(),
                name: "Toyota Camry",
                location: "San Francisco, CA",
                description: "This is Toyota Camry",
                image: "../images/car3.jpg",
                createdAt: DateTime.now().toLocaleString(DateTime.DATETIME_SHORT)
            }
        ]
    },
    {
        categoryId: uuidv4(),
        categoryName: "SUVs",
        trades: [
            {
                id: uuidv4(),
                name: "Audi Q5",
                location: "Jersey city, NJ",
                description: "This is Audi Q5",
                image: "../images/car4.jpg",
                createdAt: DateTime.now().toLocaleString(DateTime.DATETIME_SHORT)
            },
            {
                id: uuidv4(),
                name: "BMW X1",
                location: "Manhattan, NY",
                description: "This is BMW X1",
                image: "../images/car5.jpg",
                createdAt: DateTime.now().toLocaleString(DateTime.DATETIME_SHORT)
            },
            {
                id: uuidv4(),
                name: "Mazda CX5",
                location: "Blacksburg, VA",
                description: "This is Mazda CX5",
                image: "../images/car6.jpg",
                createdAt: DateTime.now().toLocaleString(DateTime.DATETIME_SHORT)
            }
        ]
    }
];

exports.find = () => categories;

exports.findById = id => {
    for (const category of categories) {
        const trade = category.trades.find(trade => trade.id === id);
        if (trade) {
            return trade;
        }
    }
    return null;
};

exports.save = trade => {
    const category = categories.find(category => category.categoryId === trade.categoryId);
    const index = categories.findIndex(item => category.categoryId === item.categoryId);
    const newTrade = {
        id : uuidv4(),
        name : trade.name,
        location: trade.location,
        description: trade.description,
        image: trade.image,
        createdAt: DateTime.now().toLocaleString(DateTime.DATETIME_SHORT)
    };
    if (index !== -1) {
        categories[index].trades.push(newTrade);
    } else {
        categories.push({
            categoryId: uuidv4(),
            categoryName: trade.categoryName,
            trades: [newTrade]
        });
    }
};

exports.updateById = (id, newTrade) => {
    categories.forEach(category => {
        const trade = category.trades.find(trade => trade.id === id);
        if (trade) {
            const index = category.trades.findIndex(item => item.id === trade.id);
            category.trades[index].name = newTrade.name;
            category.trades[index].location = newTrade.location;
            category.trades[index].description = newTrade.description;
            category.trades[index].image = newTrade.image;
            return true;
        }
    });
    return false;
};

exports.deleteById = (id) => {
    categories.forEach(category => {
        const trade = category.trades.find(trade => trade.id === id);
        if (trade) {
            const index = category.trades.findIndex(trade);
            category.trades.splice(index, 1);
            return true;
        }
    });
    return false;
};