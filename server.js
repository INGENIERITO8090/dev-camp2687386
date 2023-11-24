const express = require('express') 
const dotenv =require('dotenv') 
const colors = require('colors')
const connectionDB = require('./config/bd') 
const cookieParser = require('cookie-parser')
// dependencias de rutas 
const bootcampRoutes = require('./routes/bootcampRoutes')
const coursesRoutes = require('./routes/coursesRoutes') 
const reviewsRoutes = require('./routes/reviewsRoutes')
const userRoutes = require('./routes/usersRoutes')
dotenv.config(
{ path:'./config/.env'}
) 


connectionDB()
const app = express()
app.use(express.json()) 
app.use(cookieParser())
// conectar la srutas al objeto app 
app.use('/api/v1/devcamp/bootcamps',bootcampRoutes)
app.use('/api/v1/devcamp/courses', coursesRoutes)
app.use('/api/v1/devcamp/reviews', reviewsRoutes)
app.use('/api/v1/devcamp/auth', userRoutes)



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



app.listen( process.env.PUERTO,()=> {
 console.log( 'servidor en ejecucion: '.bgCyan+process.env.PUERTO.bgRed)
})
