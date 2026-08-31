"use client";

import AdminSidebar from "@/components/admin/AdminSidebar";
import AdminTopbar from "@/components/admin/AdminTopbar";
import Image from "next/image";
import { ArrowRight, Filter, LibraryBig, MoreHorizontal, Plus, Search, Sparkles, X } from "lucide-react";
import { FormEvent, useMemo, useState } from "react";
import "../products/new/new-product.css";
import "./collections.css";

type Collection={id:string;name:string;slug:string;description:string;products:number;status:"Active"|"Draft";method:"Smart"|"Manual";image:string;rule:string;updated:string};
const initialCollections:Collection[]=[
  {id:"new-arrivals",name:"New Arrivals",slug:"new-arrivals",description:"The newest frames and eyewear recently added to Eye Champ.",products:18,status:"Active",method:"Smart",image:"/images/Rectangle.webp",rule:"Product created within last 30 days",updated:"Aug 31, 2026"},
  {id:"best-sellers",name:"Best Sellers",slug:"best-sellers",description:"Our most purchased eyeglasses and sunglasses.",products:24,status:"Active",method:"Smart",image:"/images/Square.webp",rule:"Sales count is greater than 25",updated:"Aug 30, 2026"},
  {id:"under-5000",name:"Under 5000",slug:"under-5000",description:"Affordable, stylish frames priced below 5000.",products:31,status:"Active",method:"Smart",image:"/images/HP-pills-under30.avif",rule:"Product price is less than 5000",updated:"Aug 29, 2026"},
  {id:"top-rated",name:"Top Rated",slug:"top-rated",description:"Customer favorites with consistently excellent ratings.",products:16,status:"Active",method:"Smart",image:"/images/Trend-banner.webp",rule:"Product rating is 4.5 or higher",updated:"Aug 28, 2026"},
];

export default function CollectionsPage(){
  const [menuOpen,setMenuOpen]=useState(false),[collections,setCollections]=useState(initialCollections),[query,setQuery]=useState(""),[status,setStatus]=useState("All statuses"),[selected,setSelected]=useState<string[]>([]),[modalOpen,setModalOpen]=useState(false),[name,setName]=useState(""),[method,setMethod]=useState<"Smart"|"Manual">("Smart");
  const shown=useMemo(()=>collections.filter(item=>(status==="All statuses"||item.status===status)&&(`${item.name} ${item.description}`.toLowerCase().includes(query.toLowerCase()))),[collections,query,status]);
  const toggle=(id:string)=>setSelected(value=>value.includes(id)?value.filter(item=>item!==id):[...value,id]);
  function createCollection(event:FormEvent<HTMLFormElement>){event.preventDefault();const clean=name.trim();if(!clean)return;const slug=clean.toLowerCase().replace(/[^a-z0-9]+/g,"-").replace(/^-|-$/g,"");setCollections(value=>[...value,{id:`${slug}-${Date.now()}`,name:clean,slug,description:"New storefront collection.",products:0,status:"Draft",method,image:"/images/Rectangle.webp",rule:method==="Smart"?"Configure automated conditions":"Products added manually",updated:"Just now"}]);setName("");setMethod("Smart");setModalOpen(false)}
  return <main className="np-admin collections-admin">
    <AdminSidebar open={menuOpen} onClose={()=>setMenuOpen(false)}/>
    <section className="np-workspace">
      <AdminTopbar onMenuOpen={()=>setMenuOpen(true)}/>
      <div className="collections-content">
        <div className="collections-head"><div><p>Catalog</p><h1>Collections</h1><span>Curate product groups for campaigns and storefront discovery.</span></div><button onClick={()=>setModalOpen(true)}><Plus size={17}/> Create collection</button></div>
        <section className="collection-featured">{collections.slice(0,4).map(item=><article key={item.id}><div className="collection-cover"><Image src={item.image} alt="" width={320} height={155}/><span className={item.status.toLowerCase()}><i/>{item.status}</span></div><div className="collection-card-body"><div><small>{item.method} collection</small><button aria-label={`Actions for ${item.name}`}><MoreHorizontal size={18}/></button></div><h2>{item.name}</h2><p>{item.description}</p><footer><span><strong>{item.products}</strong> products</span><button>Manage <ArrowRight size={13}/></button></footer></div></article>)}</section>
        <section className="collections-panel">
          <div className="collections-tabs"><div><button className="active">All <span>{collections.length}</span></button><button>Active <span>{collections.filter(item=>item.status==="Active").length}</span></button><button>Draft <span>{collections.filter(item=>item.status==="Draft").length}</span></button></div><button>Sort: Recently updated <span>↕</span></button></div>
          <div className="collections-tools"><label><Search size={16}/><input value={query} onChange={event=>setQuery(event.target.value)} placeholder="Search collections"/></label><select value={status} onChange={event=>setStatus(event.target.value)}><option>All statuses</option><option>Active</option><option>Draft</option></select><select><option>All methods</option><option>Smart</option><option>Manual</option></select><button><Filter size={15}/> More filters</button></div>
          {selected.length>0&&<div className="collections-bulk"><strong>{selected.length} collections selected</strong><button>Set active</button><button>Set draft</button><button>Delete</button><button onClick={()=>setSelected([])}>Clear</button></div>}
          <div className="collections-table"><table><thead><tr><th><input type="checkbox" checked={shown.length>0&&selected.length===shown.length} onChange={event=>setSelected(event.target.checked?shown.map(item=>item.id):[])}/></th><th>Collection</th><th>Method</th><th>Condition</th><th>Products</th><th>Status</th><th>Last updated</th><th/></tr></thead><tbody>{shown.map(item=><tr key={item.id}><td><input type="checkbox" checked={selected.includes(item.id)} onChange={()=>toggle(item.id)}/></td><td><div className="collection-cell"><span><Image src={item.image} alt="" width={68} height={50}/></span><div><strong>{item.name}</strong><small>/{item.slug}</small></div></div></td><td><span className={`collection-method ${item.method.toLowerCase()}`}>{item.method==="Smart"&&<Sparkles size={11}/>} {item.method}</span></td><td><span className="collection-rule">{item.rule}</span></td><td><strong>{item.products}</strong> products</td><td><span className={`collection-status ${item.status.toLowerCase()}`}><i/>{item.status}</span></td><td>{item.updated}</td><td><button aria-label={`Actions for ${item.name}`}><MoreHorizontal size={18}/></button></td></tr>)}</tbody></table></div>
          {shown.length===0&&<div className="collections-empty"><LibraryBig size={32}/><h2>No collections found</h2><p>Try changing your search or status filter.</p><button onClick={()=>{setQuery("");setStatus("All statuses")}}>Clear filters</button></div>}
          <div className="collections-pagination"><span>Showing 1–{shown.length} of {collections.length} collections</span><div><button disabled>←</button><button className="active">1</button><button>→</button></div></div>
        </section>
      </div>
    </section>
    {modalOpen&&<div className="collection-modal-backdrop" onClick={()=>setModalOpen(false)}><section className="collection-modal" onClick={event=>event.stopPropagation()}><header><div><h2>Create collection</h2><p>Build a manual group or automate it with rules.</p></div><button onClick={()=>setModalOpen(false)} aria-label="Close"><X size={19}/></button></header><form onSubmit={createCollection}><label>Collection name<input required value={name} onChange={event=>setName(event.target.value)} placeholder="e.g. Summer essentials"/></label><label>Description<textarea placeholder="Describe this collection..."/></label><label>Collection method<select value={method} onChange={event=>setMethod(event.target.value as "Smart"|"Manual")}><option>Smart</option><option>Manual</option></select><small>{method==="Smart"?"Products will be included automatically based on conditions.":"You will choose which products belong in this collection."}</small></label>{method==="Smart"&&<div className="collection-condition"><span><Sparkles size={15}/></span><div><strong>Automated condition</strong><p>Product tag is equal to</p></div><input placeholder="Tag value"/></div>}<label className="collection-image"><span>Cover image</span><div><Plus size={18}/><strong>Upload image</strong><small>Recommended 1600 × 900px</small></div></label><footer><button type="button" onClick={()=>setModalOpen(false)}>Cancel</button><button className="save">Create collection</button></footer></form></section></div>}
  </main>
}
