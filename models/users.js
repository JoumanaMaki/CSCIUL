import mongoose from "mongoose"

const UserSchema = new mongoose.Schema({
    name:{
        type:String
    },
    email:{
        type:String,
        required: true
    },
    gender:{
        type:String,
        enum: ['male', 'female', 'other'],
    },
    password:{
        type:String,
        required:true
    }, 

    phone:{
        type: String,
    },
    avatar: {
        type: String,
        default: "default.png",
    },
    birthday:{
        type: Date,
    },
    university:{
        type:String
    },
    major:{
        type:String
    },
    degree:{
        type: String
    },
    level:{
        type:String
    }


})

const User = mongoose.model("User", UserSchema);
export default User;