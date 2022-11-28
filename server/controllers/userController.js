const express = require('express');
const User = require('../models/user');

exports.login = async (req, res) => {
    try {
        const { email, password } = req.body;
        const user = await User.findOne({email: email});
        if (user) {
            const isValidPassword = await user.comparePassword(password);
            if (isValidPassword) {
                req.session.user = await user._id;
                await req.session.save();
                return res.status(200).json({
                    message: 'You are successfully logged in',
                    auth: true
                });
            } else {
                return res.status(500).json({
                    message: 'Incorrect password',
                    auth: false,
                });
            }
            
        } else {
            return res.status(500).json({
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
            return res.json(500).json({message: "Email already exists", auth: false});
        }
        const user = new User(req.body);
        await user.save();
        req.session.user = await user._id;
        await req.session.save();
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
        const user = await User.findOne({ _id:  req.session.user});
        const firstName = await user.firstName;
        const lastName = await user.lastName;
        const email = await user.email;
        return res.status(200).json({
            message: "You are signed in already", 
            auth: true,
            user: {
                firstName,
                lastName,
                email
            }
        });
    } else {
        return res.status(500).json({message: "You are not signed in", auth: false });
    }
};

exports.signOut = async (req, res) => {
    await req.session.destroy();
    return res.status(200).json({auth: false});
};

/* exports.getUserProfile = async (req, res) => {
    try {
        const user = await User.findOne({
            _id: req.session.user
        });
        const firstName = await user.firstName;
        const lastName = await user.lastName;
        const email = await user.email;
        res.send(200).json({
            user: {
                firstName,
                lastName,
                email
            }
        });
    } catch (err) {
        res.send(404).json({
            message: "User profile not found"
        });
    }
} */