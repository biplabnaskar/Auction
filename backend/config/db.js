import mongoose from "mongoose";

export const connectDB = async () => {
    await mongoose.connect('mongodb+srv://bnaskar851:Biplab15@cluster0.joc5q.mongodb.net/auction').then(()=>console.log("DB Connected"));
}