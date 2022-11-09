const { DateTime } = require("luxon");
const { v4: uuidv4 } = require("uuid");

const categories = [
    {   
        categoryId: "7a76ec7e-19e4-49af-aabc-58f36dc105dc",
        categoryName: "Sedans",
        trades: [
            {
                id: "fa98b18c-9932-476f-b8e8-52b2d9013c0e",
                name: "Audi A5", 
                location: "Charlotte, NC",
                description: "This is Audi A5",
                image: "../images/car1.jpg",
                createdAt: DateTime.now().toLocaleString(DateTime.DATETIME_SHORT),
                cost: 48000
            },
            {
                id: "626ab10f-21ec-40d8-a5ba-5292b42e2259",
                name: "Honda Accord",
                location: "Austin, TX",
                description: "This is Honda Accord",
                image: "../images/car2.jpg",
                createdAt: DateTime.now().toLocaleString(DateTime.DATETIME_SHORT),
                cost: 52000,
            },
            {
                id: "a961ff87-b489-475b-b00b-573ab330ec24",
                name: "Toyota Camry",
                location: "San Francisco, CA",
                description: "This is Toyota Camry",
                image: "../images/car3.jpg",
                createdAt: DateTime.now().toLocaleString(DateTime.DATETIME_SHORT),
                cost: 130000
            }
        ]
    },
    {
        categoryId: "5c284625-89f2-4f64-a785-8928cf2c56b4",
        categoryName: "SUVs",
        trades: [
            {
                id: "7d8fff77-d51c-409e-a1c3-c7628d853fd8",
                name: "Audi Q5",
                location: "Jersey city, NJ",
                description: "This is Audi Q5",
                image: "../images/car4.jpg",
                createdAt: DateTime.now().toLocaleString(DateTime.DATETIME_SHORT),
                cost: 65000
            },
            {
                id: "6dde8c63-5db0-4b81-9ad9-65a95b868261",
                name: "BMW X1",
                location: "Manhattan, NY",
                description: "This is BMW X1",
                image: "../images/car5.jpg",
                createdAt: DateTime.now().toLocaleString(DateTime.DATETIME_SHORT),
                cost: 75000
            },
            {
                id: "b9afead0-8c2c-4d10-abe4-9d6c32380353",
                name: "Mazda CX5",
                location: "Blacksburg, VA",
                description: "This is Mazda CX5",
                image: "../images/car6.jpg",
                createdAt: DateTime.now().toLocaleString(DateTime.DATETIME_SHORT),
                cost: 50000
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
    const newTrade = {
        id : uuidv4(),
        name : trade.name,
        location: trade.location,
        description: trade.description,
        image: trade.image,
        createdAt: DateTime.now().toLocaleString(DateTime.DATETIME_SHORT),
        cost: trade.cost
    };
    if (category) {
        const index = categories.findIndex(item => category.categoryId === item.categoryId);
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
            category.trades[index].cost = newTrade.cost;
            return true;
        }
    });
    return true;
};

exports.deleteById = (id) => {
    categories.forEach(category => {
        const trade = category.trades.find(trade => trade.id === id);
        if (trade) {
            const index = category.trades.findIndex(item => item.id === id);
            category.trades.splice(index, 1);
            return true;
        }
    });
    return true;
};