"use client";

import { motion } from "framer-motion";
import { Building, FileText } from "lucide-react";
import Image from "next/image";
import placeholderData from "@/data/placeholder.json";

const { about } = placeholderData;

// Icon mapping
const iconMap: Record<string, React.ElementType> = {
  building: Building,
  "file-text": FileText,
};

export function About() {
  return (
    <section id="about" className="relative">
      {/* Top Section - Two Column Layout */}
      <div className="bg-background py-20 md:py-28 lg:py-32">
        <div className="container px-6 md:px-12 lg:px-16">
          <div className="grid lg:grid-cols-2 gap-12 lg:gap-20 items-start">
            {/* Left Column - Content */}
            <motion.div
              initial={{ opacity: 0, x: -30 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true, margin: "-100px" }}
              transition={{ duration: 0.6, ease: [0.25, 0.46, 0.45, 0.94] }}
              className="space-y-8"
            >
              {/* Section Label */}
              <div className="flex items-center gap-2">
                <span className="w-2 h-2 rounded-full bg-primary" />
                <span className="text-sm text-muted-foreground">
                  {about.sectionLabel}
                </span>
              </div>

              {/* Headline */}
              <h2 className="font-heading text-4xl md:text-5xl lg:text-[3.5rem] font-normal leading-[1.1] tracking-tight">
                {about.headline}
              </h2>

              {/* Description */}
              <p className="text-muted-foreground text-base md:text-lg leading-relaxed max-w-lg">
                {about.description}
              </p>

              {/* Feature Cards */}
              <div className="space-y-4 pt-4">
                {about.features.map((feature, index) => {
                  const Icon = iconMap[feature.icon] || Building;
                  return (
                    <motion.div
                      key={feature.title}
                      initial={{ opacity: 0, y: 20 }}
                      whileInView={{ opacity: 1, y: 0 }}
                      viewport={{ once: true }}
                      transition={{
                        duration: 0.5,
                        delay: 0.1 + index * 0.1,
                        ease: [0.25, 0.46, 0.45, 0.94],
                      }}
                      className="flex gap-5 p-5 bg-muted/50 rounded-lg"
                    >
                      {/* Icon */}
                      <div className="flex-shrink-0 w-12 h-12 flex items-center justify-center">
                        <Icon className="w-6 h-6 text-foreground/70" strokeWidth={1.5} />
                      </div>

                      {/* Content */}
                      <div className="space-y-1.5">
                        <h3 className="font-medium text-foreground">
                          {feature.title}
                        </h3>
                        <p className="text-sm text-muted-foreground leading-relaxed">
                          {feature.description}
                        </p>
                      </div>
                    </motion.div>
                  );
                })}
              </div>
            </motion.div>

            {/* Right Column - Image */}
            <motion.div
              initial={{ opacity: 0, x: 30 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true, margin: "-100px" }}
              transition={{ duration: 0.7, delay: 0.2, ease: [0.25, 0.46, 0.45, 0.94] }}
              className="relative"
            >
              <div className="relative aspect-[4/3] lg:aspect-[3/4] rounded-2xl overflow-hidden">
                <Image
                  src={about.image}
                  alt="Luxury hotel interior"
                  fill
                  className="object-cover"
                />
              </div>
            </motion.div>
          </div>
        </div>
      </div>

      {/* Bottom Section - Stats Bar */}
      <motion.div
        initial={{ opacity: 0, y: 30 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, margin: "-50px" }}
        transition={{ duration: 0.6, ease: [0.25, 0.46, 0.45, 0.94] }}
        className="bg-[#1a1a1a] py-16 md:py-20"
      >
        <div className="container px-6 md:px-12 lg:px-16">
          {/* Stats Header */}
          <div className="text-center mb-12">
            {/* Label */}
            <div className="flex items-center justify-center gap-2 mb-4">
              <span className="w-2 h-2 rounded-full bg-primary" />
              <span className="text-sm text-white/50">
                {about.statsBar.label}
              </span>
            </div>

            {/* Headline */}
            <h3 className="font-heading text-2xl md:text-3xl lg:text-4xl font-normal text-white">
              {about.statsBar.headline}
            </h3>
          </div>

          {/* Stats Grid */}
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8 md:gap-12">
            {about.statsBar.stats.map((stat, index) => (
              <motion.div
                key={stat.label}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{
                  duration: 0.5,
                  delay: 0.1 + index * 0.1,
                  ease: [0.25, 0.46, 0.45, 0.94],
                }}
                className="text-center"
              >
                <p className="font-heading text-5xl md:text-6xl lg:text-7xl font-normal text-white tracking-tight">
                  {stat.value}
                  <span className="text-white/70">{stat.suffix}</span>
                </p>
                <p className="text-sm text-white/50 mt-2">{stat.label}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </motion.div>
    </section>
  );
}
