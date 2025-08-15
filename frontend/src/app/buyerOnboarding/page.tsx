'use client'

import { useRouter } from "next/navigation";
import { useForm } from "react-hook-form";
import { motion } from "framer-motion";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";

interface BuyerOnboardingData {
  budgetRange: string;
  dealType: string[];
  industryPreference: string[];
  location: string;
  experienceLevel: string;
}

const BuyerOnboardingPage = () => {
  const router = useRouter();
  const { register, handleSubmit, formState: { errors, isSubmitting } } = useForm<BuyerOnboardingData>();

  const onSubmit = async (data: BuyerOnboardingData) => {
    console.log("Buyer Onboarding:", data);
    router.push("/buyerDashboard");
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
      className="min-h-screen flex items-center justify-center p-4 bg-gradient-to-br from-background to-secondary/20"
    >
      <Card className="w-full max-w-md">
        <CardHeader className="space-y-1">
          <CardTitle className="text-2xl font-bold text-center">Buyer Onboarding</CardTitle>
          <CardDescription className="text-center">
            Answer a few questions to personalize your deal recommendations
          </CardDescription>
        </CardHeader>
        <CardContent>
          <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">

            {/* 1. Budget Range */}
            <div className="space-y-2">
              <Label htmlFor="budgetRange">Target Budget Range</Label>
              <select
                {...register("budgetRange", { required: "Please select a budget range" })}
                className="w-full border border-input rounded-lg bg-background text-foreground px-3 py-2 focus:outline-none focus:ring-2 focus:ring-primary focus:border-primary transition-colors"
              >
                <option value="">Select range</option>
                <option value="$50k-$100k">$50k-$100k</option>
                <option value="$100k-$500k">$100k-$500k</option>
                <option value="$500k-$1M">$500k-$1M</option>
                <option value="$1M+">$1M+</option>
              </select>
              {errors.budgetRange && <p className="text-sm text-destructive">{errors.budgetRange.message}</p>}
            </div>

            {/* 2. Deal Type */}
            <div className="space-y-2">
              <Label>Preferred Deal Types</Label>
              <div className="grid grid-cols-2 gap-2">
                {["Acquisitions", "Partnerships", "Franchises", "Equity Deals"].map((type) => (
                  <label key={type} className="flex items-center gap-2 p-2 border border-input rounded-lg cursor-pointer hover:bg-accent">
                    <input type="checkbox" value={type} {...register("dealType")} className="accent-primary" />
                    {type}
                  </label>
                ))}
              </div>
            </div>

            {/* 3. Industry Preference */}
            <div className="space-y-2">
              <Label>Industry Preference</Label>
              <div className="grid grid-cols-2 gap-2">
                {["Tech", "Healthcare", "E-commerce", "Finance"].map((industry) => (
                  <label key={industry} className="flex items-center gap-2 p-2 border border-input rounded-lg cursor-pointer hover:bg-accent">
                    <input type="checkbox" value={industry} {...register("industryPreference")} className="accent-primary" />
                    {industry}
                  </label>
                ))}
              </div>
            </div>

            {/* 4. Location */}
            <div className="space-y-2">
              <Label htmlFor="location">Geographical Preference</Label>
              <Input
                id="location"
                placeholder="e.g., US, Europe, Remote"
                {...register("location", { required: "Please enter a location" })}
              />
              {errors.location && <p className="text-sm text-destructive">{errors.location.message}</p>}
            </div>

            {/* 5. Experience Level */}
            <div className="space-y-2">
              <Label>Experience Level / Deal Type</Label>
              <select
                {...register("experienceLevel", { required: "Please select experience level" })}
                className="w-full border border-input rounded-lg bg-background text-foreground px-3 py-2 focus:outline-none focus:ring-2 focus:ring-primary focus:border-primary transition-colors"
              >
                <option value="">Select</option>
                <option value="First-time buyer">First-time buyer</option>
                <option value="Experienced investor">Experienced investor</option>
                <option value="Equity partnership">Equity partnership</option>
                <option value="Full acquisition">Full acquisition</option>
              </select>
              {errors.experienceLevel && <p className="text-sm text-destructive">{errors.experienceLevel.message}</p>}
            </div>

            <Button type="submit" size="lg" className="w-full" disabled={isSubmitting}>
              {isSubmitting ? "Submitting..." : "Submit"}
            </Button>

          </form>
        </CardContent>
      </Card>
    </motion.div>
  );
};

export default BuyerOnboardingPage;
