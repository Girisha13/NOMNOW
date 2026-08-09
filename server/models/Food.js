import mongoose from 'mongoose';
const foodSchema = new mongoose.Schema({
  name: { type: String, required: true }, description: String, price: { type: Number, required: true },
  category: { type: String, required: true }, image: String, ingredients: [String],
  availability: { type: Boolean, default: true }, vegetarian: Boolean, spiceLevel: String,
  rating: { type: Number, default: 4.8 }
}, { timestamps: true });
export default mongoose.model('Food', foodSchema);
