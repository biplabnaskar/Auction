import express from "express"
import cors from "cors"
import { connectDB } from "./config/db.js";
import playerRouter from "./routes/playerRoute.js";
 


//app config

const app = express();
const port = process.env.PORT || 4000;


// middleware
app.use(express.json())
app.use(cors())


// db connection
connectDB();

//api endpoints
app.use("/api/player",playerRouter)
app.use("/images",express.static('uploads'))

app.get("/",(req,res)=>{
    res.send("API working")
})

app.listen(port,()=>{
    console.log(`server started on http://localhost:${port}`)
})





