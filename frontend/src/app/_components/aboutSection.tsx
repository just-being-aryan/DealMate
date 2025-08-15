'use client'

import { motion } from "framer-motion";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { CheckCircle, Rocket, Globe, Award } from "lucide-react";

interface AboutSectionProps {
  id?: string; 
}
const AboutSection = ({ id }: AboutSectionProps) => {
  const stats = [
    { number: "2.5B+", label: "Total Deal Value", icon: Globe },
    { number: "500+", label: "Successful Acquisitions", icon: CheckCircle },
    { number: "50+", label: "Industry Verticals", icon: Rocket },
    { number: "98%", label: "Client Satisfaction", icon: Award }
  ];

  const values = [
    {
      title: "Transparency First",
      description: "We believe in complete transparency throughout the acquisition process. No hidden fees, no surprise costs.",
    },
    {
      title: "Speed & Efficiency",
      description: "Our technology-driven approach reduces deal timelines by up to 70% compared to traditional methods.",
    },
    {
      title: "Expert Support",
      description: "Every deal is backed by our team of M&A experts with decades of combined experience.",
    }
  ];

  return (
    <section id = {id} className="py-20 bg-muted/30 relative overflow-hidden">
      {/* Background decoration */}
      <div className="absolute top-0 left-0 w-72 h-72 bg-primary/5 rounded-full -translate-x-36 -translate-y-36" />
      <div className="absolute bottom-0 right-0 w-96 h-96 bg-primary/5 rounded-full translate-x-48 translate-y-48" />

      <div className="max-w-[1600px] mx-auto px-6 sm:px-8 relative z-10">
        <div className="grid lg:grid-cols-2 gap-16 items-center">
          
          {/* Left column - Content */}
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6 }}
            viewport={{ once: true }}
          >
            <Badge variant="secondary" className="mb-4">
              About DealMate
            </Badge>
            <h2 className="text-4xl md:text-5xl font-bold mb-6 text-foreground">
              Revolutionizing Business
              <span className="block text-primary">Acquisitions</span>
            </h2>
            <p className="text-lg text-muted-foreground mb-8 leading-relaxed">
              DealMate is the first platform to flip the traditional M&A model. Instead of buyers 
              hunting for deals, we empower sellers to discover and connect with qualified buyers 
              who match their specific criteria.
            </p>
            <p className="text-lg text-muted-foreground mb-8 leading-relaxed">
              Founded by former investment bankers and tech entrepreneurs, we've experienced 
              firsthand the inefficiencies in traditional deal-making. Our mission is to make 
              business acquisitions as intuitive and efficient as modern dating apps.
            </p>

            {/* Values */}
            <div className="space-y-6">
              {values.map((value, index) => (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.6, delay: index * 0.1 }}
                  viewport={{ once: true }}
                  className="flex items-start gap-4"
                >
                  <div className="flex-shrink-0 w-2 h-2 rounded-full bg-primary mt-3" />
                  <div>
                    <h3 className="font-semibold text-foreground mb-2">{value.title}</h3>
                    <p className="text-muted-foreground">{value.description}</p>
                  </div>
                </motion.div>
              ))}
            </div>
          </motion.div>

          {/* Right column - Stats */}
          <motion.div
            initial={{ opacity: 0, x: 30 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
            viewport={{ once: true }}
            className="space-y-6"
          >
            {stats.map(({ number, label, icon: Icon }, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, scale: 0.9 }}
                whileInView={{ opacity: 1, scale: 1 }}
                transition={{ duration: 0.6, delay: index * 0.1 }}
                viewport={{ once: true }}
              >
                <Card className="p-6 border-border/50 hover:border-primary/20 transition-all duration-300 group">
                  <CardContent className="p-0">
                    <div className="flex items-center gap-4">
                      <div className="p-3 rounded-lg bg-primary/10 group-hover:bg-primary/20 transition-colors">
                        <Icon className="h-8 w-8 text-primary" />
                      </div>
                      <div>
                        <motion.div
                          initial={{ opacity: 0 }}
                          whileInView={{ opacity: 1 }}
                          transition={{ duration: 1, delay: 0.5 + index * 0.1 }}
                          viewport={{ once: true }}
                          className="text-3xl font-bold text-foreground"
                        >
                          {number}
                        </motion.div>
                        <p className="text-muted-foreground">{label}</p>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              </motion.div>
            ))}

            {/* Call to action card */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.4 }}
              viewport={{ once: true }}
            >
              <Card className="p-6 bg-primary text-primary-foreground">
                <CardContent className="p-0">
                  <h3 className="text-xl font-semibold mb-2">Ready to Get Started?</h3>
                  <p className="text-primary-foreground/80 mb-4">
                    Join thousands of business owners who have successfully sold their companies through our platform.
                  </p>
                  <Badge variant="secondary" className="bg-white/20 text-white border-white/30">
                    Free Account Setup
                  </Badge>
                </CardContent>
              </Card>
            </motion.div>
          </motion.div>
        </div>
      </div>
    </section>
  );
};

export default AboutSection;
