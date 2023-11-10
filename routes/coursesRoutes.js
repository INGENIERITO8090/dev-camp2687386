const express  = require('express') 
const coursesModel = require('../models/coursesModel.js')
// definir un ruteador 
const router = express.Router()
const mongoose = require('mongoose')
router.get('/',async (request,response)=>{
   
    // utilizar el modelo para seleccionar el modelo de la base de datos  
  try{  
    const course =
    await coursesModel.find()
    if (course.length >0){ 
      response.
      status(200).json({
          success:true,
          data:course
        })
    }else {
        response.
        status(400).
        json({
                success:false,
                message:'No hay  courses'
        })
    }
  
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
coursesId = request.params.id
  if(!mongoose.Types.ObjectId.isValid(coursesId)){
    response
    .status(500)
    .json({
      success: false,
      msg: "identificador invalido"
    })
}else{
  
  const course =  
  await coursesModel.findById(coursesId)
  
if(course){

     response.status(200).
     json({
      success:true,
     data : course
     })
    }
  else{
    response.status(400).json({
        success:false,
        message:`NO HAY course CUYO ID ES:${coursesId}`

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
          const  newcourse = 
             await coursesModel.create(request.body)

  response.status(200)
  .json({
    success:true,
    data:newcourse
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
   const courseId = request.params.id
  if(!mongoose.Types.ObjectId.isValid(courseId)){
    response
    .status(500)
    .json({
      success: false,
      msg: "identificador invalido"
    })
} else{
  const updatecourse = 
    await coursesModel.findByIdAndUpdate (
     courseId , 
     request.body,
     {

        new:true
     
      }
    )
    if(updatecourse){
      response.status(200)
      .json({
        success:true,
        data: updatecourse
      })

    }else{
      response.status(400).json({
        success:false,
        message:`NO HAY curso CUYO ID ES:${courseId}`

    })

    }
}
} catch (error) {
  
  

}    
 }) 

// bootcaps borrar  id

router.delete('/:id',async(request,response)=>{ 
    // id de el bootcamp 
try {
    const courseId = request.params.id 
    if(!mongoose.Types.ObjectId.isValid(courseId)){
        response
        .status(500)
        .json({
          success: false,
          msg: "identificador invalido"
        })
    }
    else{   
    const deletecourse=
        await coursesModel.findByIdAndDelete(courseId)
    response.json({
      success:true,
      data:deletecourse
    })
}
} catch (error) {
    response.status(400)
  .json({
     success:false,
     data:error.message
  })
    
}
}) 

module.exports = router