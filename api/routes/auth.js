const express = require('express');
const router = express.Router();
const Users = require('../models/users')
const mongoose = require('mongoose');
const jwt = require('jsonwebtoken')
const CONFIG =  require('../../config')
//Authentication Using JWT

router.post('/', (req, res) => {
    ////query user//
    let __id = req.query.user_id
    Users.findOne({ _id: __id }, (err, user) => {
    //console.log(user)
    if (err) {
        res.status(400).json({
            message: 'User Not Found'
        })
        return;
    }
    let node_user = {
        email: user.email,
        mobile_number: user.mobile_number
    }
jwt.sign(node_user,CONFIG.SECRET,(err , token) => {
        if (err) throw err
        res.status(201).json({
            token
        })
    })

    })
    ///end queryy///
    
})

module.exports = router;