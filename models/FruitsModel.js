"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const mongoose_1 = __importDefault(require("mongoose"));
const fruitSchema = new mongoose_1.default.Schema({
    name: { type: String, required: true },
    taste: { type: String, required: true },
    season: { type: String, default: 'summer' },
    rating: { type: Number, default: 1 }
});
const Fruit = mongoose_1.default.model("fruits", fruitSchema);
exports.default = Fruit;
