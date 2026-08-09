import { Router } from 'express';
import Stripe from 'stripe';
const router=Router();
router.post('/create-checkout-session', async(req,res)=>{ if(!process.env.STRIPE_SECRET_KEY || process.env.STRIPE_SECRET_KEY.includes('your_key')) return res.status(503).json({message:'Stripe is not configured. Add STRIPE_SECRET_KEY to server/.env.'}); try { const stripe=new Stripe(process.env.STRIPE_SECRET_KEY); const {items=[]}=req.body; const session=await stripe.checkout.sessions.create({mode:'payment',line_items:items.map(i=>({price_data:{currency:'inr',product_data:{name:i.name,images:i.image?[i.image]:[]},unit_amount:Math.round(Number(i.price)*100)},quantity:i.quantity})),success_url:`${process.env.CLIENT_URL}/checkout/success?session_id={CHECKOUT_SESSION_ID}`,cancel_url:`${process.env.CLIENT_URL}/cart`,metadata:{source:'NOMNOW'}}); res.json({url:session.url}); } catch(e){res.status(500).json({message:e.message});} });
export default router;
