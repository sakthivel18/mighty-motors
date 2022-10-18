const model = require('../models/trade');

exports.findAll = (req, res) => {
    let categories = model.find();
        if (!categories) return res.status(500).json({ 'message' : 'Internal server error - cannot fetch categories' });
        return res.status(200).json({
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
    if (!categoryNames) return res.status(500).json({ 'message' : 'Internal server error - cannot fetch category names' });
    return res.status(200).json({
            categoryNames
        });
    
    
}

exports.findById = (req, res) => {
    let id = req.params.id;
    let trade = model.findById(id);
    if (!trade) return res.status(500).json({ 'message' : 'Internal server error - cannot fetch a trade with id:' + id });
    return res.status(200).json({
        trade
    });
};

exports.create = (req, res) => {
    let { trade } = req.body;
    model.save(trade);
    return res.status(200).json({
        'message' : 'Trade created successfully'
    });
};

exports.update = (req, res) => {
   let { trade } = req.body;
    let result = model.updateById(trade.id, trade);
    if (!result) return res.status(500).json({ 'message' : 'Internal server error - cannot update the trade' });
    return res.status(200).json({
        'message' : 'Trade updated successfully'
    });
};

exports.delete = (req, res) => {
    let { id } = req.params;
    let result = model.deleteById(id);
    if (!result) return res.status(500).json({ 'message' : 'Internal server error - cannot delete the trade' });
    return res.status(200).json({
        'message' : 'Trade deleted successfully'
    });    
};


