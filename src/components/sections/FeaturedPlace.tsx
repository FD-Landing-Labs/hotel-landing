"use client";

import { useRef } from "react";
import { motion, useScroll, useTransform } from "framer-motion";
import { LayoutGrid, Bed, Heart } from "lucide-react";
import Image from "next/image";
import placeholderData from "@/data/placeholder.json";

const { featuredPlace } = placeholderData;

export function FeaturedPlace() {
  const containerRef = useRef<HTMLDivElement>(null);

  return (
    <section id="featured" className="relative bg-muted/30">
      {/* Section Header */}
      <div className="py-16 md:py-24 text-center">
        <motion.h2
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, ease: [0.25, 0.46, 0.45, 0.94] }}
          className="font-heading text-6xl md:text-7xl lg:text-8xl font-normal tracking-tight"
        >
          {featuredPlace.headline}
        </motion.h2>
        <motion.p
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5, delay: 0.1, ease: [0.25, 0.46, 0.45, 0.94] }}
          className="mt-4 text-muted-foreground"
        >
          {featuredPlace.subtitle}
        </motion.p>
      </div>

      {/* Stacking Cards Container */}
      <div ref={containerRef} className="relative px-4 md:px-8 lg:px-16 pb-8">
        {featuredPlace.places.map((place, index) => (
          <PlaceCard
            key={place.id}
            place={place}
            index={index}
            totalCards={featuredPlace.places.length}
          />
        ))}
      </div>
    </section>
  );
}

interface PlaceCardProps {
  place: {
    id: string;
    title: string;
    description: string;
    image: string;
    size: string;
    type: string;
    style: string;
  };
  index: number;
  totalCards: number;
}

function PlaceCard({ place, index, totalCards }: PlaceCardProps) {
  const cardRef = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: cardRef,
    offset: ["start end", "end start"],
  });

  // Calculate the top offset for stacking (each card sticks a bit lower)
  const topOffset = 100 + index * 20;

  // Scale down slightly as cards go behind
  const scale = useTransform(
    scrollYProgress,
    [0, 0.5, 1],
    [0.95, 1, 1 - (totalCards - index - 1) * 0.02]
  );

  return (
    <motion.div
      ref={cardRef}
      style={{
        top: `${topOffset}px`,
        scale,
      }}
      className="sticky mb-8 last:mb-0"
    >
      <motion.div
        initial={{ opacity: 0, y: 50 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, margin: "-100px" }}
        transition={{
          duration: 0.6,
          delay: index * 0.1,
          ease: [0.25, 0.46, 0.45, 0.94],
        }}
        className="bg-white rounded-2xl overflow-hidden shadow-lg shadow-black/5 border border-border/30"
      >
        <div className="grid md:grid-cols-2 gap-0">
          {/* Left Column - Content */}
          <div className="p-8 md:p-10 lg:p-12 flex flex-col justify-between order-2 md:order-1">
            <div className="space-y-4">
              {/* Title */}
              <h3 className="font-heading text-2xl md:text-3xl font-normal">
                {place.title}
              </h3>

              {/* Description */}
              <p className="text-muted-foreground text-sm md:text-base leading-relaxed max-w-md">
                {place.description}
              </p>
            </div>

            {/* Tags */}
            <div className="flex flex-wrap gap-4 mt-8 pt-8 border-t border-border/50">
              {/* Size Tag */}
              <div className="flex items-center gap-2 text-sm text-muted-foreground">
                <LayoutGrid className="w-4 h-4" strokeWidth={1.5} />
                <span>{place.size}</span>
              </div>

              {/* Type Tag */}
              <div className="flex items-center gap-2 text-sm text-muted-foreground">
                <Bed className="w-4 h-4" strokeWidth={1.5} />
                <span>{place.type}</span>
              </div>

              {/* Style Tag */}
              <div className="flex items-center gap-2 text-sm text-muted-foreground">
                <Heart className="w-4 h-4" strokeWidth={1.5} />
                <span>{place.style}</span>
              </div>
            </div>
          </div>

          {/* Right Column - Image */}
          <div className="relative aspect-[4/3] md:aspect-auto md:min-h-[400px] order-1 md:order-2">
            <Image
              src={place.image}
              alt={place.title}
              fill
              className="object-cover"
            />
          </div>
        </div>
      </motion.div>
    </motion.div>
  );
}
