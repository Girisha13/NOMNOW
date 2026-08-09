import mongoose from 'mongoose';
const itemSchema = new mongoose.Schema({ food: { type: mongoose.Schema.Types.ObjectId, ref: 'Food' }, name: String, price: Number, quantity: Number }, { _id: false });
const orderSchema = new mongoose.Schema({ user: { type: mongoose.Schema.Types.ObjectId, ref: 'User' }, items: [itemSchema], subtotal: Number, deliveryFee: Number, discount: Number, total: Number, paymentStatus: { type: String, default: 'pending' }, orderStatus: { type: String, default: 'Pending' }, deliveryAddress: String }, { timestamps: true });
export default mongoose.model('Order', orderSchema);
