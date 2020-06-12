const mongoose = require('mongoose')
const bcrypt = require('bcryptjs')
require("dotenv").config()

const otpSchema = new mongoose.Schema({
    name: {
        type :String,
        required :true
    },
    password : {
        type : String,
        required :true
    },
    email:{
        type:String,
        required :true
    }
})

otpSchema.methods.generateAuthToken = async function () {
    const otp = this
    const token = jwt.sign({ _id: otp._id.toString(),name },  process.env.JWT_KEY)
    
    otp.tokens = otp.tokens.concat({ token })
    await otp.save
    return token
}


otpSchema.pre('save', async function (callback) {
    const otp = this

    if (otp.isModified('password')) {
        otp.password = await bcrypt.hash(otp.password, 8)
    }

    callback()
})


const Otp = mongoose.model('Otp', otpSchema)

module.exports = Otp
