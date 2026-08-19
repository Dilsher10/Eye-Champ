"use client";

import { ChevronLeft, ChevronRight, Pause, Play } from "lucide-react";
import Image from "next/image";
import { useRef, useState } from "react";
import Slider from "react-slick";
import type { CustomArrowProps, Settings } from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";

const slides = [
  ["cartier", "Cartier eyewear campaign", "CARTIER.png"],
  ["emporio-armani", "Emporio Armani eyewear campaign", "EMPORIO-ARMANI.png"],
  ["gucci", "Gucci eyewear campaign", "GUCCI.png"],
  ["mont-blanc", "Montblanc eyewear campaign", "MONTBLANK.png"],
  ["moscot", "Moscot eyewear campaign", "MOSCOT.png"],
  ["oakley", "Oakley eyewear campaign", "OAKLEY.png"],
  ["prada", "Prada eyewear campaign", "PRADA.png"],
  ["ray-ban", "Ray-Ban eyewear campaign", "RAY-BAN.png"],
  ["tom-ford", "Tom Ford eyewear campaign", "TOMFORD.png"],
  ["versace", "Versace eyewear campaign", "VERSACE.png"],
] as const;

function PrevArrow({ onClick }: CustomArrowProps) {
  return (
    <button type="button" className="slider-arrow prev-arrow" onClick={onClick} aria-label="Previous promotion">
      <ChevronLeft aria-hidden="true" />
    </button>
  );
}

function NextArrow({ onClick }: CustomArrowProps) {
  return (
    <button type="button" className="slider-arrow next-arrow" onClick={onClick} aria-label="Next promotion">
      <ChevronRight aria-hidden="true" />
    </button>
  );
}

export default function ImageSlider() {
  const desktopSlider = useRef<Slider>(null);
  const mobileSlider = useRef<Slider>(null);
  const [playing, setPlaying] = useState(true);

  const togglePlayback = () => {
    const sliders = [desktopSlider.current, mobileSlider.current];
    sliders.forEach((slider) => {
      if (playing) slider?.slickPause();
      else slider?.slickPlay();
    });
    setPlaying((current) => !current);
  };

  const sharedSettings: Settings = {
    dots: false,
    infinite: true,
    speed: 600,
    slidesToScroll: 1,
    centerMode: true,
    autoplay: true,
    autoplaySpeed: 3500,
    arrows: true,
    prevArrow: <PrevArrow />,
    nextArrow: <NextArrow />,
    pauseOnHover: true,
    cssEase: "cubic-bezier(.22,.61,.36,1)",
  };

  const desktopSettings: Settings = {
    ...sharedSettings,
    slidesToShow: 2,
    centerPadding: "6.75%",
  };

  const mobileSettings: Settings = {
    ...sharedSettings,
    slidesToShow: 1,
    centerPadding: "12%",
  };

  return (
    <section className="brand-band" aria-label="Featured eyewear promotions">
      <div className="desktop-image-slider">
        <Slider ref={desktopSlider} {...desktopSettings} className="image-slider">
          {slides.map(([name, alt]) => (
            <article key={name} className="image-slide">
              <Image
                src={`/images/brand-banners/${name}.webp`}
                alt={alt}
                fill
                unoptimized
                sizes="38vw"
              />
            </article>
          ))}
        </Slider>
      </div>
      <div className="mobile-image-slider">
        <Slider ref={mobileSlider} {...mobileSettings} className="image-slider">
          {slides.map(([name, alt, mobileImage]) => (
            <article key={name} className="image-slide">
              <Image
                src={`/images/brand-banners/mobile/${mobileImage}`}
                alt={alt}
                fill
                unoptimized
                sizes="76vw"
              />
            </article>
          ))}
        </Slider>
      </div>
      <button
        type="button"
        className="slider-pause"
        onClick={togglePlayback}
        aria-label={playing ? "Pause automatic slideshow" : "Play automatic slideshow"}
        aria-pressed={!playing}
      >
        {playing ? <Pause aria-hidden="true" /> : <Play aria-hidden="true" />}
      </button>
    </section>
  );
}
