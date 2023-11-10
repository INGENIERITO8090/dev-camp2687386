const express = require('express') 
const dotenv =require('dotenv') 
const colors = require('colors')
const connectionDB = require('./config/bd')
// dependencias de rutas 
const bootcampRoutes = require('./routes/bootcampRoutes')
const coursesRoutes = require('./routes/coursesRoutes') 
const reviewsRoutes = require('./routes/reviewsRoutes')
dotenv.config(
{ path:'./config/.env'}
)


connectionDB()
const app = express()
app.use(express.json())
// conectar la srutas al objeto app 
app.use('/api/v1/devcamp/bootcamps',bootcampRoutes)
app.use('/api/v1/devcamp/courses', coursesRoutes)
app.use('/api/v1/devcamp/reviews', reviewsRoutes)


// rutas de prueba 
app.get('/prueba/:id',(request,response)=>{
    response.send('HOLA DE NUEVO'+request.params.id)
})

// RUTAS DE BOOTCAMPS 
// endponint 
// consultar 



//  Usuarios 




// consultar 
app.get('/users',(request,response)=>{
    response.json({
      success:true,
      mgs:"aqui se mostraran todos los users"
    })})
    // bootcaps por id
    app.get('/users/:id',(request,response)=>{
        response.json({
          success:true,
          mgs:"aqui se mostrara el users"+request.params.id
        })})
    
    
    // crear un usuario
        app.post('/users',(request,response)=>{
            response.json({
              success:true,
              mgs:"aqui se crea un  user"
            })})
    // actualizar un usuario por id 
    
    app.put('/users/:id',(request,response)=>{
        response.json({
          success:true,
          mgs:"aqui se editara  el user"+request.params.id
        })}) 
    
    // users borrar  id
    
    app.delete('/users/:id',(request,response)=>{
        response.json({
          success:true,
          mgs:"aqui se eliminara   el user"+request.params.id
        })}) 

// consultar 
app.get('/curses',(request,response)=>{
    response.json({
      success:true,
      mgs:"aqui se mostraran todos los curses"
    })})
    // curses  por id
    app.get('/curses/:id',(request,response)=>{
        response.json({
          success:true,
          mgs:"aqui se mostrara el curses"+request.params.id
        })})
    
    
    // crear un curso 
        app.post('/curses',(request,response)=>{
            response.json({
              success:true,
              mgs:"aqui se crea un curse "
            })})
    // actualizar un usuario por id 
    
    app.put('/curses/:id',(request,response)=>{
        response.json({
          success:true,
          mgs:"aqui se editara  el curs "+request.params.id
        })}) 
    
    // curses borrar  id
    
    app.delete('/curses/:id',(request,response)=>{
        response.json({
          success:true,
          mgs:"aqui se eliminara   el curso"+request.params.id
        })}) 

// consultar reviews  
app.get('/reviews',(request,response)=>{
    response.json({
      success:true,
      mgs:"aqui se mostraran todos los reviews"
    })})
    // bootcaps por id
    app.get('/reviews/:id',(request,response)=>{
        response.json({
          success:true,
          mgs:"aqui se mostrara el reviews"+request.params.id
        })})
    
    
    // crear un usuario
        app.post('/reviews',(request,response)=>{
            response.json({
              success:true,
              mgs:"aqui se crea un  review"
            })})
    // actualizar un usuario por id 
    
    app.put('/reviews/:id',(request,response)=>{
        response.json({
          success:true,
          mgs:"aqui se editara  el review"+request.params.id
        })}) 
    
    // reviews borrar  id
    
    app.delete('/reviews/:id',(request,response)=>{
        response.json({
          success:true,
          mgs:"aqui se eliminara   el review"+request.params.id
        })}) 


app.listen( process.env.PUERTO,()=> {
 console.log( 'servidor en ejecucion: '.bgCyan+process.env.PUERTO.bgRed)
})
