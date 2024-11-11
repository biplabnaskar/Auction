import mongoose from "mongoose";

const playerSchema = new mongoose.Schema({
    name:{type:String,required:true},
    grade:{type:String,required:true},
    category:{type:String,required:true},
    points:{type:Number,required:true},
    team:{type:String,required:true},
    image:{type:String,required:true}
})

const playerModel = mongoose.models.player || mongoose.model("player",playerSchema)

export default playerModel;