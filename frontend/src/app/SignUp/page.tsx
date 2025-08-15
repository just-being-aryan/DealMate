'use client'

import { useState } from "react";
import { useForm } from "react-hook-form";
import { useRouter } from "next/navigation";
import { motion } from "framer-motion";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Eye, EyeOff, User, Mail, Lock, ArrowLeft, UserCheck, Briefcase, Check } from "lucide-react";


interface SignUpFormData {
  name: string;
  email: string;
  password: string;
  confirmPassword: string;
  role: 'buyer' | 'seller';
}

const SignUpPage = () => {
  const router = useRouter();
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);

  const {
    register,
    handleSubmit,
    watch,
    formState: { errors, isSubmitting }
  } = useForm<SignUpFormData>();

  const password = watch("password");

  const onSubmit = async (data: SignUpFormData) => {
    try {
      console.log("Sign-up data:", data);
      

      const { registerUser } = await import('../../utils/api');
      
 
      const result = await registerUser(data.name, data.email, data.password, data.role);
      
      alert(`Registration successful! Welcome, ${result.data.name}!`);

      if (data.role === 'buyer') {
        router.push('/buyerDashboard');
      } else if (data.role === 'seller') {
        router.push('/sellerDashboard');
      }
      
    } catch (error: any) {
      console.error("Sign-up error:", error);
      alert(`Registration failed: ${error.message || 'Please try again.'}`);
    }
  };

  const handleBackClick = () => router.push("/");

 const handleSwitchToSignIn = () => {
  const selectedRole = watch("role");
  if (selectedRole === "buyer") {
    router.push("/buyerSignIn");
  } else if (selectedRole === "seller") {
    router.push("/sellerSignIn");
  } else {
    router.push("/buyerSignIn"); 
  }
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
          <div className="flex items-center gap-2 mb-4">
            <Button
              variant="ghost"
              size="icon"
              onClick={handleBackClick}
              className="h-8 w-8"
            >
              <ArrowLeft className="h-4 w-4" />
            </Button>
            <div className="text-sm text-muted-foreground">Back to home</div>
          </div>
          <CardTitle className="text-2xl font-bold text-center">
            Create Your Account
          </CardTitle>
          <CardDescription className="text-center">
            Join our platform and start your acquisition journey
          </CardDescription>
        </CardHeader>
        <CardContent>
          <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
          

            <div className="space-y-3">
            <Label>I want to join as a</Label>
            <div className="grid grid-cols-2 gap-3">
         
                <div className="relative">
                <input
                    type="radio"
                    id="buyer"
                    value="buyer"
                    className="peer sr-only"
                    {...register("role", { required: "Please select a role" })}
                />
                <Label
                    htmlFor="buyer"
                    className="relative flex flex-col items-center justify-center p-4 bg-background border-2 border-input rounded-lg cursor-pointer hover:bg-accent peer-checked:border-primary peer-checked:bg-primary/5 transition-all h-full"
                >
                    <UserCheck className="h-6 w-6 mb-2 text-primary" />
                    <span className="font-medium">Buyer</span>
                    <span className="text-xs text-muted-foreground text-center flex-1">
                    Looking to acquire businesses
                    </span>
                    {/* Tick mark (only visible when selected) */}
                    <Check className="absolute top-2 right-2 h-4 w-4 text-primary opacity-0 peer-checked:opacity-100 transition-opacity" />
                </Label>
                </div>


            


                <div className="relative">
                  <input
                    type="radio"
                    id="seller"
                    value="seller"
                    className="peer sr-only"
                    {...register("role", { required: "Please select a role" })}
                  />
                  <Label
                    htmlFor="seller"
                    className="flex flex-col items-center justify-center p-4 bg-background border-2 border-input rounded-lg cursor-pointer hover:bg-accent peer-checked:border-primary peer-checked:bg-primary/5 transition-all h-full"
                  >
                    <Briefcase className="h-6 w-6 mb-2 text-primary" />
                    <span className="font-medium">Seller</span>
                    <span className="text-xs text-muted-foreground text-center flex-1">
                      Looking to sell my business
                    </span>
                  </Label>
                </div>
              </div>
              {errors.role && (
                <p className="text-sm text-destructive">{errors.role.message}</p>
              )}
            </div>

      
            <div className="space-y-2">
              <Label htmlFor="name">Full Name</Label>
              <div className="relative">
                <User className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />
                <Input
                  id="name"
                  placeholder="Enter your full name"
                  className="pl-10"
                  {...register("name", {
                    required: "Name is required",
                    minLength: { value: 2, message: "Name must be at least 2 characters" }
                  })}
                />
              </div>
              {errors.name && (
                <p className="text-sm text-destructive">{errors.name.message}</p>
              )}
            </div>

      
            <div className="space-y-2">
              <Label htmlFor="email">Email Address</Label>
              <div className="relative">
                <Mail className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />
                <Input
                  id="email"
                  type="email"
                  placeholder="Enter your email"
                  className="pl-10"
                  {...register("email", {
                    required: "Email is required",
                    pattern: {
                      value: /^\S+@\S+$/i,
                      message: "Enter a valid email address"
                    }
                  })}
                />
              </div>
              {errors.email && (
                <p className="text-sm text-destructive">{errors.email.message}</p>
              )}
            </div>

  
            <div className="space-y-2">
              <Label htmlFor="password">Password</Label>
              <div className="relative">
                <Lock className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />
                <Input
                  id="password"
                  type={showPassword ? "text" : "password"}
                  placeholder="Create a password"
                  className="pl-10 pr-10"
                  {...register("password", {
                    required: "Password is required",
                    minLength: { value: 6, message: "Password must be at least 6 characters" }
                  })}
                />
                <Button
                  type="button"
                  variant="ghost"
                  size="icon"
                  className="absolute right-0 top-0 h-full px-3 hover:bg-transparent"
                  onClick={() => setShowPassword(!showPassword)}
                >
                  {showPassword ? (
                    <EyeOff className="h-4 w-4 text-muted-foreground" />
                  ) : (
                    <Eye className="h-4 w-4 text-muted-foreground" />
                  )}
                </Button>
              </div>
              {errors.password && (
                <p className="text-sm text-destructive">{errors.password.message}</p>
              )}
            </div>

            <div className="space-y-2">
              <Label htmlFor="confirmPassword">Confirm Password</Label>
              <div className="relative">
                <Lock className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />
                <Input
                  id="confirmPassword"
                  type={showConfirmPassword ? "text" : "password"}
                  placeholder="Confirm your password"
                  className="pl-10 pr-10"
                  {...register("confirmPassword", {
                    required: "Please confirm your password",
                    validate: value => value === password || "Passwords do not match"
                  })}
                />
                <Button
                  type="button"
                  variant="ghost"
                  size="icon"
                  className="absolute right-0 top-0 h-full px-3 hover:bg-transparent"
                  onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                >
                  {showConfirmPassword ? (
                    <EyeOff className="h-4 w-4 text-muted-foreground" />
                  ) : (
                    <Eye className="h-4 w-4 text-muted-foreground" />
                  )}
                </Button>
              </div>
              {errors.confirmPassword && (
                <p className="text-sm text-destructive">{errors.confirmPassword.message}</p>
              )}
            </div>

       
            <Button
              type="submit"
              size="lg"
              className="w-full"
              disabled={isSubmitting}
            >
              {isSubmitting ? "Creating Account..." : "Create Account"}
            </Button>

      
            <div className="text-center text-sm">
              <span className="text-muted-foreground">Already have an account? </span>
              <Button
                type="button"
                variant="link"
                className="p-0 h-auto font-semibold"
                onClick={handleSwitchToSignIn}
              >
                Sign in
              </Button>
            </div>
          </form>
        </CardContent>
      </Card>
    </motion.div>
  );
};

export default SignUpPage;
