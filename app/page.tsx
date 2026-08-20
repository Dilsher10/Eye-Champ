"use client";

import Categories from "@/components/Categories";
import Hero from "@/components/Hero";
import ImageSlider from "@/components/ImageSlider";
import Slider from "@/components/Slider";
import UnderSlider from "@/components/UnderSlider";
import Link from "next/link";
import { useEffect, useState } from "react";
import type { CSSProperties } from "react";

const shapes = ["Square", "Rectangle", "Round", "Cat-eye", "Browline", "Aviator"];
const shapeImages = ["/images/Square.webp", "/images/Rectangle.webp", "/images/Round.webp", "/images/Round.webp", "/images/Browline.webp", "/images/Aviator.webp"];
const trendBanners = ["/images/trend-banners/1.webp", "/images/trend-banners/2.webp", "/images/trend-banners/3.webp", "/images/trend-banners/4.webp"];
const mobileTrendBanners = ["/images/trend-banners/mobile/1.webp", "/images/trend-banners/mobile/2.webp", "/images/trend-banners/mobile/3.webp"];

export default function Home() {
  const [trendIndex, setTrendIndex] = useState(1);
  const [mobileTrendIndex, setMobileTrendIndex] = useState(1);
  useEffect(() => { const timer = setInterval(() => { setTrendIndex(c => (c + 1) % trendBanners.length); setMobileTrendIndex(c => (c + 1) % mobileTrendBanners.length); }, 5000); return () => clearInterval(timer); }, []);

  return <main>
    <Categories />
    <div className="page shell" id="top">
      <Hero />
      <section className="gender-grid">
        <article className="gender-card" id="men">
          <div>
            <span>FOR</span>
            <h2>MEN’S</h2>
            <Link className="btn" href="/shop-all">SHOP NOW</Link>
          </div>
        </article>
        <article className="gender-card" id="women">
          <div>
            <span>FOR</span>
            <h2>WOMEN’S</h2>
            <Link className="btn" href="/shop-all">SHOP NOW</Link>
          </div>
        </article>
      </section>
    </div>
    <Slider />
    <div className="page shell"><section className="everyone"><div className="section-title"><h2>EYEWEAR FOR EVERYONE</h2><p>Style & clarity made for you.</p></div><div className="benefits">{[["●", "Fast Delivery"], ["●", "Sunglasses"], ["●", "Sports"], ["●", "Kids"], ["●", "Safety"]].map(([icon, label]) => <div key={label}><span>{icon}</span><small>{label}</small></div>)}</div></section><section className="deal card"><div><h2>BUY ONE,<br />GET ONE 20% OFF</h2><p>Use code <b>GET20</b></p><a className="btn" href="/product">SHOP NOW</a></div></section><section className="shape-shop"><div className="section-title left"><h2>SHOP BY FRAME SHAPE</h2><p>Versatile shapes made to fit your mood and every moment.</p></div><div className="shape-grid">{shapes.map((shape, i) => <a href="/product" key={shape}><div><img src={shapeImages[i]} alt={shape} style={{ width: "100%", height: "100%", objectFit: "cover", borderRadius: "1.25vw" }} /></div><b>{shape}</b></a>)}</div></section></div>
    <ImageSlider />
    <div className="page shell"><section className="trend card"><div key={`${trendBanners[trendIndex]}-${mobileTrendBanners[mobileTrendIndex]}`} className="trend-bg" style={{ "--trend-desktop-image": `url(${trendBanners[trendIndex]})`, "--trend-mobile-image": `url(${mobileTrendBanners[mobileTrendIndex]})` } as CSSProperties} /><div><h2>THE TREND SHOP</h2><p>Curated styles, fresh colors, and must-see edits.</p><a className="btn" href="/product">SHOP NOW</a></div></section></div>
    <UnderSlider />
    <div className="page shell"><section className="payments"><div className="section-title"><h2>Payment Options Available</h2><p>Shop now and pay over time with our flexible payment options</p></div><div className="payment-logos"><b>VISA</b><b>AMEX</b><b>●●</b><b>Payoneer</b><b>▣ Pay</b><b>G Pay</b><b>PayPal</b></div></section></div>
  </main>;
}
