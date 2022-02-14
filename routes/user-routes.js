const express = require('express');
const router = express.Router();

const UserModel = require('../model/user');

router.get(
    '/profile',
    async (req, res, next) => {
        const id = req.user._id
        // let user = {};
        // await UserModel.findById(id, (error, u) => {user = u});
        UserModel.findById(id, 'username firstName lastName', null, (error, u) => {
            res.json(u)
        });
        // res.json({
        //     user: user,
        // })
    }
);

router.put('/:id', async (req, res, next) => {
    UserModel.findByIdAndUpdate(req.params.id,
        {$set: {firstName: req.body.firstName, lastName: req.body.lastName, password: req.body.password}}, {new: true}, async (err, u) => {
            if(err) {
                console.error(err);
                return next(err);
            }
            res.json({
                username: u.username,
                firstName: u.firstName,
                lastName: u.lastName
            })
        })
})

module.exports = router;
