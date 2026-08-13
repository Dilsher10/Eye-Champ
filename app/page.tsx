"use client";

import ImageSlider from "@/components/ImageSlider";
import { Heart, HelpCircle, Search, ShoppingCart, UserRound } from "lucide-react";
import { useEffect, useMemo, useState } from "react";

const products = [
  ["Clara", "Rs. 5,000", "round", "#f2d6c9"],
  ["Noah", "Rs. 4,500", "rectangle", "#c9d8dd"],
  ["Avery", "Rs. 7,000", "cat-eye", "#f2bdae"],
  ["Diana", "Rs. 6,000", "soft", "#dfc1aa"],
  ["Luna", "Rs. 5,000", "round", "#f2d6c9"],
  ["Milo", "Rs. 4,500", "rectangle", "#c9d8dd"],
  ["Zara", "Rs. 7,000", "cat-eye", "#f2bdae"],
  ["Emma", "Rs. 6,000", "soft", "#dfc1aa"],
  ["Luna", "Rs. 5,000", "round", "#f2d6c9"],
  ["Milo", "Rs. 4,500", "rectangle", "#c9d8dd"],
  ["Zara", "Rs. 7,000", "cat-eye", "#f2bdae"],
  ["Emma", "Rs. 6,000", "soft", "#dfc1aa"],
] as const;

const bestSellerImages = [
  "/images/1.webp",
  "/images/2.webp",
  "/images/3.webp",
  "/images/4.webp",
];

const shapes = ["Square", "Rectangle", "Round", "Cat-eye", "Browline", "Aviator"];
const shapeImages = [
  "/images/Square.webp",
  "/images/Rectangle.webp",
  "/images/Round.webp",
  "/images/Round.webp",
  "/images/Browline.webp",
  "/images/Aviator.webp",
];
const categories = ["Under Rs. 5000", "New Arrivals", "Best Sellers", "Top Rated", "Rectangle", "Oversized", "Cat Eye", "Premium", "On Sale"];
const trendBanners = [
  "/images/trend-banners/1.webp",
  "/images/trend-banners/2.webp",
  "/images/trend-banners/3.webp",
  "/images/trend-banners/4.webp",
];

export default function Home() {
  const [query, setQuery] = useState("");
  const [visible, setVisible] = useState(8);
  const [menu, setMenu] = useState(false);
  const [trendIndex, setTrendIndex] = useState(1);
  const filtered = useMemo(() => products.filter(([name]) => name.toLowerCase().includes(query.toLowerCase())), [query]);

  useEffect(() => {
    const timer = setInterval(() => {
      setTrendIndex((current) => (current + 1) % trendBanners.length);
    }, 5000);

    return () => clearInterval(timer);
  }, []);

  return (
    <main>
      <div className="promo">Buy one, get one 20% off. <b>Use GET20</b> · see terms</div>
      <header className="site-header shell">
        <a className="logo" href="#top" aria-label="Eye Champ home">
          <img src="/images/logo.png" alt="" />
        </a>
        <label className="search"><Search size={18} /><input value={query} onChange={(e) => setQuery(e.target.value)} placeholder="Search our AI recommended frames" /></label>
        <nav className={`utility ${menu ? "open" : ""}`} aria-label="Account links">
          <a href="#login" aria-label="Login"><UserRound size={18} /><small>Login</small></a>
          <a href="#favorites" aria-label="Favorites"><Heart size={18} /><small>Favorites</small></a>
          <a href="#help" aria-label="Help"><HelpCircle size={18} /><small>Help</small></a>
          <a href="#cart" aria-label="Cart"><ShoppingCart size={18} /><small>Cart</small></a>
        </nav>
        <button className="menu" onClick={() => setMenu(!menu)} aria-label="Toggle menu">☰</button>
      </header>

      <nav className="main-nav shell" aria-label="Shop categories">
        {['Eyeglasses', 'Sunglasses', 'Lenses', 'Sports', 'Trending Now', 'Sale'].map(x => <a key={x} href={`#${x.toLowerCase().replaceAll(' ', '-')}`}>{x}</a>)}
      </nav>
      <div className="pills shell">{categories.map(x => <button key={x}>{x}</button>)}</div>

      <div className="page shell" id="top">
        <section className="hero card">
          <div className="hero-copy"><h1>MADE FOR DIGITAL<br />MOMENTS</h1><p>Block More™ helps filter blue light during digital learning.</p><a className="btn" href="#best-sellers">SHOP NOW</a></div>
        </section>

        <section className="gender-grid">
          <article className="gender-card" id="men"><div><span>FOR</span><h2>MEN’S</h2><a className="btn" href="#best-sellers">SHOP NOW</a></div></article>
          <article className="gender-card" id="women"><div><span>FOR</span><h2>WOMEN’S</h2><a className="btn" href="#best-sellers">SHOP NOW</a></div></article>
        </section>

        <section className="best" id="best-sellers">
          <div className="section-title light"><h2>BEST SELLERS</h2><p>EYEGLASSES / SUNGLASSES</p></div>
          <div className="product-grid">
            {filtered.slice(0, visible).map(([name, price, kind, color], index) => (
              <article className="product" key={name}><b>Top Rated</b><div className="product-image"><img src={bestSellerImages[index % bestSellerImages.length]} alt={name} style={{ width: "100%", objectFit: "cover", borderRadius: "1.25vw" }} /></div><div className="product-info"><strong>{price}</strong><span>★ 4.7 <small>(200)</small></span><p>{name}</p><i style={{ background: color }} /><i /></div></article>
            ))}
          </div>
          {filtered.length === 0 && <p className="no-results">No frames match “{query}”.</p>}
          {visible < filtered.length && <button className="btn show" onClick={() => setVisible((v) => Math.min(v + 4, filtered.length))}>SHOW MORE</button>}
        </section>

        <section className="everyone">
          <div className="section-title"><h2>EYEWEAR FOR EVERYONE</h2><p>Style & clarity made for you.</p></div>
          <div className="benefits">{[["●", "Fast Delivery"], ["●", "Sunglasses"], ["●", "Sports"], ["●", "Kids"], ["●", "Safety"]].map(([icon, label]) => <div key={label}><span>{icon}</span><small>{label}</small></div>)}</div>
        </section>

        <section className="deal card">
          <div><h2>BUY ONE,<br />GET ONE 20% OFF</h2><p>Use code <b>GET20</b></p><a className="btn" href="#best-sellers">SHOP NOW</a></div>
        </section>

        <section className="shape-shop"><div className="section-title left"><h2>SHOP BY FRAME SHAPE</h2><p>Versatile shapes made to fit your mood and every moment.</p></div><div className="shape-grid">{shapes.map((shape, i) => <a href="#best-sellers" key={shape}><div><img src={shapeImages[i]} alt={shape} style={{ width: "100%", height: "100%", objectFit: "cover", borderRadius: "1.25vw" }} /></div><b>{shape}</b></a>)}</div></section>
      </div>

       <ImageSlider />

      <div className="page shell">
        <section className="trend card">
          <div
            key={trendBanners[trendIndex]}
            className="trend-bg"
            style={{ backgroundImage: `url(${trendBanners[trendIndex]})` }}
          />
          <div>
            <h2>THE TREND SHOP</h2>
            <p>Curated styles, fresh colors, and must-see edits.</p>
            <a className="btn" href="#best-sellers">SHOP NOW</a>
          </div>
        </section>
        <section className="payments"><div className="section-title"><h2>Payment Options Available</h2><p>Shop now and pay over time with our flexible payment options</p></div><div className="payment-logos"><b>VISA</b><b>AMEX</b><b>●●</b><b>Payoneer</b><b>▣ Pay</b><b>G Pay</b><b>PayPal</b></div></section>
      </div>

      <footer id="help"><div className="shell footer-grid">{[
        ['SHOP BY', 'ALL SUNGLASSES', 'ALL EYEGLASSES', 'POLARIZED', 'NEW ICONS', 'SPECIAL OFFERS'],
        ['SHOPPING ONLINE', 'SIZE GUIDE', 'ACCEPTED PAYMENT METHODS', 'PARTS & SERVICE', 'SHIPPING INFORMATION', 'CANCEL OR RETURN AN ORDER'],
        ['ABOUT US', 'OUR ICONS HISTORY', 'RAY-BAN RED', 'THE ONES', 'ONESIGHT'],
        ['DO IT IN PERSON', 'STORE LOCATOR'],
        ['HOW CAN WE HELP?', 'GET SUPPORT', 'TRACK ORDERS', 'TRACK RETURNS', 'FAQ', 'REPORT A FAKE'],
        ['CONTACT US', '+92 333 8888888', '002 888888', 'FOLLOW US', '◉ ◎ ◉ ◉ ✕']
      ].map((group) => <div key={group[0]}><h3>{group[0]}</h3>{group.slice(1).map(x => <a href="#top" key={x}>{x}</a>)}</div>)}</div><div className="copyright">© COPYRIGHT 2026 ZENNI OPTICAL, INC. ALL RIGHTS RESERVED.</div></footer>
    </main>
  );
}
