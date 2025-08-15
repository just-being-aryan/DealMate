'use client'

import { motion } from "framer-motion";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Zap, Target, Shield, Brain, Clock, Users, FileCheck, MessageSquare } from "lucide-react";

interface FeatureSectionProps {
  id?: string; 
}

const FeaturesSection = ({ id }: FeatureSectionProps) => {
  const features = [
    {
      icon: Target,
      title: "Smart Matching",
      description: "AI-powered algorithm connects sellers with the most qualified buyers based on industry, size, and investment criteria.",
      badge: "AI-Powered"
    },
    {
      icon: Zap,
      title: "Instant Discovery",
      description: "Browse verified buyer profiles in real-time. See investment capacity, timeline, and acquisition preferences instantly.",
      badge: "Real-time"
    },
    {
      icon: Shield,
      title: "Secure Deal Room",
      description: "Bank-grade encryption protects your sensitive business data throughout the entire acquisition process.",
      badge: "Enterprise Security"
    },
    {
      icon: Brain,
      title: "AI Valuation",
      description: "Get instant business valuations powered by market data and comparable transactions.",
      badge: "AI Analytics"
    },
    {
      icon: Clock,
      title: "Fast-Track Process",
      description: "Streamlined workflow reduces typical acquisition timeline from 12 months to 3-6 months.",
      badge: "Time-Saver"
    },
    {
      icon: Users,
      title: "Verified Network",
      description: "Access to pre-screened, qualified buyers with proven track records and available capital.",
      badge: "Verified"
    },
    {
      icon: FileCheck,
      title: "Due Diligence Hub",
      description: "Centralized document sharing and review system with built-in compliance tracking.",
      badge: "Compliant"
    },
    {
      icon: MessageSquare,
      title: "Integrated Communication",
      description: "Built-in messaging, video calls, and negotiation tools keep all deal communication secure.",
      badge: "All-in-One"
    }
  ];

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1
      }
    }
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 30 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { duration: 0.6 }
    }
  };

  return (
    <section id = {id} className="py-20 bg-background relative overflow-hidden">

      <div className="absolute inset-0 opacity-5">
        <div
          className="absolute inset-0"
          style={{
            backgroundImage: `radial-gradient(circle at 25% 25%, hsl(var(--primary)) 0%, transparent 50%), radial-gradient(circle at 75% 75%, hsl(var(--primary)) 0%, transparent 50%)`
          }}
        />
      </div>

 
      <div className="w-full max-w-[1600px] mx-auto px-6 lg:px-12 relative z-10">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          viewport={{ once: true }}
          className="text-center mb-16"
        >
          <Badge variant="secondary" className="mb-4 text-sm font-medium">
            Platform Features
          </Badge>
          <h2 className="text-4xl md:text-5xl font-bold mb-6 text-foreground">
            Everything You Need to
            <span className="block text-primary">Close Your Deal</span>
          </h2>
          <p className="text-xl text-muted-foreground max-w-3xl mx-auto">
            Our comprehensive platform handles every aspect of the acquisition process, 
            from initial matching to final closing.
          </p>
        </motion.div>

        <motion.div
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6"
        >
          {features.map((feature, index) => (
            <motion.div key={index} variants={itemVariants}>
              <Card className="h-full hover:shadow-lg transition-all duration-300 group border-border/50 hover:border-primary/20 rounded-2xl">
                <CardHeader className="pb-4">
                  <div className="flex items-start justify-between mb-3">
                    <div className="p-3 rounded-xl bg-primary/10 group-hover:bg-primary/20 transition-colors">
                      <feature.icon className="h-6 w-6 text-primary" />
                    </div>
                    <Badge variant="outline" className="text-xs rounded-full">
                      {feature.badge}
                    </Badge>
                  </div>
                  <CardTitle className="text-lg font-semibold text-foreground">
                    {feature.title}
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <CardDescription className="text-muted-foreground leading-relaxed">
                    {feature.description}
                  </CardDescription>
                </CardContent>
              </Card>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  );
};

export default FeaturesSection;
