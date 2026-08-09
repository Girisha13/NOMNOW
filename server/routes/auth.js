import { Router } from 'express';
import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';
import User from '../models/User.js';
const router = Router();
const tokenFor = u => jwt.sign({ id:u._id, role:u.role, name:u.name, email:u.email }, process.env.JWT_SECRET || 'dev-secret', {expiresIn:'7d'});
router.post('/register', async (req,res)=>{ try { const {name,email,password}=req.body; const exists=await User.findOne({email}); if(exists) return res.status(409).json({message:'Email already registered'}); const user=await User.create({name,email,password:await bcrypt.hash(password,10)}); res.status(201).json({token:tokenFor(user),user:{name,email,role:user.role}}); } catch(e){res.status(400).json({message:e.message});} });
router.post('/login', async (req,res)=>{ try { const {email,password}=req.body; const user=await User.findOne({email}); if(!user || !(await bcrypt.compare(password,user.password))) return res.status(401).json({message:'Invalid email or password'}); res.json({token:tokenFor(user),user:{name:user.name,email:user.email,role:user.role}}); } catch(e){res.status(400).json({message:e.message});} });
export default router;
