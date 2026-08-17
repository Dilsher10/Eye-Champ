"use client";

import { ChevronLeft, ChevronRight, Pause, Play } from "lucide-react";
import Image from "next/image";
import { useRef, useState } from "react";
import Slider from "react-slick";
import type { CustomArrowProps, Settings } from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";

const slides = [
  ["cartier", "Cartier eyewear campaign", null],
  ["emporio-armani", "Emporio Armani eyewear campaign", "Emporio Armani  - 1168 x 960.webp"],
  ["gucci", "Gucci eyewear campaign", "Gucci - 1168 x 960.webp"],
  ["mont-blanc", "Montblanc eyewear campaign", "Mont Blanc - 1168 x 960.webp"],
  ["moscot", "Moscot eyewear campaign", "Moscot - 1168 x 960.webp"],
  ["oakley", "Oakley eyewear campaign", "Oakley  - 1168 x 960.webp"],
  ["prada", "Prada eyewear campaign", "Prada - 1168 x 960.webp"],
  ["ray-ban", "Ray-Ban eyewear campaign", "Ray ban - 1168 x 960.webp"],
  ["tom-ford", "Tom Ford eyewear campaign", "Tom Ford - 1168 x 960.webp"],
  ["versace", "Versace eyewear campaign", "Versace - 1168 x 960.webp"],
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
        {slides.map(([name, alt, mobileImage]) => (
          <article key={name} className="image-slide">
            <picture>
              {mobileImage && (
                <source
                  media="(max-width: 768px)"
                  srcSet={`/images/brand-banners/mobile/${mobileImage}`}
                />
              )}
              <Image
                src={`/images/brand-banners/${name}.webp`}
                alt={alt}
                fill
                unoptimized
                sizes="(max-width: 768px) 100vw, 38vw"
              />
            </picture>
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
