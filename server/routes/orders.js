import { Router } from 'express';
import Order from '../models/Order.js';
import { auth } from '../middleware/auth.js';
const router=Router();
router.post('/', async(req,res)=>{ try { const order=await Order.create(req.body); res.status(201).json(order); } catch(e){res.status(400).json({message:e.message});} });
router.get('/', auth, async(req,res)=>{ try { const orders=req.user.role==='admin'?await Order.find().sort('-createdAt'):await Order.find({user:req.user.id}).sort('-createdAt'); res.json(orders); } catch(e){res.status(400).json({message:e.message});} });
router.patch('/:id/status', auth, async(req,res)=>{ if(req.user.role!=='admin') return res.status(403).json({message:'Admin access required'}); try { const order=await Order.findByIdAndUpdate(req.params.id,{orderStatus:req.body.status},{new:true}); res.json(order); } catch(e){res.status(400).json({message:e.message});} });
export default router;
