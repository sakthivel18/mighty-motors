const { v4: uuidv4 } = require("uuid");
const { DateTime } = require("luxon");
const model = require('../models/trade');


exports.findAll = async (req, res) => {
    try {
        let categories = await model.find();
        if (!categories) return res.status(500).json({ 'message' : 'Internal server error - cannot fetch categories' });
        return res.status(200).json({
            categories
        });
    } catch (err) {
        return res.status(500).json({ 'message' : 'Internal server error - cannot fetch categories' });
    }
   
}; 
    


exports.findAllCategories = async (req, res) => {
    try {
        let categories = await model.find();
        if (!categories) return res.status(500).json({ 'message' : 'Internal server error - cannot fetch category names' });
        let categoryNames = categories.map(category => {
            return {
                "label" : category.categoryName,
                "value" : category.categoryId
            }
        });
        
        return res.status(200).json({
            categoryNames
        });
    } catch (err) {
        return res.status(500).json({ 'message' : 'Internal server error - cannot fetch category names' });
    }    
}

exports.findById = async (req, res) => {
    try {
        const tradeId = req.params.id;
        const category = await model.findOne({
            trades: {
                $elemMatch: {
                    id: tradeId
                }
            }
        });
        const trade = category.trades.find(trade => trade.id === tradeId);
        if (!trade) return res.status(500).json({ 'message' : 'Internal server error - cannot fetch a trade with id:' + id });
        return res.status(200).json({
            trade
        });
    } catch (err) {
        return res.status(500).json({ 'message' : 'Internal server error - cannot fetch a trade with id:' + id });
    }
    
};

exports.create = async (req, res) => {
    try {
        const requestBody = req.body.trade;
        const doc = await model.findOne({categoryId: requestBody.categoryId});
        if (!doc) {
            let category = new model({
                categoryId: uuidv4(),
                categoryName: requestBody.categoryName,
                trades:[{
                    id: uuidv4(),
                    name: requestBody.name, 
                    location: requestBody.location,
                    description: requestBody.description,
                    image: requestBody.image,
                    createdAt: DateTime.now().toLocaleString(DateTime.DATETIME_SHORT),
                    cost: requestBody.cost
                }]
            });
            await model.create(category);
            return res.status(200).json({
                'message': 'Trade created successfully'
            });
        } else {
            doc.trades.push({
                id: uuidv4(),
                name: requestBody.name, 
                location: requestBody.location,
                description: requestBody.description,
                image: requestBody.image,
                createdAt: DateTime.now().toLocaleString(DateTime.DATETIME_SHORT),
                cost: requestBody.cost
            });
            await doc.save();
            return res.status(200).json({
                'message': 'Trade created successfully'
            });
        }

    } catch (err) {
        console.log(err);
        return res.status(500).json({ 'message' : 'Internal server error - cannot create trade' });
    }
};

exports.update = async (req, res) => {
    try {
        const requestBody = req.body;
        const category = await model.findOne({
            trades: {
                $elemMatch: {
                    id: requestBody.trade.id
                }
            }
        });
        if (!category) return res.status(500).json({ 'message' : 'Internal server error - cannot update the trade' });
        
        const index = category.trades.findIndex(trade => trade.id === requestBody.trade.id);
        category.trades[index].name = requestBody.trade.name;
        category.trades[index].location = requestBody.trade.location;
        category.trades[index].description = requestBody.trade.description;
        category.trades[index].cost = requestBody.trade.cost;
        await category.save();
        return res.status(200).json({
            'message' : 'Trade updated successfully'
        });
    } catch (err) {
        console.log(err);
        return res.status(500).json({ 'message' : 'Internal server error - cannot update the trade' });
    }
};

exports.delete = async (req, res) => {
    let { id } = req.params;
    let result = model.deleteById(id);
    if (!result) return res.status(500).json({ 'message' : 'Internal server error - cannot delete the trade' });
    return res.status(200).json({
        'message' : 'Trade deleted successfully'
    });    
};


