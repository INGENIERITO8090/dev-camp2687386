const express  = require('express') 
const BootcampModel =  require('../models/bootcampModel')
// definir un ruteador 
const router = express.Router()
const mongoose = require('mongoose')
router.get('/',async (request,response)=>{
   
    // utilizar el modelo para seleccionar el modelo de la base de datos
        
  try{  
    const bootcamp =
    await BootcampModel.find()
    if (bootcamp.length >0){ 
      response.
      status(200).json({
          success:true,
          data:bootcamp
        })
    }else {

        response.
        status(400).
        json({
                success:false,
                message:'No hay bootcamps'

        })
    }
    response.json({
      success:true,
      data:bootcamp
    })
  }catch(error){

   response.status(400)
                  .json({
                      success :false,
                      message:error.message 
    })
  }
  })



    // bootcaps por id
router.get('/:id', async(request,response)=>{


try {
  
  
  bootcampId   = request.params.id

  if(!mongoose.Types.ObjectId.isValid(bootcampId)){
    response
    .status(500)
    .json({
      success: false,
      msg: "identificador invalido"
    })
}else{
  
  const bootcamp =  
  await BootcampModel.findById(bootcampId)
  
if(bootcamp){

     response.status(200).
     json({
      success:true,
     data : bootcamp
     })
    }
  else{
    response.status(400).json({
        success:false,
        message:`NO HAY BOOTCAMP RCUYO ID ES:${bootcampId}`

    })
  }




}
} catch (error) { 
  response.status(400)
  .json({
     success:false,
     message:"la transaccion no pudo ser realizada"

  })
  
}

})
 //extraer el id de el bootcamp 
 // del parametro de la url 


// crear un bootcamp
    router.post('/', async (request,response)=>{ 

        // el nuevo bootcamp vendra de el nuevo body del cliente 
        // atraves de el body de la request 
        
        try {
 
          const  newbootcamp = 
             await BootcampModel.create(request.body)

  response.status(200)
  .json({
    success:true,
    data:newbootcamp
  })
} catch (error) {
   response.status(400)
   .json({
      success:false,
      data:error.message
   })
}
    
})
// actualizar un bootcamp por id 

router.put('/:id', async(request,response)=>{ 
try {
   const bootcampId = request.params.id
  if(!mongoose.Types.ObjectId.isValid(bootcampId)){
    response
    .status(500)
    .json({
      success: false,
      msg: "identificador invalido"
    })
} else{
  const updatebootcamp = 
    await BootcampModel.findByIdAndUpdate (
     bootcampId , 
     request.body,
     {

        new:true
     
      }
    )
    if(updatebootcamp){
    
      response.status(200)
      .json({
        success:true,
        data: updatebootcamp
      })

    }else{
      response.status(400).json({
        success:false,
        message:`NO HAY BOOTCAMP RCUYO ID ES:${bootcampId}`

    })

    }
}
} catch (error) {
  
  response.status(400)
  .json({
     success:false,
     data:error.message
  })

}    
 }) 

// bootcaps borrar  id

router.delete('/:id',async(request,response)=>{ 
    // id de el bootcamp 
const bootcampId = request.params.id 
const deletebootcamp=
        await BootcampModel.findByIdAndDelete(bootcampId)
    response.json({
      success:true,
      data:deletebootcamp
    })}) 
module.exports = router