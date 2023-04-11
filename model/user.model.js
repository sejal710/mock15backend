const mongoose = require("mongoose");

const schema = mongoose.Schema({
    email:{type:String,rquired:true},
    password : {type:String,required:true}
},{
    versionKey : false
})

const UserModel = mongoose.model("user",schema);

module.exports = {UserModel}