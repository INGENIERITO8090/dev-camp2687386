const mongoose = require('mongoose')
//   definir schema  Bootcamp

const BootcampSchema = new mongoose.Schema({
 name:{
    type:String,
    unique:true,
    required:[
        true ,
        "Nombre es  requerido "
    ]
 }, 
 phone:{
     type:Number,
    required:[
        true,
        "telefono requerido"],
    maxlength:[
        10,"telefono no puede ser mayor a 10"
    ],
    minlength:[

        7 , "deben ser mas de 7 digitos"
    ]
 }, 
 address:{
    type: String,
    required: [true,
                "direccion requerida"],
 },
 topics :{
  type:[String ],
  enum:[
    "Backend",
    "Frontend",
    "Devops",
    "AI"]
 } ,
 createdAt:Date
}) 
module.exports = mongoose.model("Bootcamps",BootcampSchema)