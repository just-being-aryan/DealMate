'use client'

import { useRouter } from "next/navigation"
import { motion } from "framer-motion";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Building2, Users, ArrowRight, CheckCircle, ArrowLeft } from "lucide-react";

const UserTypeSelection = () => {
  const router = useRouter();

  const handleSellerClick = () => router.push("/SignUp");
  const handleBuyerClick = () => router.push("/SignUp");
  const handleBackClick = () => router.push("/"); // redirect to home

  const containerVariants = { hidden: { opacity: 0 }, visible: { opacity: 1, transition: { staggerChildren: 0.3 } } };
  const cardVariants = { hidden: { opacity: 0, y: 50 }, visible: { opacity: 1, y: 0 } };

  return (
    <section className="min-h-screen flex flex-col items-center justify-start py-16 px-4">
      
     
      <div className="w-full max-w-5xl flex items-center mb-6">
        <button
          onClick={handleBackClick}
          className="flex items-center gap-2 text-primary font-medium hover:underline"
        >
          <ArrowLeft className="h-5 w-5" />
          Home
        </button>
      </div>

      <motion.div 
        className="container max-w-5xl mx-auto text-center"
        variants={containerVariants}
        initial="hidden"
        animate="visible"
      >
       
        <motion.div className="mb-12" variants={cardVariants}>
          <h2 className="text-3xl md:text-4xl font-bold mb-4 text-foreground">
            Choose Your Path
          </h2>
          <p className="text-lg md:text-xl text-muted-foreground max-w-2xl mx-auto">
            Are you looking to sell your business or invest in acquisition opportunities?
          </p>
        </motion.div>

    
        <div className="grid md:grid-cols-2 gap-6 max-w-4xl mx-auto">
      
          <motion.div variants={cardVariants}>
            <Card className="relative p-6 h-auto card-shadow hover:premium-shadow transition-all duration-300 group cursor-pointer border-2 hover:border-primary/20">
              <div className="absolute inset-0 bg-gradient-to-br from-primary/5 via-transparent to-transparent rounded-lg" />
              <div className="relative z-10">
                <div className="w-16 h-16 bg-primary/10 rounded-full flex items-center justify-center mx-auto mb-4 group-hover:scale-110 transition-transform duration-300">
                  <Building2 className="h-8 w-8 text-primary" />
                </div>
                <h3 className="text-xl md:text-2xl font-bold mb-3 text-foreground">I'm Selling</h3>
                <p className="text-muted-foreground mb-4 text-base md:text-lg">
                  List your business and discover qualified buyers who match your criteria
                </p>
                <div className="space-y-2 mb-6 text-left">
                  {[
                    "Get matched with verified buyers",
                    "Control the discovery process",
                    "Maintain confidentiality",
                    "Track buyer engagement"
                  ].map((feature, index) => (
                    <div key={index} className="flex items-center gap-2">
                      <CheckCircle className="h-4 w-4 text-success" />
                      <span className="text-foreground text-sm md:text-base">{feature}</span>
                    </div>
                  ))}
                </div>
                <Button 
                  onClick={handleSellerClick}
                  className="w-full group"
                  variant="default"
                  size="lg"
                >
                  Start as Seller
                  <ArrowRight className="ml-2 h-5 w-5 group-hover:translate-x-1 transition-transform" />
                </Button>
              </div>
            </Card>
          </motion.div>

    
          <motion.div variants={cardVariants}>
            <Card className="relative p-6 h-auto card-shadow hover:premium-shadow transition-all duration-300 group cursor-pointer border-2 hover:border-primary/20">
              <div className="absolute inset-0 bg-gradient-to-br from-primary/5 via-transparent to-transparent rounded-lg" />
              <div className="relative z-10">
                <div className="w-16 h-16 bg-primary/10 rounded-full flex items-center justify-center mx-auto mb-4 group-hover:scale-110 transition-transform duration-300">
                  <Users className="h-8 w-8 text-primary" />
                </div>
                <h3 className="text-xl md:text-2xl font-bold mb-3 text-foreground">I'm Buying</h3>
                <p className="text-muted-foreground mb-4 text-base md:text-lg">
                  Browse and connect with businesses looking for acquisition partners
                </p>
                <div className="space-y-2 mb-6 text-left">
                  {[
                    "Access exclusive deal flow",
                    "Pre-screened opportunities",
                    "Direct seller communication",
                    "AI-powered matching"
                  ].map((feature, index) => (
                    <div key={index} className="flex items-center gap-2">
                      <CheckCircle className="h-4 w-4 text-success" />
                      <span className="text-foreground text-sm md:text-base">{feature}</span>
                    </div>
                  ))}
                </div>
                <Button 
                  onClick={handleBuyerClick}
                  className="w-full group"
                  variant="outline"
                  size="lg"
                >
                  Start as Buyer
                  <ArrowRight className="ml-2 h-5 w-5 group-hover:translate-x-1 transition-transform" />
                </Button>
              </div>
            </Card>
          </motion.div>
        </div>
      </motion.div>
    </section>
  );
};

export default UserTypeSelection;
