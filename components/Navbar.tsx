"use client";
import { Heart, HelpCircle, Search, ShoppingCart, UserRound } from "lucide-react";
import Link from "next/link";
import { useState } from "react";

export default function Navbar() {
    const [menu, setMenu] = useState(false);
    const [query, setQuery] = useState("");
    return (
        <>
            <header className="site-header shell">
                <a className="logo" href="#top" aria-label="Eye Champ home">
                    <img src="/images/logo.png" alt="" />
                </a>
                <label className="search"><Search size={18} /><input value={query} onChange={(e) => setQuery(e.target.value)} placeholder="Search our AI recommended frames" /></label>
                <nav className={`utility ${menu ? "open" : ""}`} aria-label="Account links">
                    <Link href="/admin" aria-label="Login"><UserRound size={18} /><small>Login</small></Link>
                    <a href="#favorites" aria-label="Favorites"><Heart size={18} /><small>Favorites</small></a>
                    <a href="#help" aria-label="Help"><HelpCircle size={18} /><small>Help</small></a>
                    <a href="#cart" aria-label="Cart"><ShoppingCart size={18} /><small>Cart</small></a>
                </nav>
                <button className="menu" onClick={() => setMenu(!menu)} aria-label="Toggle menu">☰</button>
            </header>

            <nav className="main-nav" aria-label="Shop categories">
                <div className="mega-trigger">
                    <a className="mega-link" href="/shop-all">Eyeglasses</a>
                    <section className="mega-menu" aria-label="Eyeglasses menu">
                        <div className="mega-inner">
                            <div className="mega-column"><b>Eyeglasses</b>{["All Eyeglasses", "Women", "Men", "Kids", "Best Sellers", "New Arrivals", "Accessories"].map(x => <a href="/shop-all" key={x}>{x}</a>)}</div>
                            <div className="mega-column"><b>Shop By</b>{["Fashion", "Classic", "Premium", "Under $30", "Progressives", "Zenni Featherlite™", "EcoBloomz™ ECO Friendly", "Active Style", "Protective & Safety", "Headset Compatible"].map(x => <a href="/shop-all" key={x}>{x}</a>)}</div>
                            <div className="mega-column"><b>Featured</b>{["Lunar New Year", "Zenniverse", "On Sale", "Face Shape", "Virtual Try On"].map(x => <a href="/shop-all" key={x}>{x}</a>)}</div>
                            <a className="mega-card" href="/shop-all"><img src="/images/Square.webp" alt="Zenni Featherlite eyeglasses" /><span>Zenni Featherlite™</span></a>
                            <a className="mega-card" href="/shop-all"><img src="/images/women.webp" alt="Kids glasses" /><span>Kids Glasses</span></a>
                        </div>
                    </section>
                </div>
                <div className="mega-trigger">
                    <a className="mega-link" href="/shop-all">Sunglasses</a>
                    <section className="mega-menu" aria-label="Sunglasses menu">
                        <div className="mega-inner">
                            <div className="mega-column"><b>Sunglasses</b>{["All Sunglasses", "Women", "Men", "Kids", "Prescription Sunglasses", "Non-Prescription Sunglasses", "Best Sellers", "New Arrivals", "Accessories"].map(x => <a href="/shop-all" key={x}>{x}</a>)}</div>
                            <div className="mega-column"><b>Shop By</b>{["Fashion", "Classic", "Premium", "Under $30", "Polarized", "Sports", "Active Style", "Clip-Ons"].map(x => <a href="/shop-all" key={x}>{x}</a>)}</div>
                            <div className="mega-column"><b>Featured</b>{["Jelly Tints", "Designer Inspired", "Aviators", "On Sale", "Virtual Try On"].map(x => <a href="/shop-all" key={x}>{x}</a>)}</div>
                            <a className="mega-card" href="/shop-all"><img src="/images/trend-banners/3.webp" alt="Woman wearing dark sunglasses" /><span>Sunglasses Guide</span></a>
                            <a className="mega-card" href="/shop-all"><img src="/images/trend-banners/4.webp" alt="Woman wearing fashion sunglasses" /><span>Fashion Sunglasses</span></a>
                        </div>
                    </section>
                </div>
                <div className="mega-trigger">
                    <a className="mega-link" href="#lenses">Lenses</a>
                    <section className="mega-menu" aria-label="Lenses menu">
                        <div className="mega-inner">
                            <div className="mega-column"><b>Prescription</b>{["Progressives", "Bifocals", "Readers"].map(x => <a href="/shop-all" key={x}>{x}</a>)}</div>
                            <div className="mega-column"><b>Innovation</b>{["EyeQLenz™ + Zenni ID Guard™", "Blokz™ Blue Light Filtering", "Privacy Zenni ID Guard™"].map(x => <a href="/shop-all" key={x}>{x}</a>)}</div>
                            <div className="mega-column"><b>Specialty</b>{["Transitions®", "Night Driving", "VR Meta Quest 3 Headsets", "FL-41 for Light Sensitivity", "Polycarbonate Impact Resistant", "Trivex Impact Resistant"].map(x => <a href="/shop-all" key={x}>{x}</a>)}</div>
                            <a className="mega-card" href="/shop-all"><img src="/images/trend-banners/2.webp" alt="Blokz blue light filtering lenses" /><span>Blokz™</span></a>
                            <a className="mega-card" href="/shop-all"><img src="/images/brand-banners/tom-ford.webp" alt="Transitions XTRActive lenses" /><span>Transitions® XTRActive</span></a>
                        </div>
                    </section>
                </div>
                <div className="mega-trigger">
                    <a className="mega-link" href="#sports">Sports</a>
                    <section className="mega-menu" aria-label="Sports menu">
                        <div className="mega-inner">
                            <div className="mega-column"><b>Glasses</b>{["All Sports Sunglasses", "All Sports Eyeglasses", "Men", "Women"].map(x => <a href="/shop-all" key={x}>{x}</a>)}</div>
                            <div className="mega-column"><b>Activity</b>{["Running", "Cycling", "Hiking & Mountaineering", "Golf", "Court Sports", "Active Style", "Protective Goggles"].map(x => <a href="/shop-all" key={x}>{x}</a>)}</div>
                            <div className="mega-column"><b>Lenses</b>{["Polarized", "Transitions®", "EyeQLenz™ + Zenni ID Guard™"].map(x => <a href="/shop-all" key={x}>{x}</a>)}</div>
                            <a className="mega-card" href="/shop-all"><img src="/images/trend-banners/1.webp" alt="Performance sports sunglasses" /><span>Sunglasses Guide</span></a>
                            <a className="mega-card" href="/shop-all"><img src="/images/men.webp" alt="Cyclist wearing sports glasses" /><span>Cycling</span></a>
                        </div>
                    </section>
                </div>
                <div className="mega-trigger">
                    <a className="mega-link mega-trending" href="#trending-now">✨ Trending Now</a>
                    <section className="mega-menu" aria-label="Trending Now menu">
                        <div className="mega-inner">
                            <div className="mega-column"><b>Color</b>{["Tortoiseshell", "Sunset Hues", "Jelly Tints", "Baby Pink", "Citrus Burst", "Transformative Teal", "Coastal Cool", "Essential Neutrals", "Transparent & Clear", "Game Day"].map(x => <a href="/shop-all" key={x}>{x}</a>)}</div>
                            <div className="mega-column"><b>Styles</b>{["Country Concert", "Summer Camp", "'90s Inspired", "Retro", "Quiet Luxury", "Minimalist", "Bold", "Oversized", "As Seen On Tiktok"].map(x => <a href="/shop-all" key={x}>{x}</a>)}</div>
                            <div className="mega-column"><b>Collections</b>{["Zodiacs", "Lunar New Year", "Rimless", "Aviators"].map(x => <a href="/shop-all" key={x}>{x}</a>)}</div>
                            <a className="mega-card" href="/shop-all"><img src="/images/Round.webp" alt="Oval glasses" /><span>Ovals</span></a>
                            <a className="mega-card" href="/shop-all"><img src="/images/Trend-banner.webp" alt="Trending eyewear styles" /><span>The Trend Shop</span></a>
                        </div>
                    </section>
                </div>
                <a className="sale-link" href="#sale">🛍 Sale</a>
            </nav>
        </>
    );
}
