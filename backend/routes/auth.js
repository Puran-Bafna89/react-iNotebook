const express = require('express');
const User = require('../models/User');
const router = express.Router();
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const { body, validationResult } = require('express-validator');
const fetchUser = require("../middleware/fetchuser");

const JWT_SECRET = "I am a good boy.";

//Route 1 - This end point is used to create user.
router.post('/createuser', [
    body('email', 'Enter a valid email').isEmail(),
    body('name', 'Name should be atleast 3 Characters').isLength({ min: 3 }),
    body('password', 'Password should be atleast 5 Characters').isLength({ min: 5 })
], async (req, res) => {

    // console.log(req.body);
    const errors = validationResult(req);
    // const JWT_SECRET = "I am a good boy.";

    if (!errors.isEmpty()) {
        return res.status(400).json({ errors: errors.array() });
    }
    try{
        const existingUser = await User.findOne({email: req.body.email});
        // console.log("Email = ", existingUser);
        if(existingUser){
            return res.status(400).json({Error: "Email already exists"});
        }

        const salt = await bcrypt.genSalt(10);
        const securedPassword = await bcrypt.hash(req.body.password, salt);


        let user = await User.create({
            "name": req.body.name,
            "email": req.body.email,
            "password": securedPassword
        });
        user.save();

        let data = {
            user: {
                id: user.id
            }
        }
        // console.log(data);
        let token = jwt.sign(data, JWT_SECRET);
        res.json({token});
    }catch(err){
        res.status(500).json({Error: "Internal server error"});
    }
});



//Route 2 - This end point is used for authorized user to login.
router.post('/login', [
    body('email', 'Enter a valid email').isEmail(),
    body('password', 'Password should not be empty').notEmpty()
], async (req, res) => {

    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        return res.status(400).json({ errors: errors.array() });
    }

    try{
        const user = await User.findOne({email: req.body.email});
        
        if(!user){
            return res.status(401).json({"Error": "Invalid Credentials"});
        }

        let comparePassword = await bcrypt.compare(req.body.password, user.password);

        if(!comparePassword){
            return res.status(401).json({Error: "Invalid Credentials"});
        }

        const data = {
            user: {
                id: user.id
            }
        }
        // console.log(data);
        let token = jwt.sign(data, JWT_SECRET);
        res.json({token, user: user.name});
    }catch(err){
        res.status(500).json({Error: "Internal server error"});
    }
});



// Route 3 - This end point is used to fetch the the user.
router.post('/getuser', fetchUser, async (req, res) => {
    const userId = req.user.id;
    const user = await User.findById(userId).select("-password");
    res.send(user);
});

module.exports = router;