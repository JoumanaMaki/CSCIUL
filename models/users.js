import mongoose from "mongoose"

const UserSchema = new mongoose.Schema({
    name:{
        type:String
    },
    email:{
        type:String,
        required: true
    },
   
    password:{
        type:String,
        required:true
    },  
    gender:{
        type:String,
        enum: ['male', 'female', 'other'],
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
    major:{
        type:String
    },
    degree:{
        type: String
    },
    level:{
        type:String
    },
    workshops_id:[{
        type: mongoose.Schema.Types.ObjectId,
        ref:"User"
    }],
    events_id:[{
        type: mongoose.Schema.Types.ObjectId,
        ref:"Events"
    }]


})

const User = mongoose.model("User", UserSchema);
export default User;