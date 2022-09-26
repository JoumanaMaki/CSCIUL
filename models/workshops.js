import mongoose from "mongoose"

const WorkshopsSchema = new mongoose.Schema({
    name:{
        type:String
    },
    description:{
        type:String
    },
    avatar:{
        type:String,
        default:"default.png"
    },
    date:{
        type:Date,
        default:Date.now()
    },
    is_private:{
        type:Boolean,
        default:false
    },
    participants_id:[{
        type: mongoose.Schema.Types.ObjectId,
        ref:"User"
    }]
})


const Workshops = mongoose.model("Workshops", WorkshopsSchema);
export default Workshops;