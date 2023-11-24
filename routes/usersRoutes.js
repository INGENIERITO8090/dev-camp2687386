const express = require('express')
const router  = express.Router()
const usersModel = require ('../models/usersModel')
const mongoose = require('mongoose') 
// dependencias al middleware 
const {protect ,authorize} = require('../middleware/auth')



router.post('/register', async (req,res) => {
    try{
        const user = await usersModel.create(req.body)
        //crear token
        const token = user.generarJWT() 

        // opciones para la creacion de la cookie 

        res.status(200)
        .json({
            success: true,
            data: user,
            token_jwt: token,
            
        })
    }catch (error){
        res.status(500).
        json({
            success: false,
            message: error.message
        })

    }
   
})



// inicio de sesion 

router.post('/login',async (request,response) =>{
    // 1 no llega email ni password   
    // se asigna a las variables a los atributos 
   const {email,password} = request.body  
   if (!email || !password ){
    return response.status(400).json({
         succes:false , 
         message :'Faltan email o password'
      })
   }
   else{    // 2 si llega el email pero no hay uno en la base de datos 

   const user = await usersModel.findOne({email}).select("+password")
   if(!user){
    return response.status(400).json({
                succes:false,
                message :'El usuario no existe'

    }) 

   }else{

      // si llega el email pero el pasword no corresponde 
      const isMatch = await user.compararPassword(password)
      if( isMatch){
          
        const options ={
            exipires:new Date(Date.now() + process.env.COOKIE_EXPIRE *24*60*60*1000),
            httponly:true
             
            }
        const token = user.generarJWT() 
        return response.status(200).
        cookie('token',token,options)
        .json( {
                 succes:true ,
                 msg:"usuario logeado correspondientemente",
                 data:user ,
                 jwt_token:token
            

          })     

      } else{
            return  response.status(400).json({
                    succes:false , 
                     msg:" no se encontro informacion de el usuario"

                        })


      }
   
   } 
   


   }




    //3 si llega email   y el usuario existe pero el password no correspondeb 




})










module.exports = router