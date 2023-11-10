const mongoose = require('mongoose')
//   definir schema  Bootcamp

const CoursesSchema = new mongoose.Schema({
 title:{
    type:String,
    required:[
        true ,
        "Nombre es  requerido "
    ],
    maxlength:[
        30," el titulo no puede ser mayor a puede ser mayor a 30"
    ],
    minlength:[

       10, "deben ser mas de 10 digitos"
    ]
 }, 

description:{
 type:String,
    required:[true,"El cmpo es requerido"],
    minlength:[10,"la descripcion debe ser mayor a 10 caracteres"]
},
 weeks:{
     type:Number,
    required:[
        true,
        "las semanas de duracion de el curso son requeridas"], 
     max:[9,"el numero mayor de semanas es de 9 "]      
 }, 
 enroll_cost:{
    type: Number,
    required: [true,
                "costo requerido"],
 },
 minimun_skill :{
      required:[true , "el minimun_skill es requerido"],  
    type:[String ],
  enum:[
    "Beginner",
    "Intermediate",
    "Advanced",
    "Expert"]
 } 
}) 
module.exports = mongoose.model("Courses",CoursesSchema)