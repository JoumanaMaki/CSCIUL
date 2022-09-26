import mongoose from "mongoose"

const EventsSchema = new mongoose.Schema({
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


const Events = mongoose.model("Events", EventsSchema);
export default Events;