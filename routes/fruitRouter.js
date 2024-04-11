"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const FrutitsController_1 = __importDefault(require("../controllers/FrutitsController"));
const fruitRouter = express_1.default.Router();
fruitRouter.get("/", FrutitsController_1.default.getAllFruits);
fruitRouter.get("/:id", FrutitsController_1.default.getFruitsById);
fruitRouter.post("/", (req, res) => {
    if (Array.isArray(req.body)) {
        FrutitsController_1.default.createFruitDataCollection(req, res).then(r => console.log(`collection res : ${res}`));
    }
    else if (typeof req.body === 'object')
        FrutitsController_1.default.createFruitData(req, res).then(r => console.log(`object res : ${res}`));
});
fruitRouter.put("/:id", FrutitsController_1.default.updateFruitsData);
fruitRouter.delete("/:id", FrutitsController_1.default.deleteFruitsData);
exports.default = fruitRouter;
