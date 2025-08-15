'use client'

import { motion } from "framer-motion";
import { Card, CardContent } from "@/components/ui/card";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Badge } from "@/components/ui/badge";
import { Star, Quote } from "lucide-react";

  
interface TestimonialsSectionProps {
  id?: string; 
}


const TestimonialsSection = ({ id }: TestimonialsSectionProps) => {
  const testimonials = [
    {
      name: "Sarah Mitchell",
      role: "Former CEO",
      company: "TechFlow Solutions",
      avatar: "/placeholder.svg",
      rating: 5,
      content: "DealMate completely transformed how I approached selling my SaaS company. Within 3 weeks, I was in conversations with 5 qualified buyers. The process was transparent and efficient.",
      dealValue: "$12M",
      timeline: "45 days"
    },
    {
      name: "Marcus Rodriguez",
      role: "Founder",
      company: "GreenLogistics Inc",
      avatar: "/placeholder.svg",
      rating: 5,
      content: "As a first-time seller, I was overwhelmed by the traditional M&A process. DealMate's platform made everything clear and manageable. Their AI matching saved me months of searching.",
      dealValue: "$8.5M",
      timeline: "60 days"
    },
    {
      name: "Jennifer Chen",
      role: "Managing Partner",
      company: "Apex Capital",
      avatar: "/placeholder.svg",
      rating: 5,
      content: "From a buyer's perspective, DealMate gives us access to quality deal flow that we never would have found otherwise. The seller-first approach creates better matches.",
      dealValue: "$25M+",
      timeline: "Investment Range"
    },
    {
      name: "David Thompson",
      role: "CEO",
      company: "Manufacturing Plus",
      avatar: "/placeholder.svg",
      rating: 5,
      content: "The due diligence process was seamless. Having everything centralized in their secure platform made sharing sensitive information much more comfortable.",
      dealValue: "$18M",
      timeline: "38 days"
    },
    {
      name: "Lisa Park",
      role: "Founder",
      company: "HealthTech Innovations",
      avatar: "/placeholder.svg",
      rating: 5,
      content: "DealMate's valuation tools gave me confidence in my asking price. When buyers came to the table, the negotiations started from a strong position.",
      dealValue: "$6.2M",
      timeline: "52 days"
    },
    {
      name: "Robert Kim",
      role: "Principal",
      company: "Venture Growth Partners",
      avatar: "/placeholder.svg",
      rating: 5,
      content: "The quality of deals on DealMate is exceptional. Sellers are serious and well-prepared, which makes our evaluation process much more efficient.",
      dealValue: "$50M+",
      timeline: "Portfolio Range"
    }
  ];

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: { staggerChildren: 0.1 }
    }
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 30 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.6 } }
  };



  return (
    <section id = {id} className="py-16 bg-background relative overflow-hidden">
 
      <div className="absolute inset-0 opacity-5">
        <div className="absolute top-1/4 left-1/4 w-56 h-56 bg-primary rounded-full blur-3xl" />
        <div className="absolute bottom-1/4 right-1/4 w-56 h-56 bg-primary rounded-full blur-3xl" />
      </div>

      <div className="container mx-auto px-3 relative z-10">

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          viewport={{ once: true }}
          className="text-center mb-14"
        >
          <Badge variant="secondary" className="mb-3 rounded-full px-3 py-1 text-xs">
            Success Stories
          </Badge>
          <h2 className="text-3xl md:text-4xl font-bold mb-4">
            Trusted by Business Leaders
            <span className="block text-primary">Worldwide</span>
          </h2>
          <p className="text-sm md:text-base text-muted-foreground max-w-2xl mx-auto">
            Don't just take our word for it — hear from business owners and investors 
            who’ve experienced DealMate firsthand.
          </p>
        </motion.div>

      
        <motion.div
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4"
        >
          {testimonials.map((t, idx) => (
            <motion.div key={idx} variants={itemVariants}>
              <Card className="h-full p-4 rounded-2xl border-border/50 hover:border-primary/30 transition-all duration-300 hover:shadow-md">
                <CardContent className="p-0 space-y-3">
                  {/* Quote + Rating */}
                  <div className="flex justify-between items-start">
                    <Quote className="h-6 w-6 text-primary/30" />
                    <div className="flex gap-1">
                      {[...Array(t.rating)].map((_, i) => (
                        <Star key={i} className="h-3 w-3 fill-yellow-400 text-yellow-400" />
                      ))}
                    </div>
                  </div>

                
                  <p className="text-xs leading-relaxed text-muted-foreground">
                    "{t.content}"
                  </p>

             
                  <div className="flex gap-1">
                    <Badge variant="outline" className="text-[10px] px-2 py-0.5 rounded-full">
                      {t.dealValue}
                    </Badge>
                    <Badge variant="outline" className="text-[10px] px-2 py-0.5 rounded-full">
                      {t.timeline}
                    </Badge>
                  </div>

             
                  <div className="flex items-center gap-2 pt-3 border-t border-border/30">
                    <Avatar className="h-8 w-8 rounded-full">
                      <AvatarImage src={t.avatar} alt={t.name} />
                      <AvatarFallback className="bg-primary/10 text-primary text-xs">
                        {t.name.split(' ').map(n => n[0]).join('')}
                      </AvatarFallback>
                    </Avatar>
                    <div>
                      <h4 className="font-medium text-sm">{t.name}</h4>
                      <p className="text-[10px] text-muted-foreground">{t.role}</p>
                      <p className="text-[10px] text-muted-foreground">{t.company}</p>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </motion.div>
          ))}
        </motion.div>


        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.2 }}
          viewport={{ once: true }}
          className="text-center mt-12"
        >
          <Card className="p-6 bg-gradient-to-r from-primary/5 to-primary/10 border-primary/20 rounded-2xl">
            <CardContent className="p-0">
              <h3 className="text-lg font-bold mb-2">Ready to Join Our Success Stories?</h3>
              <p className="text-xs text-muted-foreground mb-4 max-w-lg mx-auto">
                Start your acquisition journey today and become our next success story.
              </p>
              <Badge variant="secondary" className="text-xs px-4 py-1 rounded-full">
                Average Deal Closure: 47 Days
              </Badge>
            </CardContent>
          </Card>
        </motion.div>
      </div>
    </section>
  );
};

export default TestimonialsSection;
