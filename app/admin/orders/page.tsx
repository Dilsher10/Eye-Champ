"use client";

import AdminSidebar from "@/components/admin/AdminSidebar";
import AdminTopbar from "@/components/admin/AdminTopbar";
import { CalendarDays, ChevronDown, Download, Filter, MoreHorizontal, Search, ShoppingBag } from "lucide-react";
import { useMemo, useState } from "react";
import "../products/new/new-product.css";
import "./orders.css";

const orders = [
  {id:"#EC-1048",date:"Aug 25, 2026",time:"10:42 AM",customer:"Aisha Khan",email:"aisha@example.com",initials:"AK",items:2,total:"$128.00",payment:"Paid",fulfillment:"Unfulfilled",delivery:"Standard"},
  {id:"#EC-1047",date:"Aug 25, 2026",time:"9:18 AM",customer:"Marcus Chen",email:"marcus@example.com",initials:"MC",items:1,total:"$94.50",payment:"Paid",fulfillment:"Processing",delivery:"Express"},
  {id:"#EC-1046",date:"Aug 24, 2026",time:"7:36 PM",customer:"Sofia Martinez",email:"sofia@example.com",initials:"SM",items:3,total:"$176.00",payment:"Pending",fulfillment:"Unfulfilled",delivery:"Standard"},
  {id:"#EC-1045",date:"Aug 24, 2026",time:"5:11 PM",customer:"Noah Williams",email:"noah@example.com",initials:"NW",items:1,total:"$82.00",payment:"Paid",fulfillment:"Fulfilled",delivery:"Express"},
  {id:"#EC-1044",date:"Aug 24, 2026",time:"2:54 PM",customer:"Olivia Brown",email:"olivia@example.com",initials:"OB",items:2,total:"$145.00",payment:"Refunded",fulfillment:"Fulfilled",delivery:"Standard"},
  {id:"#EC-1043",date:"Aug 23, 2026",time:"11:20 AM",customer:"Ethan Wilson",email:"ethan@example.com",initials:"EW",items:1,total:"$68.00",payment:"Paid",fulfillment:"Processing",delivery:"Standard"},
  {id:"#EC-1042",date:"Aug 23, 2026",time:"9:05 AM",customer:"Emma Davis",email:"emma@example.com",initials:"ED",items:2,total:"$112.50",payment:"Paid",fulfillment:"Fulfilled",delivery:"Express"},
  {id:"#EC-1041",date:"Aug 22, 2026",time:"4:47 PM",customer:"Liam Taylor",email:"liam@example.com",initials:"LT",items:1,total:"$76.00",payment:"Pending",fulfillment:"Unfulfilled",delivery:"Standard"},
];

export default function OrdersPage(){
  const [menuOpen,setMenuOpen]=useState(false),[query,setQuery]=useState(""),[payment,setPayment]=useState("All payments"),[selected,setSelected]=useState<string[]>([]);
  const shown=useMemo(()=>orders.filter(order=>(payment==="All payments"||order.payment===payment)&&(`${order.id} ${order.customer} ${order.email}`.toLowerCase().includes(query.toLowerCase()))),[query,payment]);
  const toggle=(id:string)=>setSelected(value=>value.includes(id)?value.filter(item=>item!==id):[...value,id]);
  return <main className="np-admin orders-admin">
    <AdminSidebar open={menuOpen} onClose={()=>setMenuOpen(false)}/>
    <section className="np-workspace">
      <AdminTopbar onMenuOpen={()=>setMenuOpen(true)}/>
      <div className="orders-content">
        <div className="orders-head"><div><p>Sales</p><h1>Orders</h1><span>Track, fulfill, and manage customer orders.</span></div><div><button><Download size={16}/> Export orders</button><button className="create-order"><ShoppingBag size={16}/> Create order</button></div></div>
        <section className="orders-summary"><article><span>Total orders</span><strong>1,248</strong><small><b>+8.2%</b> from last month</small></article><article><span>Awaiting fulfillment</span><strong>12</strong><small><i className="orange"/> Ready to process</small></article><article><span>In transit</span><strong>28</strong><small><i className="blue"/> On the way</small></article><article><span>Returns</span><strong>4</strong><small><i className="red"/> Requires review</small></article></section>
        <section className="orders-panel">
          <div className="orders-tabs"><div><button className="active">All <span>1,248</span></button><button>Unfulfilled <span>12</span></button><button>Processing <span>8</span></button><button>Fulfilled</button><button>Returns <span>4</span></button></div><button><CalendarDays size={15}/> Aug 19 – Aug 25 <ChevronDown size={14}/></button></div>
          <div className="orders-tools"><label><Search size={16}/><input value={query} onChange={event=>setQuery(event.target.value)} placeholder="Search order, customer, or email"/></label><select value={payment} onChange={event=>setPayment(event.target.value)}><option>All payments</option><option>Paid</option><option>Pending</option><option>Refunded</option></select><select><option>All fulfillment</option><option>Unfulfilled</option><option>Processing</option><option>Fulfilled</option></select><button><Filter size={15}/> More filters</button></div>
          {selected.length>0&&<div className="orders-bulk"><strong>{selected.length} orders selected</strong><button>Mark fulfilled</button><button>Print packing slips</button><button>Archive</button><button onClick={()=>setSelected([])}>Clear</button></div>}
          <div className="orders-table"><table><thead><tr><th><input type="checkbox" checked={shown.length>0&&selected.length===shown.length} onChange={event=>setSelected(event.target.checked?shown.map(order=>order.id):[])}/></th><th>Order</th><th>Date</th><th>Customer</th><th>Payment</th><th>Fulfillment</th><th>Items</th><th>Delivery</th><th>Total</th><th/></tr></thead><tbody>{shown.map(order=><tr key={order.id}><td><input type="checkbox" checked={selected.includes(order.id)} onChange={()=>toggle(order.id)}/></td><td><strong className="order-id">{order.id}</strong></td><td><div className="order-date"><span>{order.date}</span><small>{order.time}</small></div></td><td><div className="order-customer"><span>{order.initials}</span><div><strong>{order.customer}</strong><small>{order.email}</small></div></div></td><td><Badge value={order.payment}/></td><td><Badge value={order.fulfillment}/></td><td>{order.items} {order.items===1?"item":"items"}</td><td>{order.delivery}</td><td><strong>{order.total}</strong></td><td><button aria-label={`Actions for ${order.id}`}><MoreHorizontal size={18}/></button></td></tr>)}</tbody></table></div>
          {shown.length===0&&<div className="orders-empty"><ShoppingBag size={32}/><h2>No orders found</h2><p>Try adjusting your search or payment filter.</p><button onClick={()=>{setQuery("");setPayment("All payments")}}>Clear filters</button></div>}
          <div className="orders-pagination"><span>Showing 1–{shown.length} of 1,248 orders</span><div><button disabled>←</button><button className="active">1</button><button>2</button><button>3</button><button>…</button><button>156</button><button>→</button></div></div>
        </section>
      </div>
    </section>
  </main>
}

function Badge({value}:{value:string}){return <span className={`order-badge ${value.toLowerCase()}`}><i/>{value}</span>}
