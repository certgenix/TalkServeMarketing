'use client';

import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { HiChevronLeft, HiChevronRight } from 'react-icons/hi';

export interface Testimonial {
  quote: string;
  author: string;
  role: string;
  company: string;
}

interface TestimonialCarouselProps {
  testimonials: Testimonial[];
  autoPlay?: boolean;
  interval?: number;
}

export default function TestimonialCarousel({
  testimonials,
  autoPlay = true,
  interval = 5000,
}: TestimonialCarouselProps) {
  const [current, setCurrent] = useState(0);

  useEffect(() => {
    if (!autoPlay) return;
    const timer = setInterval(() => {
      setCurrent((prev) => (prev + 1) % testimonials.length);
    }, interval);
    return () => clearInterval(timer);
  }, [autoPlay, interval, testimonials.length]);

  const next = () => setCurrent((prev) => (prev + 1) % testimonials.length);
  const prev = () => setCurrent((prev) => (prev - 1 + testimonials.length) % testimonials.length);

  return (
    <div className="relative">
      <div className="overflow-hidden">
        <AnimatePresence mode="wait">
          <motion.div
            key={current}
            initial={{ opacity: 0, x: 100 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: -100 }}
            transition={{ duration: 0.5, ease: [0.22, 1, 0.36, 1] }}
            className="text-center px-4 py-8"
          >
            <blockquote className="text-xl md:text-2xl font-medium text-slate-900 dark:text-white mb-6">
              &ldquo;{testimonials[current].quote}&rdquo;
            </blockquote>
            <div>
              <p className="font-semibold text-slate-900 dark:text-white">
                {testimonials[current].author}
              </p>
              <p className="text-slate-600 dark:text-slate-400">
                {testimonials[current].role} — {testimonials[current].company}
              </p>
            </div>
          </motion.div>
        </AnimatePresence>
      </div>

      <div className="flex items-center justify-center gap-4 mt-8">
        <button
          onClick={prev}
          className="p-2 rounded-full bg-slate-100 dark:bg-slate-800 hover:bg-slate-200 dark:hover:bg-slate-700 transition-colors"
          aria-label="Previous testimonial"
        >
          <HiChevronLeft className="h-5 w-5" />
        </button>

        <div className="flex gap-2">
          {testimonials.map((_, index) => (
            <button
              key={index}
              onClick={() => setCurrent(index)}
              className={`h-2 rounded-full transition-all ${
                index === current
                  ? 'w-8 bg-primary'
                  : 'w-2 bg-slate-300 dark:bg-slate-700'
              }`}
              aria-label={`Go to testimonial ${index + 1}`}
            />
          ))}
        </div>

        <button
          onClick={next}
          className="p-2 rounded-full bg-slate-100 dark:bg-slate-800 hover:bg-slate-200 dark:hover:bg-slate-700 transition-colors"
          aria-label="Next testimonial"
        >
          <HiChevronRight className="h-5 w-5" />
        </button>
      </div>
    </div>
  );
}
