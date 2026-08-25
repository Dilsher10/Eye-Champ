"use client";

import Link from "next/link";
import AdminSidebar from "@/components/admin/AdminSidebar";
import AdminTopbar from "@/components/admin/AdminTopbar";
import { ArrowLeft, ImagePlus, Package, Trash2 } from "lucide-react";
import { useState } from "react";
import type { ReactNode } from "react";
import "./new-product.css";

export default function NewProductPage() {
  const [menuOpen, setMenuOpen] = useState(false);
  const [status, setStatus] = useState("Active");
  const [title, setTitle] = useState("");
  const [price, setPrice] = useState("");
  const [saved, setSaved] = useState(false);

  function saveProduct() {
    setSaved(true);
    window.setTimeout(() => setSaved(false), 2400);
  }

  return <main className="np-admin">
    <AdminSidebar open={menuOpen} onClose={() => setMenuOpen(false)}/>
    <section className="np-workspace">
      <AdminTopbar onMenuOpen={() => setMenuOpen(true)}/>
      <div className="np-content">
        <div className="np-pagehead"><div><Link href="/admin"><ArrowLeft size={16}/> Products</Link><h1>Add new product</h1><p>Create a new frame and make it available in your store.</p></div><div><Link href="/admin">Discard</Link><button className="np-draft" onClick={saveProduct}>Save as draft</button><button className="np-save" onClick={saveProduct}>Save product</button></div></div>
        {saved && <div className="np-toast"><span>✓</span> Product details saved successfully.</div>}
        <form onSubmit={event => { event.preventDefault(); saveProduct(); }}>
          <div className="np-maincol">
            <section className="np-card"><CardTitle number="01" title="Product information" subtitle="Add the basic details customers will see."/><Field className="full" label="Product title"><input value={title} onChange={e => setTitle(e.target.value)} placeholder="e.g. Avery Crystal Round Glasses"/><small>{title.length}/70 characters</small></Field><Field className="full" label="Description"><div className="np-editor"><div><button type="button"><b>B</b></button><button type="button"><i>I</i></button><button type="button">☷</button><button type="button">↗</button></div><textarea placeholder="Describe the frame style, fit, and standout features..."/></div><small>A clear description helps customers find the right frame.</small></Field><div className="np-fields"><Field label="Product type"><select defaultValue="Eyeglasses"><option>Eyeglasses</option><option>Sunglasses</option><option>Blue-light glasses</option><option>Accessories</option></select></Field><Field label="Brand"><select defaultValue="Eye Champ"><option>Eye Champ</option><option>Ray-Ban</option><option>Prada</option><option>Tom Ford</option></select></Field></div></section>
            <section className="np-card"><CardTitle number="02" title="Product media" subtitle="Add high-quality images from multiple angles." aside="0 / 8 images"/><label className="np-dropzone"><input type="file" accept="image/*" multiple/><span><ImagePlus size={24}/></span><strong>Drop images here or <u>browse files</u></strong><small>PNG, JPG or WEBP · Maximum 10 MB each</small></label><div className="np-media-tip"><span>i</span><p><strong>Image tip</strong> Use a square image with a neutral background. Recommended size is 1600 × 1600px.</p></div></section>
            <section className="np-card"><CardTitle number="03" title="Pricing" subtitle="Set the selling price and product cost."/><div className="np-fields three"><Money label="Price" value={price} onChange={setPrice}/><Money label="Compare-at price"/><Money label="Cost per item"/></div><Check label="Charge tax on this product" checked/></section>
            <section className="np-card"><CardTitle number="04" title="Inventory & shipping" subtitle="Track stock and configure fulfillment details."/><div className="np-fields"><Field label="SKU (Stock Keeping Unit)"><input placeholder="EC-FR-001"/></Field><Field label="Barcode"><input placeholder="ISBN, UPC, GTIN, etc."/></Field></div><Check label="Track quantity" checked/><div className="np-location"><div><Package size={18}/><span><strong>Eye Champ warehouse</strong><small>Main fulfillment location</small></span></div><div><label>Available</label><input type="number" defaultValue="0" min="0"/></div></div><Check label="Continue selling when out of stock"/></section>
            <section className="np-card"><CardTitle number="05" title="Frame specifications" subtitle="Add measurements and attributes customers use to compare frames."/><div className="np-fields three"><Field label="Frame shape"><select><option>Select shape</option><option>Round</option><option>Square</option><option>Aviator</option><option>Cat eye</option></select></Field><Field label="Frame material"><select><option>Select material</option><option>Acetate</option><option>Metal</option><option>Titanium</option><option>TR90</option></select></Field><Field label="Frame width"><select><option>Select width</option><option>Narrow</option><option>Medium</option><option>Wide</option></select></Field></div><div className="np-measurements"><div className="np-glasses-icon">⌁</div>{[["Lens width","52"],["Bridge","18"],["Temple length","140"],["Lens height","42"]].map(([label, placeholder]) => <Field label={label} key={label}><div><input placeholder={placeholder}/><span>mm</span></div></Field>)}</div></section>
            <section className="np-card np-variants"><CardTitle number="06" title="Variants" subtitle="Add options such as frame color and size." aside="+ Add option"/><div className="np-option"><Field label="Option name"><select defaultValue="Frame color"><option>Frame color</option><option>Size</option><option>Lens color</option></select></Field><Field label="Option values"><div className="np-tags"><span><i className="black"/> Black <button type="button">×</button></span><span><i className="tortoise"/> Tortoise <button type="button">×</button></span><input placeholder="Add value"/></div></Field><button type="button" aria-label="Delete option"><Trash2 size={17}/></button></div></section>
          </div>
          <aside className="np-sidecol">
            <section className="np-card np-status"><h2>Status</h2><label>Product status</label><select value={status} onChange={e => setStatus(e.target.value)}><option>Active</option><option>Draft</option><option>Archived</option></select><div className={status.toLowerCase()}><i/>{status === "Active" ? "This product will be visible in your store." : status === "Draft" ? "Only staff can view this product." : "This product is hidden from your store."}</div></section>
            <section className="np-card"><h2>Organization</h2><Field label="Category"><select><option>Select category</option><option>Men’s eyeglasses</option><option>Women’s eyeglasses</option><option>Sunglasses</option></select></Field><Field label="Collections"><select><option>Select collections</option><option>New arrivals</option><option>Best sellers</option><option>Under $30</option></select></Field><Field label="Tags"><input placeholder="Vintage, lightweight..."/><small>Separate tags with commas</small></Field></section>
            <section className="np-card np-preview"><div><h2>Search engine listing</h2><button type="button">Edit</button></div><p>Add a title and description to see how this product might appear in search results.</p><div><small>eye-champ.com › products</small><strong>{title || "Product title"}</strong><span>{title ? `Shop ${title} at Eye Champ. Premium eyewear made for everyday comfort.` : "Your product description will appear here once added."}</span></div></section>
          </aside>
        </form>
      </div>
    </section>
  </main>;
}

function CardTitle({number,title,subtitle,aside}:{number:string;title:string;subtitle:string;aside?:string}) { return <div className="np-cardtitle"><span>{number}</span><div><h2>{title}</h2><p>{subtitle}</p></div>{aside && <small>{aside}</small>}</div>; }
function Field({label,children,className=""}:{label:string;children:ReactNode;className?:string}) { return <label className={`np-field ${className}`}><span>{label}</span>{children}</label>; }
function Money({label,value,onChange}:{label:string;value?:string;onChange?:(value:string)=>void}) { return <Field label={label}><div className="np-money"><span>$</span><input value={value} onChange={onChange ? e => onChange(e.target.value) : undefined} inputMode="decimal" placeholder="0.00"/></div></Field>; }
function Check({label,checked=false}:{label:string;checked?:boolean}) { return <label className="np-check"><input type="checkbox" defaultChecked={checked}/>{label}</label>; }
