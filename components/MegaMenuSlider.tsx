"use client";

import Image from "next/image";
import Link from "next/link";
import { ChevronLeft, ChevronRight } from "lucide-react";
import { useRef, useState } from "react";
import type { Swiper as SwiperInstance } from "swiper";
import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css";

const products = [
  { name: "Wayfarer Ease Optics", image: "/images/product/1.avif" },
  { name: "Clumaster Optics", image: "/images/product/2.avif" },
  { name: "RB7159 Optics", image: "/images/product/3.avif" },
  { name: "Oval Optics", image: "/images/product/eyeglasses-front-view.avif" },
  { name: "RB5421 Optics", image: "/images/product/4.avif" },
  { name: "RB3768V Optics", image: "/images/product/eyeglasses-front-view.avif" },
  { name: "Club Round Optics", image: "/images/product/3.avif" },
  { name: "Avery Optics", image: "/images/product/1.avif" },
  { name: "Modern Square Optics", image: "/images/product/4.avif" },
  { name: "Classic Oval Optics", image: "/images/product/eyeglasses-front-view.avif" },
  { name: "Dawson Optics", image: "/images/product/2.avif" },
  { name: "Blake Optics", image: "/images/product/3.avif" },
];

type MegaMenuSliderProps = {
  fullWidth?: boolean;
};

export default function MegaMenuSlider({ fullWidth = false }: MegaMenuSliderProps) {
  const swiper = useRef<SwiperInstance | null>(null);
  const [page, setPage] = useState(1);
  const [atStart, setAtStart] = useState(true);
  const [atEnd, setAtEnd] = useState(false);

  const updateState = (instance: SwiperInstance) => {
    setPage(Math.floor(instance.activeIndex / 6) + 1);
    setAtStart(instance.isBeginning);
    setAtEnd(instance.isEnd);
  };

  return (
    <section className={`mega-products${fullWidth ? " mega-products-full" : ""}`} aria-label="Best sellers">
      <div className="mega-products-head">
        <h2>Best Sellers</h2>
        <div className="mega-products-controls">
          <button type="button" aria-label="Previous best sellers" disabled={atStart} onClick={() => swiper.current?.slidePrev(300)}><ChevronLeft /></button>
          <span aria-live="polite">{page}/2</span>
          <button type="button" aria-label="Next best sellers" disabled={atEnd} onClick={() => swiper.current?.slideNext(300)}><ChevronRight /></button>
        </div>
      </div>
      <Swiper
        className="mega-products-rail"
        slidesPerView={6}
        slidesPerGroup={6}
        spaceBetween={28}
        speed={300}
        onSwiper={(instance) => { swiper.current = instance; updateState(instance); }}
        onSlideChange={updateState}
      >
        {products.map((product, index) => (
          <SwiperSlide key={`${product.name}-${index}`}>
            <Link className="mega-product" href="/product">
              <span className="mega-product-image">
                <Image src={product.image} alt="" width={220} height={100} sizes="160px" />
              </span>
              <span>{product.name}</span>
            </Link>
          </SwiperSlide>
        ))}
      </Swiper>
    </section>
  );
}
