"use client";

import Categories from "@/components/Categories";
import ImageSlider from "@/components/ImageSlider";
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

const trendBanners = [
  "/images/trend-banners/1.webp",
  "/images/trend-banners/2.webp",
  "/images/trend-banners/3.webp",
  "/images/trend-banners/4.webp",
];

export default function Home() {
  const [query, setQuery] = useState("");
  const [visible, setVisible] = useState(8);
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
      <Categories/>

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
          {filtered.length > 8 && (
            <div className="show-row">
              {visible < filtered.length ? (
                <button className="btn show" onClick={() => setVisible((v) => Math.min(v + 4, filtered.length))}>SHOW MORE</button>
              ) : (
                <button className="btn show" onClick={() => setVisible(8)}>VIEW LESS</button>
              )}
            </div>
          )}
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
