const express = require ('express');
const router = express.Router();
const User = require('../models/user');

router.post('/signup', async (req, res) {
    try {
        const newUser = await User.create (req.body);
        res.json(newUser);
    } catch (error){
        res.status(500).json({error: 'Internal Server Error'});
    }
})

module.exports = router;