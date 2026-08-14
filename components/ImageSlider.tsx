"use client";

import { ChevronLeft, ChevronRight, Pause, Play } from "lucide-react";
import Image from "next/image";
import { useRef, useState } from "react";
import Slider from "react-slick";
import type { CustomArrowProps, Settings } from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";

const slides = [
  ["cartier", "Cartier eyewear campaign"],
  ["emporio-armani", "Emporio Armani eyewear campaign"],
  ["gucci", "Gucci eyewear campaign"],
  ["mont-blanc", "Montblanc eyewear campaign"],
  ["moscot", "Moscot eyewear campaign"],
  ["oakley", "Oakley eyewear campaign"],
  ["prada", "Prada eyewear campaign"],
  ["ray-ban", "Ray-Ban eyewear campaign"],
  ["tom-ford", "Tom Ford eyewear campaign"],
  ["versace", "Versace eyewear campaign"],
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
  const slider = useRef<Slider>(null);
  const [playing, setPlaying] = useState(true);

  const togglePlayback = () => {
    if (playing) slider.current?.slickPause();
    else slider.current?.slickPlay();
    setPlaying((current) => !current);
  };

  const settings: Settings = {
    dots: false,
    infinite: true,
    speed: 600,
    slidesToShow: 2,
    slidesToScroll: 1,
    centerMode: true,
    centerPadding: "6.75%",
    autoplay: true,
    autoplaySpeed: 3500,
    arrows: true,
    prevArrow: <PrevArrow />,
    nextArrow: <NextArrow />,
    pauseOnHover: true,
    cssEase: "cubic-bezier(.22,.61,.36,1)",
    responsive: [
      {
        breakpoint: 769,
        settings: {
          slidesToShow: 1,
          centerMode: true,
          centerPadding: "12%",
        },
      },
    ],
  };

  return (
    <section className="brand-band" aria-label="Featured eyewear promotions">
      <Slider ref={slider} {...settings} className="image-slider">
        {slides.map(([name, alt]) => (
          <article key={name} className="image-slide">
            <Image
              src={`/images/brand-banners/${name}.webp`}
              alt={alt}
              fill
              unoptimized
              sizes="(max-width: 768px) 76vw, 38vw"
            />
          </article>
        ))}
      </Slider>
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
