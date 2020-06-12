const express = require('express');
const router = express.Router();
const bcrypt = require('bcrypt');
const mongoose = require('mongoose');
const jwt = require('jsonwebtoken');
const authenticate  = require('../middleware/authentication');
//const Admin =mongoose.model('Admin')
const Admin = require('../models/regadmin.model');
//const UserAddress = require('../models/userAddress');

router.post('/signup', (req, res, next) => {

    Admin.findOne({email: req.body.email})
    .exec()
    .then(admin => {

        if(admin){
            return res.status(500).json({
                message: 'Email Already Exists'
            })
        }else{

            bcrypt.hash(req.body.password, 10, (err, hash) => {
                if(err){
                    return res.status(500).json({
                        error: 'Something went wrong'
                    });
                }else{
                    const admin = new Admin({
                        _id: new mongoose.Types.ObjectId(),
                        firstName: req.body.firstName,
                        lastName: req.body.lastName,
                        email: req.body.email,
                        password: hash,
                        createdAt: new Date().toISOString()
                    });

                    admin.save()
                    .then(doc => {
                        res.status(201).json({
                            message: 'Account Created Successfully'
                        });
                    })
                    .catch(er => {
                        res.status(500).json({
                            error: er
                        });
                    });


                }
                
            });

        }

        
    });


});


router.post('/login', (req, res, next) => {

    Admin.findOne({email: req.body.email})
    .select('_id firstName lastName email password')
    .exec()
    .then(admin => {
        if(admin){

            bcrypt.compare(req.body.password, admin.password, (err, result) => {
                if(err){
                    return res.status(500).json({
                        message: 'Login Failed'
                    })
                }else{
                    if(result){
                        const payload = {
                            adminId: admin._id,
                            iat:  Math.floor(Date.now() / 1000) - 30,
                            exp: Math.floor(Date.now() / 1000) + (60 * 60 * 60 * 24),
                        }
                        jwt.sign(payload, 'mysecretkey', (err, token) => {
                            if(err){
                                return res.status(500).JSON({
                                    message: 'Authentication Failed'
                                });
                            }else{
                                res.status(200).json({
                                    message: {
                                        admin: {
                                            adminId: admin._id,
                                            firstName: admin.firstName,
                                            lastName: admin.lastName,
                                            email: admin.email
                                        },
                                        token: token
                                    }
                                })
                            }
                        })
                    }else{
                        res.status(500).json({
                            message: 'Incorrect Password'
                        });
                    }
                }
            });

        }else{
            res.status(500).json({
                message: 'Email doesn\'t not exists'
            });
        }
    })
    .catch(error => {
        res.status(500).json({
            error: error
        });
    })


});

module.exports = router;