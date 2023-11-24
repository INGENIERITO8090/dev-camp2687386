const  mongoose = require("mongoose")
const bycript = require('bcryptjs')
const jwt  = require('jsonwebtoken')
const userSchema  = new mongoose.Schema({
 name:{
    type:String , 
    required:[true,"Nombre requerido"]
 },
 email: {
    type: String, 
    unique: [true, "email esta duplicado"],
    required: [true,"email requerido"],
    match:[
        /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|.(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/,
    "email invalido"
]
}, 
 password:{
 type:String , 
 required:[true , "Password requerido"],
 maxlength:[6,"password muy alrgo"] ,
 select:false
 },
role:{
 type: String ,
 enum :["admin","user","publisher"],
 default : "user"
},
createdAt:{
type: Date,
default : Date.now

}
}) 
userSchema.pre('save',async function(){
    //generar la sal 
 const sal=   await bycript.genSalt(10,this.password,)
 
     // encriptar el password utilizando la sal 
 
 this.password = await bycript.hash(this.password,sal)

})

// metodo para comparar paswordm del usuario versus password de el body 
userSchema.methods.compararPassword= async function(password0){
 return  bycript.compare(password0,this.password)
} 

userSchema.methods.generarJWT= function(){
    return jwt.sign({
        id: this._id,
        email: this.email
                },
            process.env.JWT_SECRET_KEY,
        {
            expiresIn: process.env.JWT_EXPIRE
        }
    )
}

module.exports =mongoose.model('User', userSchema)
