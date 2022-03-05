const crud = require('express').Router();
const Story = require('../models/storyModel');
const Users = require('../models/usersModel');
const bcrypt = require('bcrypt');

crud.post('/create-story', (req, res) => {
    const { title, nickname, story, senderEmail } = req.body;
    const id = Math.random() * 9999999;
    const newStory = new Story({
        id,
        title,
        nickname,
        story,
        senderEmail
    });
    newStory.save((err, result) => {
        if(err) {
            console.log("STORY SAVE ERROR: ", err);
            return res.status(400).send("Failed to send story!");
        }
        res.status(201).send("Success!");
        return;
    });
})

crud.post('/delete-story', (req, res) => {
    const { id, senderEmail } = req.body;

    Story.findOneAndDelete({ 
        id: id, 
        senderEmail: senderEmail}, 
        (err, result) => {
            if(err) return res.status(400).send("Failed to delete story!");
            res.status(201).send("Success!");
            return;
    })
});

crud.post('/change-password', (req, res) => {
    const { oldPassword, newPassword, email } = req.body;
    Users.findOne({email: email}, (err, user) => {
        if(err) return res.status(401).send("Account not found!");
        bcrypt.compare(oldPassword, user.password, (err, matched) => {
            if(err) return res.status(401).send("Failed to change password!");
            if(!matched) return res.status(401).send("Old password is incorrect!");
            
            bcrypt.hash(newPassword, 10, (err, hashed) => {
                if(err) return res.status(401).send("Failed to change password!");
                user.password = hashed
                user.save((err) => {
                    if(err) return res.status(401).send("Failed to change password!");
                    return res.status(200).send("Success!");
                });
            })
        })
    })
});


module.exports =crud