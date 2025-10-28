'use client';

import { motion } from 'framer-motion';
import Button from '@/components/Button';
import { HiPhone, HiPlay } from 'react-icons/hi';

export default function FinalCTA() {
  return (
    <section className="py-32 bg-gradient-to-br from-primary to-blue-700 relative overflow-hidden">
      <div className="absolute inset-0 bg-grid-white/10" />
      
      <div className="relative mx-auto max-w-4xl px-4 sm:px-6 lg:px-8 text-center">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
        >
          <h2 className="text-4xl sm:text-5xl font-display font-bold text-white mb-6">
            Ready to stop missing calls?
          </h2>
          
          <p className="text-xl text-blue-100 mb-10">
            Join hundreds of businesses that never miss a customer.
          </p>
          
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Button
              href="/contact"
              variant="secondary"
              size="lg"
              className="gap-2 bg-white text-primary hover:bg-blue-50"
            >
              <HiPhone className="h-5 w-5" />
              Call the demo
            </Button>
            <Button
              href="/contact"
              variant="outline"
              size="lg"
              className="gap-2 border-white text-white hover:bg-white hover:text-primary"
            >
              <HiPlay className="h-5 w-5" />
              Start free trial
            </Button>
          </div>
          
          <p className="text-blue-200 text-sm mt-8">
            Book a 15-minute setup • No credit card required
          </p>
        </motion.div>
      </div>
    </section>
  );
}
