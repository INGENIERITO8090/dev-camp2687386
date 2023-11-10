const express  = require('express') 
const reviewsModel = require('../models/reviewsModel.js')
// definir un ruteador 
const router = express.Router()
const mongoose = require('mongoose')
router.get('/',async (request,response)=>{
   
    // utilizar el modelo para seleccionar el modelo de la base de datos  
  try{  
    const review =
    await reviewsModel.find()
    if (review.length>0){ 
      response.
      status(200).json({
          success:true,
          data:review
        })
    }else {
        response.
        status(400).
        json({
                success:false,
                message:'No hay  reviews'
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
reviewId = request.params.id
  if(!mongoose.Types.ObjectId.isValid(reviewId)){
    response
    .status(500)
    .json({
      success: false,
      msg: "identificador invalido"
    })
}else{
  
  const review =  
  await reviewsModel.findById(reviewId)
  
if(review){

     response.status(200).
     json({
      success:true,
     data : review
     })
    }
  else{
    response.status(400).json({
        success:false,
        message:`NO HAY REVIEW CUYO ID ES:${reviewId}`

    })
  }
}
} catch (error) { 
  response.status(400)
  .json({
     success:false,
     message:error.message

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
          const  newreview = 
             await reviewsModel.create(request.body)

  response.status(200)
  .json({
    success:true,
    data:newreview
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
   const reviewId = request.params.id
  if(!mongoose.Types.ObjectId.isValid(reviewId)){
    response
    .status(500)
    .json({
      success: false,
      msg: "identificador invalido"
    })
} else{
  const updatereview = 
    await reviewsModel.findByIdAndUpdate (
     reviewId , 
     request.body,
     {

        new:true
     
      }
    )
    if(updatecourse){
      response.status(200)
      .json({
        success:true,
        data: updatereview
      })

    }else{
      response.status(400).json({
        success:false,
        message:`NO HAY REVIEW CUYO ID ES:${reviewId}`

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
try {
    const reviewId = request.params.id 
    if(!mongoose.Types.ObjectId.isValid(reviewId)){
        response
        .status(500)
        .json({
          success: false,
          msg: "identificador invalido"
        })
    }
    else{   
    const deletereview=
        await reviewsModel.findByIdAndDelete(reviewId)
    response.json({
      success:true,
      data:deletereview
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