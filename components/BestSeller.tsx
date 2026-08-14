"use client";

import { useMemo, useState } from "react";

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

export default function BestSeller() {
    const [query, setQuery] = useState("");
    const [visible, setVisible] = useState(8);
    const filtered = useMemo(() => products.filter(([name]) => name.toLowerCase().includes(query.toLowerCase())), [query]);
    return (
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
    );
}