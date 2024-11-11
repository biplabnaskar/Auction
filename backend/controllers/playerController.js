import playerModel from "../models/playermodel.js";
import fs from 'fs'

// add player

const addPlayer = async (req,res) => {
    
    let image_filename = `${req.file.filename}`;
    const player = new playerModel({

        name:req.body.name,
        grade:req.body.grade,
        category:req.body.category,
        points:req.body.points,
        team:req.body.team,
        image:image_filename
    })

    try {
        await player.save();
        res.json({success:true,message:"Player Added"})
    } catch (error) {
        console.log(error)
        res.json({success:false,message:"Error"})
    }
}

// all player list

const listPlayer = async (req,res) => {
    try {
        const players = await playerModel.find({});
        res.json({success:true,data:players})
    } catch (error) {
        console.log(error);
        res.json({success:false,message:"Error"})
    }
}

// remove player item

const removePlayer = async (req,res) => {
    try {
        const player = await playerModel.findById(req.body.id);

        fs.unlink(`uploads/${player.image}`,()=>{})

        await  playerModel.findByIdAndDelete(req.body.id);

        res.json({success:true,message:"Player Removed"})

    } catch (error) {
        console.log(error);
        res.json({success:false,message:"Error"})
    }
}

export { addPlayer,listPlayer,removePlayer}