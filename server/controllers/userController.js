const express = require('express');
const User = require('../models/user');

exports.login = async (req, res) => {
    try {
        const { email, password } = req.body;
        const user = await User.findOne({email: email});
        if (user) {
            const isValidPassword = await user.comparePassword(password);
            if (isValidPassword) {
                req.session.user = user._id;
                return res.status(200).json({
                    message: 'You are successfully logged in',
                    auth: true,
                });
            } else {
                return res.status(200).json({
                    message: 'Incorrect password',
                    auth: false,
                });
            }
            
        } else {
            return res.status(200).json({
                message: 'Unable to login',
                auth: false,
            });
        }
    } catch (err) {
        return res.status(500).json({ message : 'Internal server error - unable to login', auth: false });
    }
    
};

exports.signup = async (req, res) => {
    try {
        const isEmailExists = await User.findOne({email: req.body.email});
        if (isEmailExists) {
            return res.json(200).json({message: "Email already exists", auth: false});
        }
        const user = new User(req.body);
        await user.save();
        req.session.user = user._id;
        return res.status(200).json({
            message: 'You are successfully signed up',
            auth: true,
        });
    } catch (err) {
        return res.status(200).json({ 'message' : 'Internal server error - unable to sign up', auth: false });
    }
};

exports.hasLoggedIn = async (req, res) => {
    if (req.session.user) {
        return res.status(200).json({message: "You are signed in already", auth: true });
    } else {
        return res.status(200).json({message: "You are not signed in", auth: false });
    }
};