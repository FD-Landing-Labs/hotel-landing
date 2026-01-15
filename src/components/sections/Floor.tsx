"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { ArrowRight } from "lucide-react";
import Image from "next/image";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import placeholderData from "@/data/placeholder.json";

const { floor } = placeholderData;

export function Floor() {
  const [activeRoom, setActiveRoom] = useState(floor.rooms[0]);

  return (
    <section id="floor" className="relative bg-muted/30 py-20 md:py-28 lg:py-32">
      <div className="container px-6 md:px-12 lg:px-16">
        {/* Section Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, ease: [0.25, 0.46, 0.45, 0.94] }}
          className="mb-12 md:mb-16"
        >
          {/* Section Label with Line */}
          <div className="flex items-center gap-4 mb-6">
            <span className="text-sm text-muted-foreground">
              {floor.sectionLabel}
            </span>
            <div className="flex-1 h-px bg-border" />
          </div>

          {/* Headline */}
          <h2 className="font-heading text-4xl md:text-5xl lg:text-6xl font-normal leading-[1.1] tracking-tight max-w-3xl">
            {floor.headline}
          </h2>
        </motion.div>

        {/* Main Content - Three Columns */}
        <div className="bg-white rounded-2xl p-6 md:p-8 lg:p-10 shadow-sm border border-border/30">
          <div className="grid lg:grid-cols-[280px_1fr_1fr] gap-8 lg:gap-10">
            {/* Left Column - Room Tabs */}
            <motion.div
              initial={{ opacity: 0, x: -20 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: 0.1 }}
              className="flex flex-row lg:flex-col gap-2 overflow-x-auto lg:overflow-visible pb-4 lg:pb-0"
            >
              {floor.rooms.map((room) => (
                <button
                  key={room.id}
                  onClick={() => setActiveRoom(room)}
                  className={cn(
                    "flex items-center justify-between gap-4 px-5 py-4 rounded-lg text-left transition-all duration-200 min-w-[160px] lg:min-w-0",
                    activeRoom.id === room.id
                      ? "bg-foreground text-background"
                      : "bg-muted/50 text-foreground hover:bg-muted"
                  )}
                >
                  <span className="font-medium text-sm whitespace-nowrap">
                    {room.name}
                  </span>
                  <ArrowRight
                    className={cn(
                      "w-4 h-4 flex-shrink-0 transition-transform",
                      activeRoom.id === room.id && "translate-x-1"
                    )}
                  />
                </button>
              ))}
            </motion.div>

            {/* Middle Column - Floor Plan Image */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: 0.2 }}
              className="relative"
            >
              <AnimatePresence mode="wait">
                <motion.div
                  key={activeRoom.id}
                  initial={{ opacity: 0, scale: 0.98 }}
                  animate={{ opacity: 1, scale: 1 }}
                  exit={{ opacity: 0, scale: 0.98 }}
                  transition={{ duration: 0.3 }}
                  className="relative aspect-[4/5] rounded-xl overflow-hidden bg-muted"
                >
                  <Image
                    src={activeRoom.image}
                    alt={`${activeRoom.name} floor plan`}
                    fill
                    className="object-cover"
                  />
                </motion.div>
              </AnimatePresence>
            </motion.div>

            {/* Right Column - Details */}
            <motion.div
              initial={{ opacity: 0, x: 20 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: 0.3 }}
              className="flex flex-col justify-between"
            >
              <AnimatePresence mode="wait">
                <motion.div
                  key={activeRoom.id}
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -10 }}
                  transition={{ duration: 0.3 }}
                  className="space-y-6"
                >
                  {/* Description */}
                  <p className="text-muted-foreground leading-relaxed">
                    {activeRoom.description}
                  </p>

                  {/* Details List */}
                  <ul className="space-y-3">
                    <li className="flex items-start gap-2">
                      <span className="w-1.5 h-1.5 rounded-full bg-foreground mt-2 flex-shrink-0" />
                      <span className="text-foreground">
                        <span className="text-muted-foreground">Rooms: </span>
                        {activeRoom.details.rooms}
                      </span>
                    </li>
                    <li className="flex items-start gap-2">
                      <span className="w-1.5 h-1.5 rounded-full bg-foreground mt-2 flex-shrink-0" />
                      <span className="text-foreground">
                        <span className="text-muted-foreground">Location: </span>
                        {activeRoom.details.location}
                      </span>
                    </li>
                    <li className="flex items-start gap-2">
                      <span className="w-1.5 h-1.5 rounded-full bg-foreground mt-2 flex-shrink-0" />
                      <span className="text-foreground">
                        <span className="text-muted-foreground">Designer: </span>
                        {activeRoom.details.designer}
                      </span>
                    </li>
                    <li className="flex items-start gap-2">
                      <span className="w-1.5 h-1.5 rounded-full bg-foreground mt-2 flex-shrink-0" />
                      <span className="text-foreground">
                        <span className="text-muted-foreground">Available: </span>
                        {activeRoom.details.available}
                      </span>
                    </li>
                    <li className="flex items-start gap-2">
                      <span className="w-1.5 h-1.5 rounded-full bg-foreground mt-2 flex-shrink-0" />
                      <span className="text-foreground">
                        <span className="text-muted-foreground">Size: </span>
                        {activeRoom.details.size}
                      </span>
                    </li>
                  </ul>
                </motion.div>
              </AnimatePresence>

              {/* CTA Buttons */}
              <div className="flex flex-wrap gap-3 mt-8">
                <Button
                  asChild
                  className="bg-foreground text-background hover:bg-foreground/90 rounded-full px-6"
                >
                  <a href={floor.cta.primary.href}>{floor.cta.primary.label}</a>
                </Button>
                <Button
                  asChild
                  variant="outline"
                  className="rounded-full px-6 border-foreground/20 hover:bg-muted"
                >
                  <a href={floor.cta.secondary.href}>{floor.cta.secondary.label}</a>
                </Button>
              </div>
            </motion.div>
          </div>
        </div>
      </div>
    </section>
  );
}
