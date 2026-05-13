const express = require('express');
const router = express.Router();
const auth = require('../middleware/auth');
const Donation = require('../models/Donation');

// @route   GET api/donations
// @desc    Get all donations
// @access  Public
router.get('/', async (req, res) => {
    try {
        const { search, location, status } = req.query;
        let query = {};

        if (status) query.status = status;
        if (location) query.location = { $regex: location, $options: 'i' };
        if (search) query.title = { $regex: search, $options: 'i' };

        const donations = await Donation.find(query).sort({ date: -1 });
        res.json(donations);
    } catch (err) {
        console.error(err.message);
        res.status(500).send('Server Error');
    }
});

// @route   GET api/donations/my-donations
// @desc    Get donations by logged-in user
// @access  Private
router.get('/my-donations', auth, async (req, res) => {
    try {
        const donations = await Donation.find({ postedBy: req.user.id }).sort({ date: -1 });
        res.json(donations);
    } catch (err) {
        console.error(err.message);
        res.status(500).send('Server Error');
    }
});

// @route   POST api/donations
// @desc    Add a new donation
// @access  Private
router.post('/', auth, async (req, res) => {
    const { title, description, quantity, expiryDate, location, donorPhone, imageUrl } = req.body;

    try {
        const newDonation = new Donation({
            title,
            description,
            quantity,
            expiryDate,
            location,
            donorPhone,
            imageUrl,
            postedBy: req.user.id
        });

        const donation = await newDonation.save();
        res.json(donation);
    } catch (err) {
        console.error(err.message);
        res.status(500).send('Server Error');
    }
});

// @route   PUT api/donations/:id/status
// @desc    Update donation status
// @access  Private
router.put('/:id/status', auth, async (req, res) => {
    const { status } = req.body;

    try {
        let donation = await Donation.findById(req.params.id);

        if (!donation) return res.status(404).json({ msg: 'Donation not found' });

        // Make sure user owns donation
        if (donation.postedBy.toString() !== req.user.id) {
            return res.status(401).json({ msg: 'Not authorized' });
        }

        donation = await Donation.findByIdAndUpdate(
            req.params.id,
            { $set: { status } },
            { new: true }
        );

        res.json(donation);
    } catch (err) {
        console.error(err.message);
        res.status(500).send('Server Error');
    }
});

module.exports = router;