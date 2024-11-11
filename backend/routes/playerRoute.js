import express from "express";
import { addPlayer, listPlayer, removePlayer } from "../controllers/playerController.js";
import multer from "multer";

const playerRouter = express.Router();

//Image Storage Engine

const storage = multer.diskStorage({
    destination:"uploads",
    filename:(req,file,cb)=>{
        return cb(null,`${Date.now()}${file.originalname}`)
    }
})

const upload = multer({storage:storage})

playerRouter.post("/add",upload.single("image"),addPlayer)
playerRouter.get("/list",listPlayer)
playerRouter.post("/remove",removePlayer)



export default playerRouter;