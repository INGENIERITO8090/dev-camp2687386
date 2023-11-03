const express  = require('express') 
const BootcampModel =  require('../models/bootcampModel')
// definir un ruteador 
const router = express.Router()

router.get('/',async (request,response)=>{
   
    // utilizar el modelo para seleccionar el modelo de la base de datos
          
    const bootcamp =
    await BootcampModel.find()

    response.json({
      success:true,
      data:bootcamp
    })})



    // bootcaps por id
router.get('/:id', async(request,response)=>{

 //extraer el id de el bootcamp 
 // del parametro de la url 
 bootcampId   = request.params.id
 const bootcamp =  
 await BootcampModel.findById(bootcampId)

    response.json({
      success:true,
    data : bootcamp
    })})


// crear un bootcamp
    router.post('/', async (request,response)=>{ 

        // el nuevo bootcamp vendra de el nuevo body del cliente 
        // atraves de el body de la request 
        
        const  newbootcamp = 
            await BootcampModel.create(request.body)
       
        response.json({
          success:true,
          data:newbootcamp
        })})
// actualizar un bootcamp por id 

router.put('/:id', async(request,response)=>{ 


     const bootcampId = request.params.id
     const updatebootcamp = 
       await BootcampModel.findByIdAndUpdate (
        bootcampId , 
        request.body,
        {

           new:true

        }
       )
     
    response.json({
      success:true,
      data: updatebootcamp
    })}) 

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