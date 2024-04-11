import mongoose,{Schema,Document,model} from 'mongoose';
interface FruitsModel extends Document{
    name: string,
    taste: string,
    season?: string,
    rating?: number
}

const fruitSchema = new mongoose.Schema<FruitsModel>({
    name: {type: String, required: true},
    taste: {type: String, required: true},
    season: {type: String, default: 'summer'},
    rating: {type: Number, default: 1}
});

const Fruit=mongoose.model<FruitsModel>("fruits",fruitSchema);
export default Fruit;