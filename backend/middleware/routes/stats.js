const express = require('express');
const router = express.Router();
const Donation = require('../models/Donation');
const Request = require('../models/Request');
const User = require('../models/User');

// @route   GET api/stats
// @desc    Get application statistics (global)
// @access  Public
router.get('/', async (req, res) => {
    try {
        const totalUsers = await User.countDocuments();
        
        const totalDonations = await Donation.countDocuments();
        const availableDonations = await Donation.countDocuments({ status: 'Available' });
        const completedDonations = await Donation.countDocuments({ status: 'Completed' });
        
        const totalRequests = await Request.countDocuments();
        const openRequests = await Request.countDocuments({ status: 'Open' });
        const fulfilledRequests = await Request.countDocuments({ status: 'Fulfilled' });

        res.json({
            users: totalUsers,
            donations: {
                total: totalDonations,
                available: availableDonations,
                completed: completedDonations
            },
            requests: {
                total: totalRequests,
                open: openRequests,
                fulfilled: fulfilledRequests
            }
        });
    } catch (err) {
        console.error(err.message);
        res.status(500).send('Server Error');
    }
});

// @route   GET api/stats/leaderboard
// @desc    Get top donors
// @access  Public
router.get('/leaderboard', async (req, res) => {
    try {
        // Aggregate donations to find users with the most Completed donations
        const topDonors = await Donation.aggregate([
            { $match: { status: 'Completed' } },
            { $group: { _id: '$postedBy', count: { $sum: 1 } } },
            { $sort: { count: -1 } },
            { $limit: 5 }
        ]);

        // Populate user details manually since we used aggregate
        const populatedDonors = await User.populate(topDonors, { path: '_id', select: 'username email' });

        const formattedLeaderboard = populatedDonors.map(donor => ({
            user: donor._id,
            completedDonations: donor.count
        }));

        res.json(formattedLeaderboard);
    } catch (err) {
        console.error(err.message);
        res.status(500).send('Server Error');
    }
});

module.exports = router;