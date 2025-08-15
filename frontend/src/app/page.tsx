'use client'

import Image from "next/image";
import { ThemeToggle } from './theme-toggle';
import { Navbar } from "./_components/Navbar";
import { StatefulButtonDemo } from "./_components/stateful";
import FeaturesSection from "./_components/featuresSection";
import AboutSection from "./_components/aboutSection";
import StatsSection from "./_components/statsSection";
import TestimonialsSection from "./_components/testimonials";
import { Separator } from "@/components/ui/separator";

import { motion } from "framer-motion";
import { Handshake, TrendingUp, Shield } from "lucide-react";

interface HomeSectionProps {
  id?: string; 
}
export default function Home({id} : HomeSectionProps) {
  return (
    <div  className="relative bg-background text-foreground">
      
  
      <div className="absolute top-4 right-4 z-50">
        <ThemeToggle />
      </div>

      {/* Navbar */}
      <div className="mb-10 mt-5">
        <Navbar />
      </div>

      {/* Hero Section */}
      <div id = {id} className="bg-background py-16">
        <div className="text-center my-12 px-4">
          <h1 className="text-4xl sm:text-5xl font-extrabold text-primary">
            Find Your Perfect Business Match
          </h1>
          <p className="mt-4 text-lg sm:text-xl text-muted-foreground max-w-2xl mx-auto">
            The first acquisition platform where sellers discover buyers. Swipe through vetted investors ready to close deals.
          </p>
        </div>

        <div className="relative z-10 container mx-auto px-4 text-center">
          {/* Trust indicators */}
          <motion.div 
            className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-3xl mx-auto"
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.8 }}
          >
            <div className="flex flex-col items-center glass-card p-6 rounded-xl border border-border bg-card">
              <Handshake className="h-10 w-10 mb-3 text-primary" />
              <h3 className="font-semibold text-lg mb-2 text-muted-foreground">
                Verified Buyers
              </h3>
              <p className="text-muted-foreground text-sm">
                All investors are pre-screened and qualified
              </p>
            </div>
            
            <div className="flex flex-col items-center glass-card p-6 rounded-xl border border-border bg-card">
              <TrendingUp className="h-10 w-10 mb-3 text-primary" />
              <h3 className="font-semibold text-lg mb-2 text-muted-foreground">
                $2.5B+ Deals
              </h3>
              <p className="text-muted-foreground text-sm">
                Successful acquisitions completed
              </p>
            </div>
            
            <div className="flex flex-col items-center glass-card p-6 rounded-xl border border-border bg-card">
              <Shield className="h-10 w-10 mb-3 text-primary" />
              <h3 className="font-semibold text-lg mb-2 text-muted-foreground">
                Bank-Grade Security
              </h3>
              <p className="text-muted-foreground text-sm">
                Your data is protected with enterprise security
              </p>
            </div>
          </motion.div>
        </div>

        {/* Call-to-action button */}
        <div className="flex justify-center mt-6">
          <StatefulButtonDemo />
        </div>

        {/* Separator */}
        <div className="mt-10">
          <Separator className="mx-auto w-3/4" />
        </div>
      </div>

      {/* Sections */}
      <FeaturesSection id = "features"/>
      <AboutSection id = "about"/>
      <StatsSection id = "analytics" />
      <TestimonialsSection id = "testimonials" />
    </div>
  );
}
