const jwt = require('jsonwebtoken');

const usersModel = require('../models/usersModel')
// midel ware para proteger rutas 
// a usuarios no logueados



exports.protect = async ( req , res, next)=>{ 
    let token 
// 1 . verificar si existe  el header  'Authorization'

if (req.headers.authorization && req.headers.authorization.startsWith('Bearer')){
token = req.headers.authorization.split(' ')[1]

}
if(!token){
    return res.status(401).json({
        succes :false ,
        msg:"invalid token"


    })
}else{ 
try {
    const decoded = jwt.verify(token,process.env.JWT_SECRET_KEY) 
    // AÑADIR A EL REQUEST EL USAER console.log(decoded)
     req.user = await  usersModel.findById(decoded.id)
     next( )
    
} catch (error) {
    
}
}


}

// midellware para proteger usuarios 
//  que no tengas rol especifico 


exports.authorize = async ( req,res,next) =>{

}