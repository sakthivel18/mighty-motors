const { v4: uuidv4 } = require("uuid");
const { DateTime } = require("luxon");
const model = require('../models/trade');
const v4 = new RegExp(/^[0-9A-F]{8}-[0-9A-F]{4}-4[0-9A-F]{3}-[89AB][0-9A-F]{3}-[0-9A-F]{12}$/i);

exports.findAll = async (req, res) => {
    try {
        let categories = await model.find().sort('categoryName');
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
        if (!tradeId.match(v4)) {
            return res.status(400).json({'message' : 'Cannot find a trade with id: ' + tradeId});
        }
        const category = await model.findOne({
            trades: {
                $elemMatch: {
                    id: tradeId
                }
            }
        });
        let trade = category.trades.find(trade => trade.id === tradeId);
        let tradeCopy = {...trade._doc, creator: trade.createdBy == req.session.user};
        if (!req.session.user || !trade.watchListedBy) {
            tradeCopy = {
                ...tradeCopy,
                isWatched: null
            }
        } else {
            tradeCopy = {
                ...tradeCopy,
                isWatched: trade.watchListedBy.get(req.session.user.toString()) != null
            }
        }
        if (!trade) return res.status(500).json({ 'message' : 'Internal server error - cannot fetch a trade with id:' + id });
        return res.status(200).json({
            trade: tradeCopy
        });
    } catch (err) {
        console.log(err);
        return res.status(500).json({ 'message' : 'Internal server error - cannot fetch the trade' });
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
                    cost: requestBody.cost,
                    createdBy: req.session.user
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
                cost: requestBody.cost,
                createdBy: req.session.user
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
        if (!requestBody.trade.id.match(v4)) {
            return res.status(400).json({'message' : 'Cannot find a trade with id: ' + tradeId});
        }
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
    try {
        const { id } = req.params;
        if (!id.match(v4)) {
            return res.status(400).json({'message' : 'Cannot find a trade with id: ' + tradeId});
        }
        const category = await model.findOne({
            trades: {
                $elemMatch: {
                    id: id
                }
            }
        });
        if (!category) return res.status(500).json({ 'message' : 'Internal server error - cannot delete the trade' });
        const index = category.trades.findIndex(trade => trade.id === id);
        category.trades.splice(index, 1);
        if (category.trades.length === 0) {
            await model.deleteOne({categoryId: category.categoryId});
        } else {
            await category.save();
        }
        return res.status(200).json({
            'message' : 'Trade deleted successfully'
        });
    } catch (err) {
        console.log(err.message);
        return res.status(500).json({ 'message' : 'Internal server error - cannot delete the trade' });
    }  
};


exports.watchUnwatchMovie = async (req, res) => {
    try {
        const { id } = req.params;
        if (!id.match(v4)) {
            return res.status(400).json({'message' : 'Cannot find a trade with id: ' + tradeId});
        }
        const category = await model.findOne({
            trades: {
                $elemMatch: {
                    id: id
                }
            }
        });
        if (!category) return res.status(500).json({ 'message' : 'Internal server error - cannot find the trade' });
        const index = category.trades.findIndex(trade => trade.id === id);
        const user = req.session.user.toString();
        if (!category.trades[index].watchListedBy) {
            category.trades[index].watchListedBy = new Map();
        }
        if (category.trades[index].watchListedBy.get(user)) {
            category.trades[index].watchListedBy.delete(user);
        } else {
            category.trades[index].watchListedBy.set(user, '1');
        }
        await category.save();
        let trade = {
            ...category.trades[index]._doc,
            isWatched: category.trades[index].get(user) != null
        }
        return res.status(200).json({message: "success"});
    } catch (err) {
        return res.status(500).json({
            message: 'Internal server error - unable to watch/unwatch movie'
        });
    }
};

