const generateOtp = require('../middleware/generateOtp');
const express =require('express')
const app =express()
const mongoose = require('mongoose');
const router = new express.Router()
const bcrypt = require('bcryptjs')
const Otp =require('../models/otpModel')
const jwt = require('jsonwebtoken')
var otpGenerator = require('otp-generator')
//const multer = require('multer')
const auth = require('../middleware/authentication')
 
//const Otp = mongoose.model('Otp');


require("dotenv").config()
//insert data to database
router.post('/registration', async (req, res) => {
    const otp = new Otp(req.body)
    const email = req.body.email;
    generateOtp(email);
    try {

        await otp.save()
        res.send(otp)
        res.status(200).send()
        
    } catch {
        res.status(400).send()
    }
})



//read data from database
router.get('/registration',async(req,res)=>{
try{
    const post= await Otp.find({})
    res.send(post)
    }catch{
        res.status(500).send()
    }
})
//delete data from database
router.delete('/registration/:id',async(req,res)=>{
    try{
        const post= await Otp.findOne({_id:req.params.id})
        await Otp.remove({_id:post})
        res.send(post)
        res.status(200).send()
        }catch{
            res.status(500).send()
        }
    })
    ///update but not properly its first search and then delete and then inter 
    router.put('/registration/:id',async(req,res)=>{
        
            const post= await Otp.findOne({_id:req.params.id})
            //res.send(post)
            post.name=req.body.name
            post.password=req.body.password
            await Otp.remove({_id:post})
            res.send(post)
            const otp = new Otp(req.body)

            try {
                await otp.save()
                res.status(201).send()
            } catch {
                res.status(400).send()
            }
        })

       
    router.post('/registration/log',(req, res,next)=>
     {
            Otp.find({name : req.body.name})
            
            .exec()
            .then(otp =>
                {
                    
                    if(otp.length < 1)
                    {
                        res.status(401).send("authfailed1");
                    }
                    bcrypt.compare(req.body.password,otp[0].password,(err,result)=>
                    {
                        if(err)
                        {
                            return res.status(401).send("failed auth2222")
                        }
                        if(result)
                        {
                            const token = jwt.sign(
                                {
                                    name : otp[0].name,
                                    otpId :otp[0]._id
                                
                                },
                                process.env.JWT_KEY,
                                {
                                    expiresIn :"1h"
                                }
                            )
                            return res.status(200).json({
                                message:"successful",
                                token :token
                            })
                            
                        }
                    })
                })
            .catch(err =>
            {
                console.log(err)
                res.status(500).send("error!!!")
            })
            
    })    


    module.exports = router
    