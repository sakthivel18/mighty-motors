const Category = require('../models/trade');

exports.createOffer = async (req, res) => {
    try {
       const { tradeId, offeredTradeId } = req.body;
       const user = req.session.user;
       let category = await Category.findOne({
            trades: {
                $elemMatch: {
                    id: offeredTradeId
                }
            }
        });
        if (!category) return res.status(500).json({ 'message' : 'Internal server error - cannot create offer' });
        let idx = category.trades.findIndex(trade => trade.id === offeredTradeId);
        category.trades[idx].status = "Offer pending";
        category.trades[idx].offers = [];
        category.trades[idx].offers.push({
            tradeId: tradeId,
            offeredTradeId: offeredTradeId,
            offeredBy: user
        });
        await category.save();
        category = await Category.findOne({
            trades: {
                $elemMatch: {
                    id: tradeId
                }
            }
        });
        if (!category) return res.status(500).json({ 'message' : 'Internal server error - cannot create offer' });
        idx = category.trades.findIndex(trade => trade.id === tradeId);
        category.trades[idx].status = "Offer pending";
        category.trades[idx].offers = [];
        category.trades[idx].offers.push({
            tradeId: tradeId,
            offeredTradeId: offeredTradeId,
            offeredBy: user
        });
        await category.save();
        return res.status(200).json({
            message: "Offer created successfully"
        });
    } catch (err) {
        return res.status(500).json({
            message: "Unable to create offer"
        });
    }
};

exports.acceptOffer = async (req, res) => {
    try {
        const { tradeId, offeredTradeId } = req.body;
        const user = req.session.user;
        let category = await Category.findOne({
            trades: {
                $elemMatch: {
                    id: offeredTradeId
                }
            }
        });
        if (!category) return res.status(500).json({ 'message' : 'Internal server error - cannot accept offer' });
        let idx = category.trades.findIndex(trade => trade.id === offeredTradeId);
        category.trades[idx].status = "Trade approved";
        await category.save();
        category = await Category.findOne({
            trades: {
                $elemMatch: {
                    id: tradeId
                }
            }
        });
        if (!category) return res.status(500).json({ 'message' : 'Internal server error - cannot accept offer' });
        idx = category.trades.findIndex(trade => trade.id === tradeId);
        category.trades[idx].status = "Trade approved";
        await category.save();
        return res.status(200).json({
            message: "Offer accepted successfully"
        });
    } catch (err) {
        return res.status(500).json({
            message: "Unable to accept offer"
        });
    }
};

exports.rejectOffer = async (req, res) => {
    try {
        const { tradeId, offeredTradeId } = req.body;
        const user = req.session.user;
        let category = await Category.findOne({
            trades: {
                $elemMatch: {
                    id: offeredTradeId
                }
            }
        });
        if (!category) return res.status(500).json({ 'message' : 'Internal server error - cannot create offer' });
        let idx = category.trades.findIndex(trade => trade.id === offeredTradeId);
        category.trades[idx].status = "Available";
        let offerIdx = category.trades[idx].offers.findIndex(offer => offer.tradeId == tradeId && offer.offeredTradeId == offeredTradeId && offer.offeredBy == user);
        category.trades[idx].offers.splice(offerIdx, 1);
        await category.save();
        category = await Category.findOne({
            trades: {
                $elemMatch: {
                    id: tradeId
                }
            }
        });
        if (!category) return res.status(500).json({ 'message' : 'Internal server error - cannot create offer' });
        idx = category.trades.findIndex(trade => trade.id === tradeId);
        category.trades[idx].status = "Available";
        offerIdx = category.trades[idx].offers.findIndex(offer => offer.tradeId == tradeId && offer.offeredTradeId == offeredTradeId && offer.offeredBy == user);
        category.trades[idx].offers.splice(offerIdx, 1);
        await category.save();
        return res.status(200).json({message: "Offer cancelled successfully"});
    } catch (err) {
        console.log(err);
        return res.status(500).json({
            message: "Unable to reject offer"
        });
    }

};


exports.getOffers = async (req, res) => {
    try {
        const user = req.session.user;
        const categories = await Category.find();
        let offers = [];
        categories.forEach(category => {
            category.trades.forEach(trade => {
                trade.offers.forEach(offer => {
                    if (offer.offeredBy == user && trade.createdBy != user) {
                        offers.push({ ...offer._doc, trade, categoryName: category.categoryName });
                    }
                })
            });
        });
        return res.status(200).json({offers});
    } catch (err) {
        return res.status(500).json("Unable to fetch offers");
    }
};

/* exports.getOffer = async (req, res) => {
    try {
        const offeredTradeId = req.params.id;
        let category = await Category.findOne({
            trades: {
                $elemMatch: {
                    id: offeredTradeId
                }
            }
        });
        let categories = await Category.find();
        const offeredTrade = category.trades.find(c => c.id === offeredTradeId);
        let offers = offeredTrade.offers;
        let returnOffers = [];
        offers.forEach(offer => {
            categories.forEach(c => {
                let trade = c.trades.find(t => t.id == offer.tradeId);
                returnOffers.push({...offer._doc, trade, offeredTrade});
            });
        });
        return res.status(200).json({offers : returnOffers});

    } catch (err) {
        console.log(err);
        return res.status(500).json("Unable to fetch offers");
    }
} */

exports.getOffer = async (req, res) => {
    try {
        const { tradeId, offeredTradeId, offeredBy } = req.body;
        let category = await Category.findOne({
            trades: {
                $elemMatch: {
                    id: tradeId
                }
            }
        });
        if (!category) {
            return res.status(400).json({
                message: "Unable to find trade"
            });
        }
        let trade = category.trades.find(t => t.id === tradeId);
        category = await Category.findOne({
            trades: {
                $elemMatch: {
                    id: offeredTradeId
                }
            }
        });
        if (!category) {
            return res.status(400).json({
                message: "Unable to find offered trade"
            });
        }
        let offeredTrade = category.trades.find(t => t.id === offeredTradeId);
        return res.status(200).json({
            trade,
            offeredTrade,
            offeredBy
        });
    } catch (err) {
        console.log(err);
        return res.status(500).json("Unable to fetch offers");
    }
}
