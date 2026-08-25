"use client";

import AdminSidebar from "@/components/admin/AdminSidebar";
import AdminTopbar from "@/components/admin/AdminTopbar";
import Image from "next/image";
import { ArrowUpRight, ChevronDown, ChevronRight, Filter, Layers3, MoreHorizontal, Plus, Search, Sparkles, X } from "lucide-react";
import { useMemo, useState } from "react";
import "../products/new/new-product.css";
import "./categories.css";

type Category = { id:string; name:string; slug:string; parentId:string|null; description:string; products:number; status:string; type:string; image:string; updated:string };
const initialCategories:Category[] = [
  {id:"eyeglasses",name:"Eyeglasses",slug:"eyeglasses",parentId:null,description:"All prescription and non-prescription eyeglasses.",products:99,status:"Active",type:"Manual",image:"/images/Browline.webp",updated:"Aug 25, 2026"},
  {id:"women-eyeglasses",name:"Women’s Eyeglasses",slug:"womens-eyeglasses",parentId:"eyeglasses",description:"Frames designed for every face and style.",products:42,status:"Active",type:"Manual",image:"/images/women.webp",updated:"Aug 24, 2026"},
  {id:"men-eyeglasses",name:"Men’s Eyeglasses",slug:"mens-eyeglasses",parentId:"eyeglasses",description:"Modern everyday frames for men.",products:36,status:"Active",type:"Manual",image:"/images/men.webp",updated:"Aug 23, 2026"},
  {id:"kids-eyeglasses",name:"Kids’ Glasses",slug:"kids-glasses",parentId:"eyeglasses",description:"Durable and colorful frames for kids.",products:9,status:"Draft",type:"Manual",image:"/images/Round.webp",updated:"Aug 12, 2026"},
  {id:"blue-light",name:"Blue-Light Glasses",slug:"blue-light-glasses",parentId:"eyeglasses",description:"Screen-ready lenses for everyday comfort.",products:12,status:"Draft",type:"Manual",image:"/images/Browline.webp",updated:"Aug 16, 2026"},
  {id:"sunglasses",name:"Sunglasses",slug:"sunglasses",parentId:null,description:"UV-protective prescription and fashion styles.",products:28,status:"Active",type:"Smart",image:"/images/Trend-banner.webp",updated:"Aug 22, 2026"},
  {id:"new-arrivals",name:"New Arrivals",slug:"new-arrivals",parentId:null,description:"The newest frames added to Eye Champ.",products:18,status:"Active",type:"Smart",image:"/images/Rectangle.webp",updated:"Aug 21, 2026"},
  {id:"best-sellers",name:"Best Sellers",slug:"best-sellers",parentId:null,description:"Customer favorites and top-rated eyewear.",products:24,status:"Active",type:"Smart",image:"/images/Square.webp",updated:"Aug 20, 2026"},
  {id:"under-30",name:"Under $30",slug:"under-30",parentId:null,description:"Great-looking frames at an accessible price.",products:15,status:"Active",type:"Smart",image:"/images/HP-pills-under30.avif",updated:"Aug 18, 2026"},
];

export default function CategoriesPage(){
  const [menuOpen,setMenuOpen]=useState(false),[query,setQuery]=useState(""),[status,setStatus]=useState("All statuses"),[selected,setSelected]=useState<string[]>([]),[modalOpen,setModalOpen]=useState(false);
  const [categories,setCategories]=useState(initialCategories),[expanded,setExpanded]=useState<string[]>(["eyeglasses"]),[name,setName]=useState(""),[parentId,setParentId]=useState(""),[newStatus,setNewStatus]=useState("Active"),[newType,setNewType]=useState("Manual");
  const shown=useMemo(()=>{
    const matches=(category:Category)=>(status==="All statuses"||category.status===status)&&(`${category.name} ${category.slug}`.toLowerCase().includes(query.toLowerCase()));
    if(query||status!=="All statuses") return categories.filter(matches);
    return categories.filter(category=>category.parentId===null).flatMap(parent=>[parent,...(expanded.includes(parent.id)?categories.filter(category=>category.parentId===parent.id):[])]);
  },[categories,expanded,query,status]);
  const toggle=(slug:string)=>setSelected(value=>value.includes(slug)?value.filter(item=>item!==slug):[...value,slug]);
  const toggleParent=(id:string)=>setExpanded(value=>value.includes(id)?value.filter(item=>item!==id):[...value,id]);
  function createCategory(){
    const trimmed=name.trim(); if(!trimmed)return;
    const slug=trimmed.toLowerCase().replace(/[^a-z0-9]+/g,"-").replace(/^-|-$/g,"");
    setCategories(value=>[...value,{id:`${slug}-${Date.now()}`,name:trimmed,slug,parentId:parentId||null,description:"New category",products:0,status:newStatus,type:newType,image:"/images/Browline.webp",updated:"Just now"}]);
    if(parentId)setExpanded(value=>value.includes(parentId)?value:[...value,parentId]);
    setName("");setParentId("");setNewStatus("Active");setNewType("Manual");setModalOpen(false);
  }
  return <main className="np-admin categories-admin">
    <AdminSidebar open={menuOpen} onClose={()=>setMenuOpen(false)}/>
    <section className="np-workspace">
      <AdminTopbar onMenuOpen={()=>setMenuOpen(true)}/>
      <div className="categories-content">
        <div className="categories-head"><div><p>Catalog</p><h1>Categories</h1><span>Organize products into browsable groups for your storefront.</span></div><button onClick={()=>setModalOpen(true)}><Plus size={17}/> Create category</button></div>
        <section className="categories-summary"><article><span><Layers3 size={17}/></span><div><small>Total categories</small><strong>18</strong><p>16 active, 2 drafts</p></div></article><article><span className="green"><Sparkles size={17}/></span><div><small>Smart categories</small><strong>7</strong><p>Automatically organized</p></div></article><article><span className="blue"><ArrowUpRight size={17}/></span><div><small>Most popular</small><strong>Women’s</strong><p>42 active products</p></div></article></section>
        <section className="categories-panel">
          <div className="categories-tabs"><div><button className="active">All <span>18</span></button><button>Active <span>16</span></button><button>Draft <span>2</span></button></div><button>Sort: Newest <span>↕</span></button></div>
          <div className="categories-tools"><label><Search size={16}/><input value={query} onChange={event=>setQuery(event.target.value)} placeholder="Search categories"/></label><select value={status} onChange={event=>setStatus(event.target.value)}><option>All statuses</option><option>Active</option><option>Draft</option></select><select><option>All types</option><option>Manual</option><option>Smart</option></select><button><Filter size={15}/> More filters</button></div>
          {selected.length>0&&<div className="categories-bulk"><strong>{selected.length} categories selected</strong><button>Set active</button><button>Set draft</button><button>Delete</button><button onClick={()=>setSelected([])}>Clear</button></div>}
          <div className="categories-table"><table><thead><tr><th><input type="checkbox" checked={shown.length>0&&selected.length===shown.length} onChange={event=>setSelected(event.target.checked?shown.map(item=>item.slug):[])}/></th><th>Category</th><th>Products</th><th>Type</th><th>Status</th><th>Last updated</th><th/></tr></thead><tbody>{shown.map(category=>{const childCount=categories.filter(item=>item.parentId===category.id).length;return <tr className={category.parentId?"subcategory-row":""} key={category.slug}><td><input type="checkbox" checked={selected.includes(category.slug)} onChange={()=>toggle(category.slug)}/></td><td><div className="category-cell">{category.parentId?<span className="category-branch">└</span>:childCount>0?<button className="category-expand" onClick={()=>toggleParent(category.id)} aria-label={`${expanded.includes(category.id)?"Collapse":"Expand"} ${category.name}`}>{expanded.includes(category.id)?<ChevronDown size={15}/>:<ChevronRight size={15}/>}</button>:<span className="category-expand-spacer"/>}<span className="category-photo"><Image src={category.image} alt="" width={68} height={50}/></span><div><strong>{category.name}</strong>{category.parentId&&<em>Subcategory</em>}<small>/{category.slug}</small><p>{category.description}</p></div></div></td><td><strong>{category.products}</strong> products{childCount>0&&<small className="child-count">{childCount} subcategories</small>}</td><td><span className={`category-type ${category.type.toLowerCase()}`}>{category.type==="Smart"&&<Sparkles size={11}/>} {category.type}</span></td><td><span className={`category-status ${category.status.toLowerCase()}`}><i/>{category.status}</span></td><td>{category.updated}</td><td><button aria-label={`Actions for ${category.name}`}><MoreHorizontal size={18}/></button></td></tr>})}</tbody></table></div>
          {shown.length===0&&<div className="categories-empty"><Layers3 size={32}/><h2>No categories found</h2><p>Try changing your search or status filter.</p><button onClick={()=>{setQuery("");setStatus("All statuses")}}>Clear filters</button></div>}
          <div className="categories-pagination"><span>Showing 1–{shown.length} of 18 categories</span><div><button disabled>←</button><button className="active">1</button><button>2</button><button>3</button><button>→</button></div></div>
        </section>
      </div>
    </section>
    {modalOpen&&<div className="category-modal-backdrop" onClick={()=>setModalOpen(false)}><section className="category-modal" onClick={event=>event.stopPropagation()}><header><div><h2>Create category</h2><p>Create a main category or place it beneath an existing one.</p></div><button onClick={()=>setModalOpen(false)} aria-label="Close"><X size={19}/></button></header><form onSubmit={event=>{event.preventDefault();createCategory()}}><label>Category name<input required value={name} onChange={event=>setName(event.target.value)} placeholder="e.g. Polarized sunglasses"/></label><label>Parent category<select value={parentId} onChange={event=>setParentId(event.target.value)}><option value="">None — create main category</option>{categories.filter(category=>category.parentId===null).map(category=><option value={category.id} key={category.id}>{category.name}</option>)}</select><small>{parentId?"This category will appear nested beneath its parent.":"Main categories appear at the top level."}</small></label><label>Description<textarea placeholder="Describe this category..."/></label><div className="category-form-row"><label>Category type<select value={newType} onChange={event=>setNewType(event.target.value)}><option>Manual</option><option>Smart</option></select></label><label>Status<select value={newStatus} onChange={event=>setNewStatus(event.target.value)}><option>Active</option><option>Draft</option></select></label></div><label className="category-image"><span>Category image</span><div><Plus size={18}/><strong>Upload image</strong><small>PNG, JPG or WEBP</small></div></label><footer><button type="button" onClick={()=>setModalOpen(false)}>Cancel</button><button className="save">Create category</button></footer></form></section></div>}
  </main>
}
