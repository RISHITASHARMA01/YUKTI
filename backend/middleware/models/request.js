const mongoose = require('mongoose');

const RequestSchema = new mongoose.Schema({
    title: {
        type: String,
        required: true
    },
    description: {
        type: String,
        required: true
    },
    quantityNeeded: {
        type: String,
        required: true
    },
    location: {
        type: String,
        required: true
    },
    requesterPhone: {
        type: String,
        required: true
    },
    imageUrl: {
        type: String
    },
    requestedBy: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User'
    },
    status: {
        type: String,
        enum: ['Open', 'Fulfilled', 'Closed'],
        default: 'Open'
    },
    date: {
        type: Date,
        default: Date.now
    }
});

module.exports = mongoose.model('request', RequestSchema);