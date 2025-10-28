'use client';

import { motion } from 'framer-motion';
import Button from '@/components/Button';
import { HiPhone, HiPlay } from 'react-icons/hi';

export default function Hero() {
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.15,
        delayChildren: 0.2,
      },
    },
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 30 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { duration: 0.6, ease: [0.22, 1, 0.36, 1] },
    },
  };

  return (
    <section className="relative overflow-hidden bg-gradient-to-b from-blue-50 to-white dark:from-slate-900 dark:to-slate-800 pt-20 pb-32">
      <div className="absolute inset-0 bg-grid-slate-100 dark:bg-grid-slate-900/50 [mask-image:linear-gradient(0deg,white,rgba(255,255,255,0.6))] dark:[mask-image:linear-gradient(0deg,rgba(15,23,42,1),rgba(15,23,42,0.6))]" />
      
      <div className="relative mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <motion.div
          variants={containerVariants}
          initial="hidden"
          animate="visible"
          className="text-center max-w-4xl mx-auto"
        >
          <motion.h1
            variants={itemVariants}
            className="text-5xl sm:text-6xl lg:text-7xl font-display font-bold tracking-tight text-slate-900 dark:text-white mb-6"
          >
            Answer every call.{' '}
            <span className="text-primary">Book more customers.</span>
          </motion.h1>

          <motion.p
            variants={itemVariants}
            className="text-xl sm:text-2xl text-slate-600 dark:text-slate-300 mb-4"
          >
            TalkServe&apos;s AI receptionist answers in under two seconds, books
            appointments or orders, and follows up—24/7.
          </motion.p>

          <motion.p
            variants={itemVariants}
            className="text-base text-slate-500 dark:text-slate-400 mb-10"
          >
            Trusted by dental clinics, restaurants, and service businesses across
            North America.
          </motion.p>

          <motion.div
            variants={itemVariants}
            className="flex flex-col sm:flex-row gap-4 justify-center mb-12"
          >
            <Button href="/contact" size="lg" className="gap-2">
              <HiPhone className="h-5 w-5" />
              Call the Live Demo
            </Button>
            <Button href="/contact" variant="outline" size="lg" className="gap-2">
              <HiPlay className="h-5 w-5" />
              Start Free Trial
            </Button>
          </motion.div>

          <motion.div
            variants={itemVariants}
            className="flex flex-wrap items-center justify-center gap-8 text-sm text-slate-600 dark:text-slate-400"
          >
            <div className="flex items-center gap-2">
              <div className="h-2 w-2 rounded-full bg-green-500" />
              24/7 coverage
            </div>
            <div className="flex items-center gap-2">
              <div className="h-2 w-2 rounded-full bg-green-500" />
              Works with your systems
            </div>
            <div className="flex items-center gap-2">
              <div className="h-2 w-2 rounded-full bg-green-500" />
              Setup in 15 minutes
            </div>
          </motion.div>
        </motion.div>
      </div>
    </section>
  );
}
