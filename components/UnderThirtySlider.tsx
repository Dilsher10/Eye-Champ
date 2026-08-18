"use client";

import { ChevronLeft, ChevronRight, Heart, Plus, Star, Video } from "lucide-react";
import Image from "next/image";
import { useState } from "react";
import Slider from "react-slick";
import type { CustomArrowProps, Settings } from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";

const products = [
  { badge: "Best seller", price: "$21.95", rating: "4.2", reviews: "222", shape: "Square", image: "/images/2.webp", colors: ["#050505", "tortoise"] },
  { badge: "Top rated", price: "$14.95", rating: "4.6", reviews: "997", shape: "Oval", image: "/images/3.webp", colors: ["tortoise", "stripe", "#b70f12"] },
  { badge: "Top rated", price: "$14.95", rating: "4.5", reviews: "987", shape: "Square", image: "/images/4.webp", colors: ["tortoise", "#b70f12", "#050505"], more: true },
  { badge: "Top rated", price: "$21.95", rating: "4.5", reviews: "858", shape: "Round", image: "/images/2.webp", colors: ["tortoise", "#143db6", "#80634e"] },
  { badge: "Top rated", price: "$17.95", rating: "4.5", reviews: "2K+", shape: "Square", image: "/images/1.webp", colors: ["#143db6", "#dbeaf0", "#80634e"], more: true },
  { badge: "Top rated", price: "$19.95", rating: "4.7", reviews: "641", shape: "Rectangle", image: "/images/4.webp", colors: ["#050505", "#825b3e", "#d5b28e"] },
  { badge: "Best seller", price: "$24.95", rating: "4.8", reviews: "1K+", shape: "Cat Eye", image: "/images/3.webp", colors: ["stripe", "#050505", "#b10a89"], more: true },
] as const;

function PrevArrow({ className, onClick }: CustomArrowProps) {
  return <button type="button" className={`card-slider-arrow card-slider-prev ${className ?? ""}`} onClick={onClick} aria-label="Previous products"><ChevronLeft /></button>;
}

function NextArrow({ className, onClick }: CustomArrowProps) {
  return <button type="button" className={`card-slider-arrow card-slider-next ${className ?? ""}`} onClick={onClick} aria-label="Next products"><ChevronRight /></button>;
}

export default function UnderThirtySlider() {
  const [selectedColors, setSelectedColors] = useState<Record<number, number>>({});
  const [favorites, setFavorites] = useState<Record<number, boolean>>({});
  const settings: Settings = {
    infinite: false,
    speed: 420,
    slidesToShow: 5,
    slidesToScroll: 1,
    swipeToSlide: true,
    arrows: true,
    dots: false,
    prevArrow: <PrevArrow />,
    nextArrow: <NextArrow />,
    responsive: [
      { breakpoint: 1280, settings: { slidesToShow: 4 } },
      { breakpoint: 980, settings: { slidesToShow: 3 } },
      { breakpoint: 700, settings: { slidesToShow: 1.18, arrows: false } },
    ],
  };

  return (
    <section className="best under-thirty" id="under-thirty" aria-labelledby="under-thirty-title">
      <header className="best-header">
        <h2 id="under-thirty-title">UNDER 5000 PICKS</h2>
        <a className="best-shop-all" href="#under-thirty">Shop all</a>
      </header>

      <Slider {...settings} className="best-slider best-product-slider">
        {products.map((product, index) => (
          <div className="product-slide" key={`${product.shape}-${index}`}>
            <article className="product">
              <div className="product-image">
                <span className="product-badge">{product.badge}</span>
                <button className={`wish-button ${favorites[index] ? "selected" : ""}`} onClick={() => setFavorites((current) => ({ ...current, [index]: !current[index] }))} aria-label={favorites[index] ? "Remove from favorites" : "Add to favorites"} aria-pressed={Boolean(favorites[index])}><Heart fill={favorites[index] ? "currentColor" : "none"} /></button>
                <Image src={product.image} alt={`${product.shape} eyeglasses`} fill sizes="(max-width: 700px) 82vw, 20vw" unoptimized />
                {/* <button className="try-on" type="button"><Video fill="currentColor" />Try on</button> */}
              </div>
              <div className="product-info">
                <div className="product-meta"><strong>{product.price}</strong><span><Star fill="currentColor" /> {product.rating} <small>({product.reviews})</small></span></div>
                <p>{product.shape}</p>
                <b className="delivery">Get it as early as Thu, Aug 20</b>
                <div className="swatches" aria-label="Available colors">
                  {product.colors.map((color, colorIndex) => (
                    <button type="button" key={`${color}-${colorIndex}`} className={`color-swatch ${["tortoise", "stripe"].includes(color) ? color : ""} ${(selectedColors[index] ?? 0) === colorIndex ? "selected" : ""}`} style={color.startsWith("#") ? { backgroundColor: color } : undefined} onClick={() => setSelectedColors((current) => ({ ...current, [index]: colorIndex }))} aria-label={`Select color ${colorIndex + 1}`} aria-pressed={(selectedColors[index] ?? 0) === colorIndex} />
                  ))}
                  {"more" in product && product.more && <button type="button" aria-label="More colors"><Plus /></button>}
                </div>
              </div>
            </article>
          </div>
        ))}
      </Slider>
    </section>
  );
}
