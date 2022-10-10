const model = require('../models/trade');

exports.findAll = (req, res) => {
    let categories = model.find();
    res.status(200).json({
        categories
    });
};

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
    res.send(200).json({
        'message' : 'Trade created successfully'
    });
};

exports.update = (req, res) => {
    let { trade } = req.body;
    model.updateById(trade.id, trade);
    res.send(200).json({
        'message' : 'Trade updated successfully'
    });
};

exports.delete = (req, res) => {
    let { trade } = req.body;
    model.deleteById(trade.id, trade);
    res.send(200).json({
        'message' : 'Trade deleted successfully'
    });
};


