"use client";

import { useState } from "react";
import Image from "next/image";
import { ChevronLeft, ChevronRight } from "lucide-react";

interface ImageSlideshowProps {
  images: { url: string; label: string }[];
  title: string;
}

function SlideshowImage({ url, label, priority }: { url: string; label: string; priority?: boolean }) {
  const isSvg = url.endsWith(".svg");
  return (
    <Image
      src={url}
      alt={label}
      fill
      className={isSvg ? "object-contain p-6" : "object-cover"}
      priority={priority}
    />
  );
}

export function ImageSlideshow({ images, title }: ImageSlideshowProps) {
  const [current, setCurrent] = useState(0);

  if (images.length === 0) return null;

  if (images.length === 1) {
    return (
      <div className="relative w-full aspect-video rounded-2xl overflow-hidden mb-8 bg-muted">
        <SlideshowImage url={images[0].url} label={title} priority />
      </div>
    );
  }

  return (
    <div className="relative w-full aspect-video rounded-2xl overflow-hidden mb-8 bg-muted group">
      <SlideshowImage url={images[current].url} label={images[current].label} priority />

      <button
        onClick={() => setCurrent((current - 1 + images.length) % images.length)}
        className="absolute left-3 top-1/2 -translate-y-1/2 w-9 h-9 rounded-full bg-black/50 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity"
      >
        <ChevronLeft className="w-5 h-5 text-white" />
      </button>
      <button
        onClick={() => setCurrent((current + 1) % images.length)}
        className="absolute right-3 top-1/2 -translate-y-1/2 w-9 h-9 rounded-full bg-black/50 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity"
      >
        <ChevronRight className="w-5 h-5 text-white" />
      </button>

      <div className="absolute bottom-3 left-1/2 -translate-x-1/2 flex gap-2">
        {images.map((_, i) => (
          <button
            key={i}
            onClick={() => setCurrent(i)}
            className={`w-2 h-2 rounded-full transition-colors ${i === current ? "bg-white" : "bg-white/40"}`}
          />
        ))}
      </div>

      <div className="absolute bottom-3 right-4 text-xs text-white/60 select-none">
        {images[current].label}
      </div>
    </div>
  );
}
