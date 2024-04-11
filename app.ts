import express from 'express';
import env from 'dotenv';
import mongoose from "mongoose";
import FruitRoutes from "./routes/fruitRouter";
import morgan from "morgan";

env.config({path : './config-dev.env'});

const PORT = process.env.PORT;
const MONGO_DB = process.env.MONGO_DB ??"mongodb://127.0.0.1:27017/node-learning";

mongoose.connect(MONGO_DB,
    {
        "useNewUrlParser": true,
        "useUnifiedTopology": true,
    })
    .then(() => console.log('MongoDB connected'))
    .catch(err => console.error('MongoDB connection error:', err));

const app= express();
app.use(morgan('dev'));
app.use(express.json());

app.use("/api/fruits",FruitRoutes);

app.listen(PORT,()=>{
    console.log(`Server is running....${PORT}`);
})