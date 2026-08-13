"use client";

import Slider from "react-slick";
import type { CustomArrowProps } from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";

const slides = [
  { image: "/images/brand-banners/cartier.webp" },
  { image: "/images/brand-banners/emporio-armani.webp" },
  { image: "/images/brand-banners/gucci.webp" },
  { image: "/images/brand-banners/mont-blanc.webp" },
  { image: "/images/brand-banners/moscot.webp" },
  { image: "/images/brand-banners/oakley.webp" },
  { image: "/images/brand-banners/prada.webp" },
  { image: "/images/brand-banners/ray-ban.webp" },
  { image: "/images/brand-banners/tom-ford.webp" },
  { image: "/images/brand-banners/versace.webp" },
];

function PrevArrow({ onClick }: CustomArrowProps) {
  return (
    <button type="button" className="slider-arrow prev-arrow" onClick={onClick} aria-label="Previous slide">
      ‹
    </button>
  );
}

function NextArrow({ onClick }: CustomArrowProps) {
  return (
    <button type="button" className="slider-arrow next-arrow" onClick={onClick} aria-label="Next slide">
      ›
    </button>
  );
}

export default function ImageSlider() {
  const settings = {
    dots: true,
    infinite: true,
    speed: 600,
    slidesToShow: 2,
    slidesToScroll: 1,
    autoplay: true,
    autoplaySpeed: 3500,
    arrows: true,
    prevArrow: <PrevArrow />,
    nextArrow: <NextArrow />,
    pauseOnHover: true,
    cssEase: "ease-out",
    slidesPerRow: 1,
    variableWidth: false,
    centerPadding: "16px",
    responsive: [
      {
        breakpoint: 768,
        settings: {
          slidesToShow: 1,
          centerPadding: "0px",
        },
      },
    ],
  } as const;

  return (
    <section className="brand-band" aria-label="Featured eyewear brands">
      <div className="shell">
        <Slider {...settings} className="image-slider">
          {slides.map((slide, index) => (
            <article key={`${slide.image}-${index}`} className="image-slide">
              <img src={slide.image} alt="Brand banner" />
            </article>
          ))}
        </Slider>
      </div>
    </section>
  );
}
