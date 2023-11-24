const mongoose = require('mongoose')
//   definir schema  Bootcamp

const ReviewsSchema = new mongoose.Schema({
 title:{
    type:String,
    required:[
        true ,
        "el titulo es requerido "
    ],
    maxlength:[
        20," el titulo de la   review no puede ser mayor a puede ser mayor a 20 caracteres"
    ]
    
 }, 

text:{
 type:String,
    required:[true,"la review  es requerida"],
    maxlength:[50,"la review es de maximo 50 caracteres "]
},
 rating:{
     type:Number,
    required:[
        true,
        "el rating es requerido"], 
     max:[10,"la calificacion es maximo de 10"],
     min:[1,"la calificacion minima es de 1 "]      
 }, 
}) 
module.exports = mongoose.model("Review",ReviewsSchema)