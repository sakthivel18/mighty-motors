const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const categorySchema = new Schema({
    categoryId: {
        type: String,
        required: [true, 'categoryId is required']
    },
    categoryName: {
        type: String,
        required: [true, 'categoryName is required']
    },
    trades: [{
        id: {
            type: String,
            required: [true, 'trade id is required']
        },
        name: {
            type: String,
            required: [true, 'trade name is required']
        },
        location: {
            type: String,
            required: [true, 'trade location is required']
        },
        description: {
            type: String,
            required: [true, 'trade description is required']
        },
        image: {
            type: String
        },
        createdAt: {
            type: Date,
            default: Date.now
        },
        cost: {
            type: Number,
            required: [true, 'trade cost is required']
        },
        createdBy: {
            type: Schema.Types.ObjectId,
            ref: 'User'
        },
        watchListedBy: {
            type: Map,
            of: String,
            ref: 'User'
        }, 
        status: {
            type: String,
            default: "Available"
        },
        offers: [{
            tradeId: {
                type: String,
                required: [true, 'tradeId is required for offers']
            },
            offeredTradeId: {
                type: String,
                required: [true, 'offeredTradeId id is required for offers']
            },
            offeredBy: {
                type: Schema.Types.ObjectId,
                ref: 'User' 
            }
        }]
    }]
}, {timestamps: true});


module.exports = mongoose.model('Category', categorySchema);

