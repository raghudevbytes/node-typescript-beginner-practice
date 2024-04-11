"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __rest = (this && this.__rest) || function (s, e) {
    var t = {};
    for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p) && e.indexOf(p) < 0)
        t[p] = s[p];
    if (s != null && typeof Object.getOwnPropertySymbols === "function")
        for (var i = 0, p = Object.getOwnPropertySymbols(s); i < p.length; i++) {
            if (e.indexOf(p[i]) < 0 && Object.prototype.propertyIsEnumerable.call(s, p[i]))
                t[p[i]] = s[p[i]];
        }
    return t;
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const FruitsModel_1 = __importDefault(require("../models/FruitsModel"));
const FruitsController = {
    getAllFruits(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const obj = req.query;
                if (Object.entries(obj).length === 0) {
                    const fruits = yield FruitsModel_1.default.find();
                    res.json(fruits);
                }
                else {
                    console.log(`query param : ${obj.name}.`);
                    const queryParam = obj.name;
                    FruitsModel_1.default.find({ name: { $regex: new RegExp(`^${queryParam}$`, "i") } })
                        .then(data => res.status(200).json(data))
                        .catch(err => console.log(`error occurred, when fetching data for ${queryParam}`));
                }
                console.log(`${req.params}`);
            }
            catch (error) {
                res.send(400);
            }
        });
    },
    createFruitData(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            const fruitData = new FruitsModel_1.default(req.body);
            console.log(`${fruitData.name} : ${fruitData.taste} : ${fruitData.season}`);
            try {
                console.log(`data saving started...`);
                yield fruitData.save();
                res.status(201).json(fruitData);
            }
            catch (err) {
                console.log(`error occurred : ${err}`);
                console.log(`${err}`);
                res.status(400).json(err);
            }
        });
    },
    createFruitDataCollection(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            const fruitsarray = [];
            try {
                if (Array.isArray(req.body)) {
                    for (const data of req.body) {
                        const fruitModel = new FruitsModel_1.default(data);
                        yield fruitModel.save();
                        fruitsarray.push(fruitModel);
                    }
                    res.status(201).json(fruitsarray);
                }
            }
            catch (err) {
                res.status(400).json(err);
            }
        });
    },
    getFruitsById(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                console.log(req.params);
                console.log(`params...${req.params.id}`);
                const fruitsModel = yield FruitsModel_1.default.findById(req.params.id);
                res.status(200).json(fruitsModel);
            }
            catch (error) {
                res.status(400).json(error);
            }
        });
    },
    updateFruitsData(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const id = req.params.id;
                const originalObj = Object.assign({}, req.body);
                Object.entries(originalObj).forEach(k => {
                    console.log(k[0] + '-' + k[1]);
                });
                console.log(`${originalObj.toString()}`);
                //EXCLUDE _ID FIELD
                const _a = req.body, { _id } = _a, updateFields = __rest(_a, ["_id"]);
                const excludeFields = [_id];
                excludeFields.forEach(el => delete originalObj[el]);
                console.log(`${originalObj}`);
                const updatedFruitsModel = yield FruitsModel_1.default.findByIdAndUpdate(id, originalObj, { new: true });
                res.status(200).json(updatedFruitsModel);
            }
            catch (err) {
                console.log("error occurred when updating document..");
                res.status(400).json(err);
            }
        });
    },
    deleteFruitsData(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                console.log(`going to delete following id ${req.params.id}`);
                yield FruitsModel_1.default.findByIdAndDelete(req.params.id);
                console.log(`deleted id ${req.params.id}`);
                res.status(204).json({ status: "deleted.." });
            }
            catch (err) {
                console.log("error occurred when deleting document..");
                res.status(400).json(err);
            }
        });
    }
};
exports.default = FruitsController;
