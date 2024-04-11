import express from "express";
import FruitsController from '../controllers/FrutitsController';


const fruitRouter = express.Router();

fruitRouter.get("/",FruitsController.getAllFruits);
fruitRouter.get("/:id",FruitsController.getFruitsById);
fruitRouter.post("/",(req, res)=>{
    if (Array.isArray(req.body)){
        FruitsController.createFruitDataCollection(req,res).then(r => console.log(`collection res : ${res}`))
    }
    else if(typeof req.body === 'object')
        FruitsController.createFruitData(req, res).then(r => console.log(`object res : ${res}`));
}); // handled single object and multiple object save
fruitRouter.put("/:id",FruitsController.updateFruitsData);
fruitRouter.delete("/:id",FruitsController.deleteFruitsData);


export default fruitRouter;