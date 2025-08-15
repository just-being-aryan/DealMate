'use client'

import { motion } from "framer-motion";
import { Card, CardContent } from "@/components/ui/card";
import { Progress } from "@/components/ui/progress";
import { Badge } from "@/components/ui/badge";
import { TrendingUp, Users, DollarSign, Clock, Building, Globe, Shield, Zap } from "lucide-react";

interface AnalyticSectionProps {
  id?: string; 
}

const StatsSection = ({ id }: AnalyticSectionProps) => {
  const mainStats = [
    { icon: DollarSign, value: "$2.5B+", label: "Total Deal Volume", growth: "+127%", description: "Cumulative value of successful acquisitions" },
    { icon: Users, value: "10,000+", label: "Active Users", growth: "+89%", description: "Verified buyers and sellers on platform" },
    { icon: Building, value: "500+", label: "Deals Closed", growth: "+156%", description: "Successful business acquisitions completed" },
    { icon: Clock, value: "47 Days", label: "Avg. Close Time", growth: "-73%", description: "From first match to deal completion" }
  ];

  const industryStats = [
    { name: "Technology", percentage: 35, deals: 175 },
    { name: "Healthcare", percentage: 22, deals: 110 },
    { name: "Manufacturing", percentage: 18, deals: 90 },
    { name: "E-commerce", percentage: 15, deals: 75 },
    { name: "Financial Services", percentage: 10, deals: 50 }
  ];

  const performanceMetrics = [
    { icon: Globe, label: "Global Reach", value: "45+ Countries" },
    { icon: Shield, label: "Security Score", value: "99.9%" },
    { icon: Zap, label: "Match Success Rate", value: "84%" },
    { icon: TrendingUp, label: "Avg. ROI for Sellers", value: "2.3x" }
  ];

  return (
    <section id = {id} className="py-16 bg-muted/30 relative overflow-hidden">

      <div className="absolute inset-0 opacity-5">
        <div
          className="absolute inset-0"
          style={{
            backgroundImage:
              `linear-gradient(45deg, hsl(var(--primary)) 0%, transparent 25%), linear-gradient(-45deg, hsl(var(--primary)) 0%, transparent 25%)`
          }}
        />
      </div>

      <div className="container mx-auto px-4 max-w-6xl relative z-10">
        {/* Section heading */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          viewport={{ once: true }}
          className="text-center mb-14"
        >
          <Badge variant="secondary" className="mb-3 text-xs px-2 py-1">
            Platform Analytics
          </Badge>
          <h2 className="text-3xl md:text-4xl font-bold mb-4 text-foreground leading-snug">
            Numbers That Tell
            <span className="block text-primary">Our Story</span>
          </h2>
          <p className="text-base md:text-lg text-muted-foreground max-w-2xl mx-auto">
            Real metrics from real deals. See how DealMate is transforming the business acquisition landscape.
          </p>
        </motion.div>

        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-5 mb-12">
          {mainStats.map(({ icon: Icon, value, label, growth, description }, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: index * 0.1 }}
              viewport={{ once: true }}
            >
              <Card className="p-4 text-center border-border/50 hover:border-primary/20 transition-all duration-300 group">
                <CardContent className="p-0">
                  <div className="flex justify-center mb-3">
                    <div className="p-2 rounded-full bg-primary/10 group-hover:bg-primary/20 transition-colors">
                      <Icon className="h-6 w-6 text-primary" />
                    </div>
                  </div>
                  <div className="text-2xl font-bold text-foreground mb-1">{value}</div>
                  <h3 className="text-sm font-semibold text-foreground mb-1">{label}</h3>
                  <Badge variant="outline" className="text-[10px] px-2 py-0 text-green-600 border-green-200 mb-2">
                    {growth}
                  </Badge>
                  <p className="text-xs text-muted-foreground">{description}</p>
                </CardContent>
              </Card>
            </motion.div>
          ))}
        </div>

        <div className="grid lg:grid-cols-2 gap-10">
          {/* Industry Breakdown */}
          <Card className="p-5 border-border/50">
            <CardContent className="p-0">
              <h3 className="text-lg font-bold text-foreground mb-5">Deals by Industry</h3>
              <div className="space-y-3">
                {industryStats.map((industry, index) => (
                  <div key={index} className="space-y-1">
                    <div className="flex justify-between text-xs">
                      <span className="font-medium text-foreground">{industry.name}</span>
                      <span className="text-muted-foreground">{industry.deals} deals</span>
                    </div>
                    <Progress value={industry.percentage} className="h-1" />
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>

         
          <div className="space-y-4">
            <h3 className="text-lg font-bold text-foreground">Platform Performance</h3>

            {performanceMetrics.map(({ icon: Icon, label, value }, index) => (
              <Card
                key={index}
                className="p-3 border-border/50 hover:border-primary/20 transition-all duration-300"
              >
                <CardContent className="p-0 flex justify-between items-center text-sm">
                  <div className="flex items-center gap-2">
                    <div className="p-1 rounded bg-primary/10">
                      <Icon className="h-4 w-4 text-primary" />
                    </div>
                    <span className="font-medium">{label}</span>
                  </div>
                  <span className="text-primary font-semibold">{value}</span>
                </CardContent>
              </Card>
            ))}

          
            <motion.div
              initial={{ opacity: 0, y: 16 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.2 }}
              viewport={{ once: true }}
            >
              <Card className="p-5 bg-primary text-primary-foreground rounded-xl">
                <CardContent className="p-0 text-center">
                  <h4 className="text-base font-semibold mb-3">
                    Trusted by Industry Leaders
                  </h4>
                  <div className="grid grid-cols-2 gap-4 text-xs">
                    <div>
                      <div className="text-2xl font-bold">A+</div>
                      <div className="opacity-90">Security Rating</div>
                    </div>
                    <div>
                      <div className="text-2xl font-bold">24/7</div>
                      <div className="opacity-90">Support Available</div>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </motion.div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default StatsSection;
