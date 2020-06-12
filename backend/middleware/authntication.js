const jwt = require('jsonwebtoken');

const authentication = (req, res, next) => {

    try{

         //Extract Authorization Token
        const token = req.headers["auth-token"];
        const decoded = jwt.verify(token, 'mysecretkey');
        next();

    }catch(error){
        res.status(500).json({
            error: error
        });
    }
   

}

module.exports = authentication;