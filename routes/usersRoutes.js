const express = require('express')
const router  = express.Router()
const usersModel = require ('../models/usersModel')
const mongoose = require('mongoose') 



// registro de usuario 

router.post('/register',async(request,response) =>{
 try {
     const user = await  usersModel.create(request.body)
     response.status(200).json({
     succes: true , 
     data:user
 
     })
    
 } catch (error) {
    response.status(500).json({

            succes:false , 
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
          return response.status(200).json( {
                 succes:true ,
                 msg:"usuario logeado correspondientemente",
                 data:user
                

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