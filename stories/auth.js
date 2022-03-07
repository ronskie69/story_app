const stories = require('express').Router();
const bcrypt = require('bcrypt');
const Users = require('../models/usersModel');

let session;

stories.post('/login', (req, res) => {
    const { email, password } = req.body
    console.log(req.body)
    Users.findOne({ email}, (err, user) => {
        if(err) return res.status(404).send('Username not found!');
        bcrypt.compare(password, user.password,(err, matched) => {
            if(err) return res.status(400).send('Unable to login!');
            if(!matched) return res.status(401).send('Incorrect password!');
            session = req.session;
            session.email = user.email;
            session.isAuth = true
            console.log(session)
            return res.status(200).send('Success!');
        })
    })
});


stories.post('/register', (req, res) => {

    const { email, password } = req.body

    Users.findOne({ email}, (err, user) => {
        if(err) return res.status(404).send('Unable to register!');
        if(user) return res.status(401).send('Email is already taken!');
        bcrypt.hash(password, 10, (err, hashed) => {
            if(err) return res.status(404).send('Failed to register!');
            const newUser = new Users({
                email,
                password: hashed
            });
            newUser.save((err, result) => {
                if(err) {
                    console.log(err)
                    return res.status(404).send('Failed to register!');
                }
                // console.log(result);
                res.status(201).send('Success!');
                return;
            });
        });
    })
});


module.exports = stories
