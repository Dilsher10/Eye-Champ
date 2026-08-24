"use client";

import Image from "next/image";
import Link from "next/link";
import { Bell, Boxes, ChevronDown, CircleDollarSign, Download, Filter, Glasses, Grid2X2, HelpCircle, LayoutGrid, List, Menu, MoreHorizontal, Plus, Search, Settings, ShoppingBag, SlidersHorizontal, Tag, Truck, Users, X } from "lucide-react";
import { useMemo, useState } from "react";
import "./new/new-product.css";
import "./products.css";

const nav = [["Overview",Grid2X2,"/admin"],["Orders",ShoppingBag,"#"],["Products",Glasses,"/admin/products"],["Inventory",Boxes,"#"],["Customers",Users,"#"],["Discounts",Tag,"#"]] as const;
const products = [
  {name:"Avery Crystal",sku:"EC-AV-014",type:"Eyeglasses",price:64,stock:42,status:"Active",image:"/images/product/1.avif",colors:["#171717","#d9c6b7","#b67170"]},
  {name:"Luna Tortoise",sku:"EC-LU-022",type:"Eyeglasses",price:78,stock:18,status:"Active",image:"/images/product/2.avif",colors:["#5b3219","#111","#d8e7ea"]},
  {name:"Theo Navy",sku:"EC-TH-009",type:"Eyeglasses",price:52,stock:0,status:"Draft",image:"/images/product/3.avif",colors:["#173a67","#111"]},
  {name:"Nova Cat Eye",sku:"EC-NO-031",type:"Sunglasses",price:89,stock:7,status:"Active",image:"/images/product/4.avif",colors:["#111","#9b683f","#e2c6bf"]},
  {name:"Aviator Classic",sku:"EC-AV-028",type:"Sunglasses",price:72,stock:4,status:"Active",image:"/images/Aviator.webp",colors:["#c5a34c","#979da0"]},
  {name:"Browline Bold",sku:"EC-BR-018",type:"Eyeglasses",price:68,stock:23,status:"Active",image:"/images/Browline.webp",colors:["#111","#815633"]},
  {name:"Prada PR 17",sku:"EC-PR-044",type:"Designer",price:245,stock:9,status:"Active",image:"/images/Prada.webp",colors:["#111","#643b2b"]},
  {name:"Riley Round",sku:"EC-RI-016",type:"Blue-light",price:59,stock:31,status:"Archived",image:"/images/Round.webp",colors:["#b98666","#111","#d8e7ea"]},
];

export default function ProductsPage(){
  const [menuOpen,setMenuOpen]=useState(false),[view,setView]=useState<"table"|"grid">("table"),[query,setQuery]=useState(""),[status,setStatus]=useState("All statuses"),[selected,setSelected]=useState<string[]>([]);
  const shown=useMemo(()=>products.filter(p=>(status==="All statuses"||p.status===status)&&(`${p.name} ${p.sku} ${p.type}`.toLowerCase().includes(query.toLowerCase()))),[query,status]);
  const toggle=(sku:string)=>setSelected(current=>current.includes(sku)?current.filter(x=>x!==sku):[...current,sku]);
  return <main className="np-admin pc-admin">
    <aside className={`np-sidebar ${menuOpen?"open":""}`}><div className="np-brand"><Link href="/"><Image src="/images/logo.png" alt="Eye Champ" width={150} height={46} priority/></Link><button onClick={()=>setMenuOpen(false)} aria-label="Close menu"><X size={20}/></button></div><nav><p>Workspace</p>{nav.map(([label,Icon,href])=><Link href={href} className={label==="Products"?"active":""} key={label}><Icon size={19}/><span>{label}</span>{label==="Orders"&&<em>12</em>}{label==="Inventory"&&<em>4</em>}</Link>)}<p>Management</p><a href="#"><Truck size={19}/><span>Shipping</span></a><a href="#"><CircleDollarSign size={19}/><span>Finances</span></a><a href="#"><Settings size={19}/><span>Settings</span></a></nav><div className="np-help"><HelpCircle size={18}/><strong>Need some help?</strong><p>Visit the support center for guides and answers.</p><button>Get support</button></div><div className="np-store"><span>EC</span><div><strong>Eye Champ</strong><small><i/> Store is live</small></div><MoreHorizontal size={18}/></div></aside>
    {menuOpen&&<button className="np-scrim" onClick={()=>setMenuOpen(false)} aria-label="Close menu"/>}
    <section className="np-workspace"><header className="np-topbar"><button className="np-menu" onClick={()=>setMenuOpen(true)} aria-label="Open menu"><Menu size={21}/></button><label><Search size={18}/><input placeholder="Search orders, products, customers..."/><kbd>⌘ K</kbd></label><div><button className="np-bell" aria-label="Notifications"><Bell size={19}/><i/></button><span className="np-avatar">DK</span><p><strong>Dilsher Khan</strong><small>Administrator</small></p><ChevronDown size={15}/></div></header>
      <div className="pc-content"><div className="pc-head"><div><p>Catalog</p><h1>Products</h1><span>Manage products, inventory, pricing, and visibility.</span></div><div><button><Download size={16}/> Export</button><Link href="/admin/products/new"><Plus size={17}/> Add product</Link></div></div>
        <section className="pc-summary"><article><span>All products</span><strong>128</strong><small>Across 8 collections</small></article><article><span>Active</span><strong>112</strong><small><i className="green"/> Published in store</small></article><article><span>Low stock</span><strong>9</strong><small><i className="orange"/> Needs attention</small></article><article><span>Out of stock</span><strong>3</strong><small><i className="red"/> Currently unavailable</small></article></section>
        <section className="pc-catalog"><div className="pc-tabs"><div><button className="active">All <span>128</span></button><button>Active <span>112</span></button><button>Draft <span>13</span></button><button>Archived <span>3</span></button></div><button><SlidersHorizontal size={15}/> Manage columns</button></div>
          <div className="pc-tools"><label><Search size={16}/><input value={query} onChange={e=>setQuery(e.target.value)} placeholder="Search by product name or SKU"/></label><select value={status} onChange={e=>setStatus(e.target.value)}><option>All statuses</option><option>Active</option><option>Draft</option><option>Archived</option></select><select><option>All categories</option><option>Eyeglasses</option><option>Sunglasses</option><option>Designer</option><option>Blue-light</option></select><button className="pc-filter"><Filter size={15}/> More filters</button><div className="pc-view"><button className={view==="table"?"active":""} onClick={()=>setView("table")} aria-label="Table view"><List size={17}/></button><button className={view==="grid"?"active":""} onClick={()=>setView("grid")} aria-label="Grid view"><LayoutGrid size={17}/></button></div></div>
          {selected.length>0&&<div className="pc-bulk"><strong>{selected.length} selected</strong><button>Set as active</button><button>Archive</button><button>Delete</button><button onClick={()=>setSelected([])}>Clear</button></div>}
          {view==="table"?<div className="pc-tablewrap"><table><thead><tr><th><input type="checkbox" checked={shown.length>0&&selected.length===shown.length} onChange={e=>setSelected(e.target.checked?shown.map(p=>p.sku):[])}/></th><th>Product</th><th>Status</th><th>Inventory</th><th>Type</th><th>Price</th><th>Colors</th><th/></tr></thead><tbody>{shown.map(p=><tr key={p.sku}><td><input type="checkbox" checked={selected.includes(p.sku)} onChange={()=>toggle(p.sku)}/></td><td><div className="pc-product"><span><Image src={p.image} alt="" width={70} height={52}/></span><div><strong>{p.name}</strong><small>{p.sku}</small></div></div></td><td><Status value={p.status}/></td><td><Stock value={p.stock}/></td><td>{p.type}</td><td><strong>${p.price.toFixed(2)}</strong></td><td><div className="pc-colors">{p.colors.map(c=><i style={{background:c}} key={c}/>)}</div></td><td><button aria-label={`Actions for ${p.name}`}><MoreHorizontal size={18}/></button></td></tr>)}</tbody></table></div>:<div className="pc-grid">{shown.map(p=><article key={p.sku}><label><input type="checkbox" checked={selected.includes(p.sku)} onChange={()=>toggle(p.sku)}/></label><button className="more"><MoreHorizontal size={18}/></button><div className="photo"><Image src={p.image} alt={p.name} width={240} height={160}/></div><div className="info"><div><Status value={p.status}/><small>{p.sku}</small></div><h2>{p.name}</h2><p>{p.type}</p><footer><strong>${p.price.toFixed(2)}</strong><Stock value={p.stock}/></footer></div></article>)}</div>}
          {shown.length===0&&<div className="pc-empty"><Glasses size={32}/><h2>No products found</h2><p>Try changing your search or filter selection.</p><button onClick={()=>{setQuery("");setStatus("All statuses")}}>Clear filters</button></div>}
          <div className="pc-pagination"><span>Showing 1–{shown.length} of 128 products</span><div><button disabled>←</button><button className="active">1</button><button>2</button><button>3</button><button>…</button><button>16</button><button>→</button></div></div>
        </section>
      </div>
    </section>
  </main>
}
function Status({value}:{value:string}){return <span className={`pc-status ${value.toLowerCase()}`}><i/>{value}</span>}
function Stock({value}:{value:number}){return <span className={`pc-stock ${value===0?"out":value<10?"low":""}`}>{value===0?"Out of stock":value<10?`${value} in stock`:`${value} in stock`}</span>}
