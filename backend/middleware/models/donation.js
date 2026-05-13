const mongoose = require('mongoose');

const DonationSchema = new mongoose.Schema({
    title: {
        type: String,
        required: true
    },
    description: {
        type: String
    },
    quantity: {
        type: String, // e.g., "5 kg", "10 units"
        required: true
    },
    expiryDate: {
        type: Date,
        required: true
    },
    location: {
        type: String,
        required: true
    },
    donorPhone: {
        type: String
    },
    imageUrl: {
        type: String
    },
    postedBy: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User'
    },
    status: {
        type: String,
        enum: ['Available', 'Claimed', 'Completed'],
        default: 'Available'
    },
    date: {
        type: Date,
        default: Date.now
    }
});

module.exports = mongoose.model('donation', DonationSchema);