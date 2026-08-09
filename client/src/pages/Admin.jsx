import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom';
import { ArrowLeft } from 'lucide-react';

const API='http://localhost:5000/api';
const money=n=>`₹${Number(n||0).toLocaleString('en-IN')}`;

export default function Admin(){
 const [foods,setFoods]=useState([]);
 const [orders,setOrders]=useState([]);
 useEffect(()=>{
  axios.get(API+'/food').then(r=>setFoods(r.data||[])).catch(()=>{});
  axios.get(API+'/orders').then(r=>setOrders(r.data||[])).catch(()=>{});
 },[]);
 return <main className="admin-page section">
  <div className="admin-head"><div><p className="eyebrow">NOMNOW CONTROL ROOM</p><h1>ADMIN.</h1></div><Link to="/" className="explore-link"><ArrowLeft size={15}/> BACK TO SHOP</Link></div>
  <div className="admin-stats"><div><strong>{foods.length}</strong><span>FOOD ITEMS</span></div><div><strong>{orders.length}</strong><span>ORDERS</span></div><div><strong>{money(orders.reduce((s,o)=>s+(o.total||0),0))}</strong><span>ORDER VALUE</span></div></div>
  <section className="admin-panel"><h2>MENU ITEMS</h2><div className="admin-table">{foods.length?foods.map(f=><div className="admin-row" key={f._id}><span>{f.name}</span><span>{f.category}</span><strong>{money(f.price)}</strong></div>):<p>No API data yet. The storefront fallback menu is still available.</p>}</div></section>
 </main>
}
