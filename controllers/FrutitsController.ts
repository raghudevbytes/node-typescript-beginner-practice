import {Request, Response} from "express";
import Fruits from '../models/FruitsModel';

const FruitsController = {
    async getAllFruits(req: Request, res: Response) {
        try {
            const obj = req.query; //it return the query params ?id=123&type=newType
            if (Object.entries(obj).length === 0) { //checking object has any key
                const fruits = await Fruits.find();
                res.json(fruits);
            } else {
                console.log(`query param : ${obj.name}.`) // obj.name accessing query param value by exact key
                const queryParam = obj.name;
                //mongoose find method returns promise in the newer version as per the doc, removed callback function
                Fruits.find({name: {$regex: new RegExp(`^${queryParam}$`, "i")}})
                    .then(data => res.status(200).json(data))
                    .catch(err => console.log(`error occurred, when fetching data for ${queryParam}`));
            }
            console.log(`${req.params}`)

        } catch (error) {
            res.send(400);
        }

    },
    async createFruitData(req: Request, res: Response) {
        //we can access request body by req.body
        const fruitData = new Fruits(req.body);
        console.log(`${fruitData.name} : ${fruitData.taste} : ${fruitData.season}`)
        try {
            console.log(`data saving started...`)
            await fruitData.save();
            res.status(201).json(fruitData);
        } catch (err) {
            console.log(`error occurred : ${err}`)
            console.log(`${err}`);
            res.status(400).json(err);
        }
    },
    async createFruitDataCollection(req: Request, res: Response) {
        const fruitsarray = [];
        try {
            if (Array.isArray(req.body)) { //checking request body is an array
                for (const data of req.body) {
                    const fruitModel = new Fruits(data);
                    await fruitModel.save();
                    fruitsarray.push(fruitModel);
                }
                res.status(201).json(fruitsarray);
            }
        } catch (err) {
            res.status(400).json(err);
        }
    },

    async getFruitsById(req: Request, res: Response) {
        try {
            console.log(`params...${req.params.id}`); // we can access path params by req.params
            const fruitsModel = await Fruits.findById(req.params.id);
            res.status(200).json(fruitsModel);
        } catch (error) {
            res.status(400).json(error);
        }

    },
    async updateFruitsData(req: Request, res: Response) {
        try {
            const id = req.params.id

            //EXCLUDE _ID FIELD way1
            const {_id, ...updateFields} = req.body;
            //EXCLUDE _ID FIELD and other fields way2
            const originalObj = {...req.body};
            const excludeFields = [_id];
            excludeFields.forEach(el => delete originalObj[el]);

            const updatedFruitsModel = await Fruits.findByIdAndUpdate(id, originalObj, {new: true});
            res.status(200).json(updatedFruitsModel);
        } catch (err) {
            console.log("error occurred when updating document..");
            res.status(400).json(err);
        }
    },
    async deleteFruitsData(req: Request, res: Response) {
        try {
            console.log(`going to delete following id ${req.params.id}`);
            await Fruits.findByIdAndDelete(req.params.id);
            console.log(`deleted id ${req.params.id}`);
            res.status(204).json({status: "deleted.."})
        } catch (err) {
            console.log("error occurred when deleting document..");
            res.status(400).json(err);
        }
    }
};
export default FruitsController;