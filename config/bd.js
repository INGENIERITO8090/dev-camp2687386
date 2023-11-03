const mongoose = require('mongoose')
 const connectionDB = async() => {
   await mongoose.connect(process.env.MONGO_URL) 
   console.log(" Mondgodb Conectado") 
}
module.exports=  connectionDB