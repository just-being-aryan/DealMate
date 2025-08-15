'use client'

import { useRouter } from "next/navigation";
import { useForm } from "react-hook-form";
import { motion } from "framer-motion";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";

interface SellerOnboardingData {
  businessType: string;
  revenueRange: string;
  preferredBuyer: string[];
  location: string;
  documentsReady: string[];
}

const SellerOnboardingPage = () => {
  const router = useRouter();
  const { register, handleSubmit, formState: { errors, isSubmitting } } = useForm<SellerOnboardingData>();

  const onSubmit = async (data: SellerOnboardingData) => {
    console.log("Seller Onboarding:", data);
    router.push("/sellerDashboard");
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
          <CardTitle className="text-2xl font-bold text-center">Seller Onboarding</CardTitle>
          <CardDescription className="text-center">
            Answer a few questions to improve buyer matching
          </CardDescription>
        </CardHeader>
        <CardContent>
          <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">

            {/* 1. Business Type */}
            <div className="space-y-2">
              <Label>Business / Deal Type</Label>
              <select
                {...register("businessType", { required: "Please select business type" })}
                className="w-full border border-input rounded-lg bg-background text-foreground px-3 py-2 focus:outline-none focus:ring-2 focus:ring-primary focus:border-primary transition-colors"
              >
                <option value="">Select</option>
                <option value="E-commerce">E-commerce</option>
                <option value="SaaS">SaaS</option>
                <option value="Franchise">Franchise</option>
                <option value="Brick & Mortar">Brick & Mortar</option>
              </select>
              {errors.businessType && <p className="text-sm text-destructive">{errors.businessType.message}</p>}
            </div>

            {/* 2. Revenue Range */}
            <div className="space-y-2">
              <Label>Revenue / Deal Size</Label>
              <select
                {...register("revenueRange", { required: "Please select revenue range" })}
                className="w-full border border-input rounded-lg bg-background text-foreground px-3 py-2 focus:outline-none focus:ring-2 focus:ring-primary focus:border-primary transition-colors"
              >
                <option value="">Select range</option>
                <option value="<$500k">{"<$500k"}</option>
                <option value="$500k-$1M">$500k-$1M</option>
                <option value="$1M-$5M">$1M-$5M</option>
                <option value="$5M+">$5M+</option>
              </select>
              {errors.revenueRange && <p className="text-sm text-destructive">{errors.revenueRange.message}</p>}
            </div>

            {/* 3. Preferred Buyer */}
            <div className="space-y-2">
              <Label>Preferred Buyer Type</Label>
              <div className="grid grid-cols-2 gap-2">
                {["First-time buyer", "Experienced investor", "Strategic partner"].map((buyer) => (
                  <label key={buyer} className="flex items-center gap-2 p-2 border border-input rounded-lg cursor-pointer hover:bg-accent">
                    <input type="checkbox" value={buyer} {...register("preferredBuyer")} className="accent-primary" />
                    {buyer}
                  </label>
                ))}
              </div>
            </div>

            {/* 4. Location */}
            <div className="space-y-2">
              <Label htmlFor="location">Business Location</Label>
              <Input
                id="location"
                placeholder="e.g., US, Europe, Remote"
                {...register("location", { required: "Please enter a location" })}
              />
              {errors.location && <p className="text-sm text-destructive">{errors.location.message}</p>}
            </div>

            {/* 5. Documents Ready */}
            <div className="space-y-2">
              <Label>Documents Available for Review</Label>
              <div className="grid grid-cols-2 gap-2">
                {["Financial statements", "Contracts", "Business plan", "Legal docs"].map((doc) => (
                  <label key={doc} className="flex items-center gap-2 p-2 border border-input rounded-lg cursor-pointer hover:bg-accent">
                    <input type="checkbox" value={doc} {...register("documentsReady")} className="accent-primary" />
                    {doc}
                  </label>
                ))}
              </div>
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

export default SellerOnboardingPage;
