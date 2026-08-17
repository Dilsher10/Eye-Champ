"use client";

import { ChevronLeft, ChevronRight, Heart, Plus, Star, Video } from "lucide-react";
import Image from "next/image";
import { useState } from "react";
import Slider from "react-slick";
import type { CustomArrowProps, Settings } from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";

type Category = "eyeglasses" | "sunglasses";

const products = {
  eyeglasses: [
    { price: "$31.95", rating: "4.7", reviews: "221", shape: "Square", image: "/images/2.webp", delivery: "", colors: ["tortoise", "#050505"] },
    { price: "$17.95", rating: "4.5", reviews: "2K+", shape: "Square", image: "/images/1.webp", delivery: "Get it as early as Thu, Aug 20", colors: ["#123ab5", "#d9ebf5", "#80634e"], more: true },
    { price: "$31.95", rating: "4.6", reviews: "223", shape: "Square", image: "/images/2.webp", delivery: "Get it as early as Thu, Aug 20", colors: ["#050505", "tortoise", "#666"] },
    { price: "$17.95", rating: "4.7", reviews: "167", shape: "Rectangle", image: "/images/4.webp", delivery: "", colors: ["#050505", "#08af20"] },
    { price: "$14.95", rating: "4.5", reviews: "4K+", shape: "Rectangle", image: "/images/3.webp", delivery: "Get it as early as Thu, Aug 20", colors: ["stripe", "multi", "#b10a89"], more: true },
    { price: "$14.95", rating: "4.5", reviews: "4K+", shape: "Rectangle", image: "/images/3.webp", delivery: "Get it as early as Thu, Aug 20", colors: ["stripe", "multi", "#b10a89"], more: true },
    { price: "$17.95", rating: "4.7", reviews: "167", shape: "Rectangle", image: "/images/4.webp", delivery: "", colors: ["#050505", "#08af20"] },
    { price: "$14.95", rating: "4.5", reviews: "4K+", shape: "Rectangle", image: "/images/3.webp", delivery: "Get it as early as Thu, Aug 20", colors: ["stripe", "multi", "#b10a89"], more: true },
    { price: "$14.95", rating: "4.5", reviews: "4K+", shape: "Rectangle", image: "/images/3.webp", delivery: "Get it as early as Thu, Aug 20", colors: ["stripe", "multi", "#b10a89"], more: true },
  ],
  sunglasses: [
    { price: "$29.95", rating: "4.8", reviews: "315", shape: "Square", image: "/images/4.webp", delivery: "", colors: ["#050505", "tortoise"] },
    { price: "$24.95", rating: "4.6", reviews: "1K+", shape: "Round", image: "/images/3.webp", delivery: "Get it as early as Thu, Aug 20", colors: ["#050505", "#825b3e", "#c78d72"], more: true },
    { price: "$31.95", rating: "4.7", reviews: "452", shape: "Aviator", image: "/images/2.webp", delivery: "", colors: ["#a98043", "#050505"] },
    { price: "$19.95", rating: "4.5", reviews: "892", shape: "Rectangle", image: "/images/1.webp", delivery: "Get it as early as Thu, Aug 20", colors: ["#050505", "#16633b", "#dbb79b"] },
    { price: "$21.95", rating: "4.6", reviews: "734", shape: "Cat Eye", image: "/images/2.webp", delivery: "Get it as early as Thu, Aug 20", colors: ["tortoise", "#050505", "#b10a89"], more: true },
    { price: "$27.95", rating: "4.8", reviews: "518", shape: "Rectangle", image: "/images/4.webp", delivery: "", colors: ["#050505", "#08af20", "#80634e"] },
  ],
} as const;

function PrevArrow({ className, onClick }: CustomArrowProps) {
  return <button type="button" className={`card-slider-arrow card-slider-prev ${className ?? ""}`} onClick={onClick} aria-label="Previous products"><ChevronLeft /></button>;
}

function NextArrow({ className, onClick }: CustomArrowProps) {
  return <button type="button" className={`card-slider-arrow card-slider-next ${className ?? ""}`} onClick={onClick} aria-label="Next products"><ChevronRight /></button>;
}

export default function BestSeller() {
  const [category, setCategory] = useState<Category>("eyeglasses");
  const [selectedColors, setSelectedColors] = useState<Record<string, number>>({});
  const selectCategory = (next: Category) => setCategory(next);
  const settings: Settings = {
    infinite: false,
    speed: 450,
    slidesToShow: 5,
    slidesToScroll: 1,
    swipeToSlide: true,
    arrows: true,
    dots: false,
    prevArrow: <PrevArrow />,
    nextArrow: <NextArrow />,
    cssEase: "cubic-bezier(.22,.61,.36,1)",
    responsive: [
      {
        breakpoint: 769,
        settings: { slidesToShow: 1, slidesToScroll: 1 },
      },
    ],
  };

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

      <Slider {...settings} className="best-slider best-product-slider" key={category}>
          {products[category].map((product, index) => {
            const productKey = `${category}-${index}`;
            const selectedColor = selectedColors[productKey] ?? 0;
            return (
            <div className="product-slide" key={`${category}-${index}`}><article className="product">
            <div className="product-image">
              <span className="product-badge">Top rated</span>
              <button className="wish-button" aria-label="Add to favorites"><Heart /></button>
              <Image src={product.image} alt={`${product.shape} glasses`} fill sizes="316px" unoptimized />
              {/* <button className="try-on"><Video fill="currentColor" />Try on</button> */}
            </div>
            <div className="product-info">
              <div className="product-meta"><strong>{product.price}</strong><span><Star fill="currentColor" /> {product.rating} <small>({product.reviews})</small></span></div>
              <p>{product.shape}</p>
              {product.delivery && <b className="delivery">{product.delivery}</b>}
              <div className="swatches" aria-label="Available colors">
                {product.colors.map((color, colorIndex) => (
                  <button
                    key={color}
                    className={`color-swatch ${color === "tortoise" || color === "stripe" || color === "multi" ? color : ""} ${selectedColor === colorIndex ? "selected" : ""}`}
                    style={color.startsWith("#") ? { backgroundColor: color } : undefined}
                    onClick={() => setSelectedColors((current) => ({ ...current, [productKey]: colorIndex }))}
                    aria-label={`Select color ${colorIndex + 1}`}
                    aria-pressed={selectedColor === colorIndex}
                  />
                ))}
                {"more" in product && product.more && <button aria-label="More colors"><Plus /></button>}
              </div>
            </div>
            </article></div>
          )})}
      </Slider>
    </section>
  );
}
