const express = require('express');
const router = express.Router();

const Subscriber = require('../models/subscribers');

// create a subscriber
router.post('/', async (req, res) => {
    const subscriber = new Subscriber({
        name: req.body.name,
        channel: req.body.channel
    })
    try {
        const newSubscriber = await subscriber.save();
        res.status(201).json(newSubscriber);
    } catch (error) {
        res.status(400).json({message: error.message})
    }
})

// Get all the subscribers
router.get('/', async (req, res) => {
    try {
        const subscribers = await Subscriber.find();
        res.status(200).json(subscribers);
    } catch (error) {
        res.status(500).json({message: error.message})
    }
})


// get subscriber by id
router.get('/:id', getSubscriber, (req, res) => {
    res.json(res.subscriber)
})

// update subscriber by id
router.patch('/:id', getSubscriber, async (req, res) => {
        if(req.body.name != null){
            res.subscriber.name = req.body.name;
        }
        if(req.body.channel != null){
            res.subscriber.channel = req.body.channel;
        }
        try {
            const updateSubscriber = await res.subscriber.save();
            res.status(200).json(updateSubscriber);
        } catch (error) {
            return res.status(400).json({message: error.message})
        }
})

// delete subscriber by id
router.delete('/:id', getSubscriber, async (req, res) => {
    try {
        await res.subscriber.remove();
        res.status(200).json({message: "Deleted subscriber"});
    } catch (error) {
        return res.status(500).json({message: error.message})
    }
})


// middleware to get id
async function getSubscriber(req, res, next){
    let subscriber;
    try {
        subscriber = await Subscriber.findById(req.params.id);
        if(subscriber == null){
            return res.status(404).json({message: 'Cannot find the subscriber'});
        }
    } catch (error) {
       return res.status(500).json({message: error.message})
    }
    res.subscriber = subscriber;
    next();
}

module.exports = router;