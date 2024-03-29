
const jwt = require("jsonwebtoken")
require('dotenv').config();

const userGuard = (req,res,next) => {
    var authorization = req.headers.authorization;
    var token_from_client = null
    if(authorization != null && authorization != ""){
        token_from_client = authorization.split(" ")
        token_from_client = token_from_client[1]
    }

    if(token_from_client == null){
        res.status(401).send({
            message: 'Unauthorized',
        });
    }else{
        jwt.verify(token_from_client,process.env.KEY_ACCESS_TOKEN,(err,data)=>{
            if(err){
                res.status(401).send({
                    message: 'Unauthorized',
                });
            }else{
                req.user = data.profile
                next()
            }
        })
    }
    return
}

const getRole = () => {
    
}

module.exports = {
    userGuard
}