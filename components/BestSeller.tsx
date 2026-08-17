"use client";

import { Heart, Plus, Star, Video } from "lucide-react";
import Image from "next/image";
import { useRef, useState } from "react";

type Category = "eyeglasses" | "sunglasses";

const products = {
  eyeglasses: [
    { price: "$31.95", rating: "4.7", reviews: "221", shape: "Square", image: "/images/2.webp", delivery: "", colors: ["tortoise", "#050505"] },
    { price: "$17.95", rating: "4.5", reviews: "2K+", shape: "Square", image: "/images/1.webp", delivery: "Get it as early as Thu, Aug 20", colors: ["#123ab5", "#d9ebf5", "#80634e"], more: true },
    { price: "$31.95", rating: "4.6", reviews: "223", shape: "Square", image: "/images/2.webp", delivery: "Get it as early as Thu, Aug 20", colors: ["#050505", "tortoise", "#666"] },
    { price: "$17.95", rating: "4.7", reviews: "167", shape: "Rectangle", image: "/images/4.webp", delivery: "", colors: ["#050505", "#08af20"] },
    { price: "$14.95", rating: "4.5", reviews: "4K+", shape: "Rectangle", image: "/images/3.webp", delivery: "Get it as early as Thu, Aug 20", colors: ["stripe", "multi", "#b10a89"], more: true },
  ],
  sunglasses: [
    { price: "$29.95", rating: "4.8", reviews: "315", shape: "Square", image: "/images/4.webp", delivery: "", colors: ["#050505", "tortoise"] },
    { price: "$24.95", rating: "4.6", reviews: "1K+", shape: "Round", image: "/images/3.webp", delivery: "Get it as early as Thu, Aug 20", colors: ["#050505", "#825b3e", "#c78d72"], more: true },
    { price: "$31.95", rating: "4.7", reviews: "452", shape: "Aviator", image: "/images/2.webp", delivery: "", colors: ["#a98043", "#050505"] },
    { price: "$19.95", rating: "4.5", reviews: "892", shape: "Rectangle", image: "/images/1.webp", delivery: "Get it as early as Thu, Aug 20", colors: ["#050505", "#16633b", "#dbb79b"] },
  ],
} as const;

export default function BestSeller() {
  const [category, setCategory] = useState<Category>("eyeglasses");
  const railRef = useRef<HTMLDivElement>(null);
  const selectCategory = (next: Category) => { setCategory(next); railRef.current?.scrollTo({ left: 0 }); };

  return (
    <section className="best" id="best-sellers" aria-labelledby="best-sellers-title">
      <header className="best-header">
        <h2 id="best-sellers-title">BEST SELLERS</h2>
        <a className="best-shop-all" href="#best-sellers">Shop all</a>
        <div className="best-tabs" role="group" aria-label="Choose a frame category">
          <button className={category === "eyeglasses" ? "active" : ""} onClick={() => selectCategory("eyeglasses")}>Eyeglasses</button>
          <button className={category === "sunglasses" ? "active" : ""} onClick={() => selectCategory("sunglasses")}>Sunglasses</button>
        </div>
      </header>

      <div className="product-rail" ref={railRef} key={category}>
        {products[category].map((product, index) => (
          <article className="product" key={`${category}-${index}`}>
            <div className="product-image">
              <span className="product-badge">Top rated</span>
              <button className="wish-button" aria-label="Add to favorites"><Heart /></button>
              <Image src={product.image} alt={`${product.shape} glasses`} fill sizes="316px" unoptimized />
              <button className="try-on"><Video fill="currentColor" />Try on</button>
            </div>
            <div className="product-info">
              <div className="product-meta"><strong>{product.price}</strong><span><Star fill="currentColor" /> {product.rating} <small>({product.reviews})</small></span></div>
              <p>{product.shape}</p>
              {product.delivery && <b className="delivery">{product.delivery}</b>}
              <div className="swatches">
                {product.colors.map((color) => <i key={color} className={color === "tortoise" || color === "stripe" || color === "multi" ? color : ""} style={color.startsWith("#") ? { backgroundColor: color } : undefined} />)}
                {"more" in product && product.more && <button aria-label="More colors"><Plus /></button>}
              </div>
            </div>
          </article>
        ))}
      </div>
    </section>
  );
}
