const express = require('express');
const router = express.Router();
const auth = require('../middleware/auth');
const Request = require('../models/Request');

// @route   GET api/requests
// @desc    Get all open requests (or filter)
// @access  Public
router.get('/', async (req, res) => {
    try {
        const { search, location, status } = req.query;
        let query = { status: status || 'Open' };

        if (status === 'all') delete query.status;
        if (location) query.location = { $regex: location, $options: 'i' };
        if (search) query.title = { $regex: search, $options: 'i' };

        const requests = await Request.find(query).sort({ date: -1 });
        res.json(requests);
    } catch (err) {
        console.error(err.message);
        res.status(500).send('Server Error');
    }
});

// @route   GET api/requests/my-requests
// @desc    Get requests by logged-in user
// @access  Private
router.get('/my-requests', auth, async (req, res) => {
    try {
        const requests = await Request.find({ requestedBy: req.user.id }).sort({ date: -1 });
        res.json(requests);
    } catch (err) {
        console.error(err.message);
        res.status(500).send('Server Error');
    }
});

// @route   POST api/requests
// @desc    Add a new request
// @access  Private
router.post('/', auth, async (req, res) => {
    const { title, description, quantityNeeded, location, requesterPhone, imageUrl } = req.body;

    try {
        const newRequest = new Request({
            title,
            description,
            quantityNeeded,
            location,
            requesterPhone,
            imageUrl,
            requestedBy: req.user.id
        });

        const request = await newRequest.save();
        res.json(request);
    } catch (err) {
        console.error(err.message);
        res.status(500).send('Server Error');
    }
});

// @route   PUT api/requests/:id/status
// @desc    Update request status
// @access  Private
router.put('/:id/status', auth, async (req, res) => {
    const { status } = req.body;

    try {
        let request = await Request.findById(req.params.id);

        if (!request) return res.status(404).json({ msg: 'Request not found' });

        // Make sure user owns request
        if (request.requestedBy.toString() !== req.user.id) {
            return res.status(401).json({ msg: 'Not authorized' });
        }

        request = await Request.findByIdAndUpdate(
            req.params.id,
            { $set: { status } },
            { new: true }
        );

        res.json(request);
    } catch (err) {
        console.error(err.message);
        res.status(500).send('Server Error');
    }
});

module.exports = router;