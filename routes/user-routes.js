const express = require('express');
const router = express.Router();

const UserModel = require('../model/user');

router.get(
    '/profile',
    async (req, res, next) => {
        const id = req.user._id
        // let user = {};
        // await UserModel.findById(id, (error, u) => {user = u});
        UserModel.findById(id, 'username firstName lastName', (error, u) => {
            res.json(u)
        });
        // res.json({
        //     user: user,
        // })
    }
);

// router.put

module.exports = router;
