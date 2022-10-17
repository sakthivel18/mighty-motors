const model = require('../models/trade');

exports.findAll = (req, res) => {
    let categories = model.find();
    res.status(200).json({
        categories
    });
};

exports.findAllCategories = (req, res) => {
    let categories = model.find();
    let categoryNames = categories.map(category => {
        return {
            "label" : category.categoryName,
            "value" : category.categoryId
        }
    });
    res.status(200).json({
        categoryNames
    });
}

exports.findById = (req, res) => {
    let id = req.params.id;
    let trade = model.findById(id);
    res.status(200).json({
        trade
    });
};

exports.create = (req, res) => {
    let { trade } = req.body;
    model.save(trade);
    res.status(200).json({
        'message' : 'Trade created successfully'
    });
};

exports.update = (req, res) => {
    let { trade } = req.body;
    model.updateById(trade.id, trade);
    res.status(200).json({
        'message' : 'Trade updated successfully'
    });
};

exports.delete = (req, res) => {
    let { id } = req.params;
    model.deleteById(id);
    res.status(200).json({
        'message' : 'Trade deleted successfully'
    });
};


