import express from 'express';
import cors from 'cors';
import dotenv from 'dotenv';
import mongoose from 'mongoose';
import foodRoutes from './routes/food.js';
import orderRoutes from './routes/orders.js';
import authRoutes from './routes/auth.js';
import paymentRoutes from './routes/payments.js';

dotenv.config();
const app = express();
app.use(cors({ origin: process.env.CLIENT_URL || 'http://localhost:5173' }));
app.use(express.json());

app.get('/api/health', (_, res) => res.json({ ok: true, service: 'NOMNOW API' }));
app.use('/api/food', foodRoutes);
app.use('/api/orders', orderRoutes);
app.use('/api/auth', authRoutes);
app.use('/api/payments', paymentRoutes);

const port = process.env.PORT || 5000;
if (process.env.MONGODB_URI) {
  mongoose.connect(process.env.MONGODB_URI)
    .then(() => app.listen(port, () => console.log(`NOMNOW API running on http://localhost:${port}`)))
    .catch(err => { console.error('MongoDB connection failed:', err.message); app.listen(port, () => console.log(`NOMNOW API running without DB on http://localhost:${port}`)); });
} else {
  app.listen(port, () => console.log(`NOMNOW API running on http://localhost:${port}`));
}
