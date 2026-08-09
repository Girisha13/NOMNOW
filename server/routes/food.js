import { Router } from 'express';
import Food from '../models/Food.js';
const router = Router();
const sample = [
  ['Firecracker Noodles','Wok-tossed noodles, chilli crisp, scallions & sesame',14,'Noodles','https://images.unsplash.com/photo-1569718212165-3a8278d5f624?auto=format&fit=crop&w=900&q=85',['noodles','chilli','sesame'],false,'Hot'],
  ['Golden Crunch Burger','Crispy chicken, pickles, slaw & house sauce',16,'Burgers','https://images.unsplash.com/photo-1568901346375-23c9450c58cd?auto=format&fit=crop&w=900&q=85',['chicken','pickles','slaw'],false,'Medium'],
  ['Green Goddess Bowl','Avocado, greens, grains, herbs & citrus dressing',13,'Vegetarian','https://images.unsplash.com/photo-1512621776951-a57141f2eefd?auto=format&fit=crop&w=900&q=85',['greens','avocado','grains'],true,'Mild'],
  ['Midnight Ramen','Rich broth, noodles, egg, mushrooms & chilli oil',15,'Noodles','https://images.unsplash.com/photo-1569718212165-3a8278d5f624?auto=format&fit=crop&w=900&q=85',['ramen','egg','mushroom'],false,'Hot'],
  ['Tomato Burst Pasta','Creamy tomato sauce, parmesan & basil',14,'Pasta','https://images.unsplash.com/photo-1473093295043-cdd812d0e601?auto=format&fit=crop&w=900&q=85',['tomato','parmesan','basil'],true,'Mild'],
  ['Crispy Bao Bites','Soft bao, sticky tofu, cucumber & sesame',11,'Sides','https://images.unsplash.com/photo-1496116218417-1a781b1c416c?auto=format&fit=crop&w=900&q=85',['bao','tofu','cucumber'],true,'Medium'],
  ['Sunshine Tacos','Citrus chicken, salsa, herbs & lime crema',13,'Sandwiches','https://images.unsplash.com/photo-1551504734-5ee1c4a1479b?auto=format&fit=crop&w=900&q=85',['chicken','lime','salsa'],false,'Medium'],
  ['Golden Mango Cake','Mango cream, vanilla sponge & toasted coconut',9,'Desserts','https://images.unsplash.com/photo-1578985545062-69928b1d9587?auto=format&fit=crop&w=900&q=85',['mango','vanilla','coconut'],true,'Mild']
];
router.get('/', async (_, res) => {
  try {
    let foods = await Food.find().lean();
    if (!foods.length) foods = sample.map((x,i)=>({ _id:`demo-${i}`, name:x[0], description:x[1], price:x[2], category:x[3], image:x[4], ingredients:x[5], vegetarian:x[6], spiceLevel:x[7], availability:true, rating:4.7+i%4/10 }));
    res.json(foods);
  } catch { res.json(sample.map((x,i)=>({ _id:`demo-${i}`, name:x[0], description:x[1], price:x[2], category:x[3], image:x[4], ingredients:x[5], vegetarian:x[6], spiceLevel:x[7], availability:true, rating:4.7 }))); }
});
router.post('/', async (req,res)=>{ try { const item=await Food.create(req.body); res.status(201).json(item); } catch(e){ res.status(400).json({message:e.message}); }});
router.put('/:id', async (req,res)=>{ try { const item=await Food.findByIdAndUpdate(req.params.id,req.body,{new:true}); res.json(item); } catch(e){ res.status(400).json({message:e.message}); }});
router.delete('/:id', async (req,res)=>{ try { await Food.findByIdAndDelete(req.params.id); res.json({ok:true}); } catch(e){ res.status(400).json({message:e.message}); }});
export default router;
