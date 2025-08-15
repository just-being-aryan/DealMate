'use client'

import { useState, useRef } from "react";
import { motion, useMotionValue, useTransform, PanInfo } from "framer-motion";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { 
  Heart, 
  X, 
  Star, 
  MapPin, 
  Building, 
  DollarSign, 
  Clock,
  TrendingUp,
  Shield
} from "lucide-react";
import { useSwipedMatches, SwipedMatch } from '@/contexts/SwipedMatchesContext';


interface SwipeInterfaceProps {
  userType: 'buyer' | 'seller';
}

// Mock data for both buyers and deals
const generateMockData = (userType: 'buyer' | 'seller'): SwipedMatch[] => {
  const buyerData: SwipedMatch[] = [
    {
      id: "deal1",
      name: "TechStart Solutions",
      company: "SaaS Platform - $2.5M Revenue",
      avatar: "https://images.unsplash.com/photo-1560472354-b33ff0c44a43?w=400",
      status: "Active Listing",
      time: "2 hours ago",
      badge: "Premium",
      description: "Established SaaS platform with strong recurring revenue model. Looking for strategic buyer.",
      value: 2500000,
      location: "San Francisco, CA",
      industry: "SaaS"
    },
    {
      id: "deal2",
      name: "Creative Digital Agency",
      company: "Full-Service Digital Marketing - $850K Revenue",
      avatar: "https://images.unsplash.com/photo-1542744173-8e7e53415bb0?w=400",
      status: "New Listing",
      time: "1 day ago",
      badge: "Verified",
      description: "Award-winning digital agency with 50+ enterprise clients. Strong team and processes.",
      value: 850000,
      location: "Austin, TX",
      industry: "Marketing"
    },
    {
      id: "deal3",
      name: "E-commerce Platform",
      company: "Online Retail - $1.2M Revenue",
      avatar: "https://images.unsplash.com/photo-1556742049-0cfed4f6a45d?w=400",
      status: "Hot Deal",
      time: "3 hours ago",
      badge: "Premium",
      description: "Multi-vendor e-commerce platform with established customer base and inventory management.",
      value: 1200000,
      location: "Seattle, WA",
      industry: "E-commerce"
    }
  ];

  const sellerData: SwipedMatch[] = [
    {
      id: "buyer1",
      name: "Sarah Chen",
      company: "TechVentures Capital",
      avatar: "https://images.unsplash.com/photo-1494790108755-2616b612b786?w=400",
      status: "Active Investor",
      time: "2 hours ago",
      badge: "Premium",
      description: "Serial entrepreneur turned investor. Looking for scalable tech businesses with strong recurring revenue models.",
      value: 5000000,
      location: "San Francisco, CA",
      industry: "Technology"
    },
    {
      id: "buyer2",
      name: "Marcus Rodriguez",
      company: "Horizon Capital Partners",
      avatar: "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=400",
      status: "Seeking Deals",
      time: "1 day ago",
      badge: "Verified",
      description: "Private equity professional with 15+ years M&A experience. Focus on $1M-$10M acquisitions.",
      value: 10000000,
      location: "Chicago, IL",
      industry: "Private Equity"
    },
    {
      id: "buyer3",
      name: "Elena Kowalski",
      company: "Growth Partners LLC",
      avatar: "https://images.unsplash.com/photo-1580489944761-15a19d654956?w=400",
      status: "Hot Prospect",
      time: "3 hours ago",
      badge: "Premium",
      description: "Strategic acquirer specializing in e-commerce and digital marketing businesses.",
      value: 3000000,
      location: "Miami, FL",
      industry: "Strategic"
    }
  ];

  // Add more dummy data to reach 20 items
  const additionalData = Array.from({ length: 17 }, (_, i) => ({
    id: `${userType}${i + 4}`,
    name: userType === 'buyer' ? `Business Deal ${i + 4}` : `Investor ${i + 4}`,
    company: userType === 'buyer' 
      ? `${['Tech', 'Marketing', 'E-commerce', 'SaaS', 'FinTech'][i % 5]} Company - $${(Math.random() * 2 + 0.5).toFixed(1)}M Revenue`
      : `${['Venture', 'Growth', 'Strategic', 'Private', 'Angel'][i % 5]} ${['Capital', 'Partners', 'Ventures', 'Group', 'Fund'][i % 5]}`,
    avatar: `https://images.unsplash.com/photo-${1500000000000 + i * 1000000}?w=400`,
    status: ['Active', 'New', 'Hot Deal', 'Premium', 'Verified'][i % 5],
    time: `${i + 1} ${i === 0 ? 'hour' : 'hours'} ago`,
    badge: ['Premium', 'Verified', 'Premium', 'Verified', 'Premium'][i % 5],
    description: userType === 'buyer' 
      ? `Growing business in the ${['tech', 'marketing', 'retail', 'software', 'finance'][i % 5]} sector with strong fundamentals.`
      : `Experienced ${['investor', 'acquirer', 'buyer', 'partner', 'fund'][i % 5]} looking for quality opportunities.`,
    value: Math.floor(Math.random() * 5000000) + 500000,
    location: ['New York, NY', 'San Francisco, CA', 'Austin, TX', 'Seattle, WA', 'Boston, MA'][i % 5],
    industry: ['Technology', 'Marketing', 'E-commerce', 'SaaS', 'FinTech'][i % 5]
  }));

  return userType === 'buyer' 
    ? [...buyerData, ...additionalData]
    : [...sellerData, ...additionalData];
};

const SwipeInterface = ({ userType }: SwipeInterfaceProps) => {
  const { addRightSwipe, addLeftSwipe } = useSwipedMatches();
  const [currentIndex, setCurrentIndex] = useState(0);
  const [exitX, setExitX] = useState(0);
  const cardRefs = useRef<(HTMLDivElement | null)[]>([]);
  const mockData = generateMockData(userType);

  const x = useMotionValue(0);
  const rotate = useTransform(x, [-200, 200], [-25, 25]);
  const opacity = useTransform(x, [-200, -125, 0, 125, 200], [0, 1, 1, 1, 0]);

  const handleDragEnd = (event: any, info: PanInfo) => {
    const threshold = 100;
    const currentCard = mockData[currentIndex];
    
    if (Math.abs(info.offset.x) > threshold && currentCard) {
      const direction = info.offset.x > 0 ? 'right' : 'left';
      
      // Add to context based on swipe direction
      if (direction === 'right') {
        addRightSwipe(currentCard);
      } else {
        addLeftSwipe(currentCard);
      }
      
      setExitX(info.offset.x > 0 ? 200 : -200);
      setTimeout(() => {
        setCurrentIndex(prev => prev + 1);
        setExitX(0);
        x.set(0);
      }, 200);
    } else {
      x.set(0);
    }
  };

  const handleAction = (action: 'like' | 'pass') => {
    const currentCard = mockData[currentIndex];
    
    if (currentCard) {
      if (action === 'like') {
        addRightSwipe(currentCard);
      } else {
        addLeftSwipe(currentCard);
      }
    }
    
    setExitX(action === 'like' ? 200 : -200);
    setTimeout(() => {
      setCurrentIndex(prev => prev + 1);
      setExitX(0);
      x.set(0);
    }, 200);
  };

  if (currentIndex >= mockData.length) {
    return (
      <div className="min-h-screen flex items-center justify-center px-4">
        <motion.div 
          initial={{ opacity: 0, scale: 0.8 }}
          animate={{ opacity: 1, scale: 1 }}
          className="text-center max-w-md mx-auto"
        >
          <div className="w-20 h-20 bg-primary/10 rounded-full flex items-center justify-center mx-auto mb-6">
            <Star className="h-10 w-10 text-primary" />
          </div>
          <h2 className="text-2xl font-bold mb-4">You've seen all {userType === 'buyer' ? 'deals' : 'investors'}!</h2>
          <p className="text-muted-foreground mb-6">
            Check back soon for new potential matches, or refine your preferences to see more options.
          </p>
          <Button variant="default" className="w-full">
            Adjust Preferences
          </Button>
        </motion.div>
      </div>
    );
  }

  const currentCard = mockData[currentIndex];

  const formatCurrency = (amount: number) => {
    return new Intl.NumberFormat('en-US', {
      style: 'currency',
      currency: 'USD',
      minimumFractionDigits: 0,
      maximumFractionDigits: 0
    }).format(amount);
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-background via-secondary/20 to-accent/20 flex items-center justify-center px-4 py-8">
      <div className="relative w-full max-w-sm mx-auto">
        {/* Background cards for depth */}
        {mockData.slice(currentIndex + 1, currentIndex + 3).map((card, index) => (
          <motion.div
            key={card.id}
            className="absolute inset-0 pointer-events-none"
            style={{
              scale: 1 - (index + 1) * 0.05,
              y: (index + 1) * 8,
              zIndex: -index - 1
            }}
          >
            <Card className="w-full h-[600px] bg-card/60 backdrop-blur" />
          </motion.div>
        ))}

        {/* Main swipe card */}
        <motion.div
          ref={(el) => { cardRefs.current[currentIndex] = el; }}
          className="relative"
          style={{ x, rotate, opacity }}
          drag="x"
          dragConstraints={{ left: 0, right: 0 }}
          onDragEnd={handleDragEnd}
          animate={{ x: exitX }}
          transition={{ type: "spring", stiffness: 300, damping: 30 }}
        >
          <Card className="w-full h-[600px] swipe-card cursor-grab active:cursor-grabbing">
            <div className="relative h-full">
              {/* Header with avatar and verification */}
              <div className="p-6 border-b">
                <div className="flex items-start gap-4">
                  <div className="relative">
                    <img 
                      src={currentCard.avatar}
                      alt={currentCard.name}
                      className="w-16 h-16 rounded-full object-cover"
                    />
                    {currentCard.badge === "Premium" && (
                      <div className="absolute -top-1 -right-1 w-6 h-6 bg-primary rounded-full flex items-center justify-center">
                        <Shield className="h-3 w-3 text-white" />
                      </div>
                    )}
                  </div>
                  
                  <div className="flex-1 min-w-0">
                    <div className="flex items-center gap-2 mb-1">
                      <h3 className="text-xl font-bold text-foreground truncate">
                        {currentCard.name}
                      </h3>
                      <Badge variant={currentCard.badge === "Premium" ? "default" : "secondary"}>
                        {currentCard.badge}
                      </Badge>
                    </div>
                    <p className="text-muted-foreground font-medium">{currentCard.company}</p>
                    <div className="flex items-center gap-1 text-sm text-muted-foreground mt-1">
                      <MapPin className="h-3 w-3" />
                      {currentCard.location}
                    </div>
                  </div>

                  <div className="text-right">
                    <div className="flex items-center gap-1 mb-1">
                      <TrendingUp className="h-4 w-4 text-success" />
                      <span className="font-semibold text-success">95%</span>
                    </div>
                    <p className="text-xs text-muted-foreground">Readiness Score</p>
                  </div>
                </div>
              </div>

              {/* Investment details */}
              <div className="p-6 space-y-4">
                <div className="grid grid-cols-2 gap-4">
                  <div className="flex items-center gap-2">
                    <DollarSign className="h-4 w-4 text-primary" />
                    <div>
                      <p className="text-xs text-muted-foreground">
                        {userType === 'buyer' ? 'Asking Price' : 'Investment Range'}
                      </p>
                      <p className="font-semibold">
                        {userType === 'buyer' 
                          ? formatCurrency(currentCard.value || 0)
                          : `${formatCurrency(1000000)} - ${formatCurrency(currentCard.value || 5000000)}`
                        }
                      </p>
                    </div>
                  </div>
                  
                  <div className="flex items-center gap-2">
                    <Clock className="h-4 w-4 text-primary" />
                    <div>
                      <p className="text-xs text-muted-foreground">Timeline</p>
                      <p className="font-semibold">3-6 months</p>
                    </div>
                  </div>
                </div>

                <div>
                  <p className="text-sm text-muted-foreground mb-2">
                    {userType === 'buyer' ? 'Industry' : 'Experience'}
                  </p>
                  <p className="font-medium">
                    {userType === 'buyer' 
                      ? currentCard.industry || 'Technology'
                      : '15+ years M&A'
                    }
                  </p>
                </div>

                <div>
                  <p className="text-sm text-muted-foreground mb-2">
                    {userType === 'buyer' ? 'Business Type' : 'Industries of Interest'}
                  </p>
                  <div className="flex flex-wrap gap-2">
                    {['SaaS', 'E-commerce', 'FinTech'].map((industry, index) => (
                      <Badge key={index} variant="outline" className="text-xs">
                        {industry}
                      </Badge>
                    ))}
                  </div>
                </div>

                <div>
                  <p className="text-sm text-muted-foreground mb-2">About</p>
                  <p className="text-sm leading-relaxed">{currentCard.description}</p>
                </div>

                <div className="pt-2 border-t">
                  <p className="text-xs text-muted-foreground">
                    Active {currentCard.time}
                  </p>
                </div>
              </div>
            </div>
          </Card>
        </motion.div>

        {/* Action buttons */}
        <div className="flex justify-center gap-8 mt-8">
          <Button
            variant="outline"
            size="icon"
            className="w-14 h-14 rounded-full border-2 border-destructive/20 hover:border-destructive hover:bg-destructive/10"
            onClick={() => handleAction('pass')}
          >
            <X className="h-6 w-6 text-destructive" />
          </Button>
          
          <Button
            variant="outline"
            size="icon"
            className="w-14 h-14 rounded-full border-2 border-primary/20 hover:border-primary hover:bg-primary/10"
            onClick={() => handleAction('like')}
          >
            <Heart className="h-6 w-6 text-primary" />
          </Button>
        </div>

        {/* Match indicator overlays */}
        <motion.div
          className="absolute inset-0 flex items-center justify-center pointer-events-none"
          style={{ 
            opacity: useTransform(x, [50, 150], [0, 1]),
            rotate: useTransform(x, [50, 150], [-10, 0])
          }}
        >
          <div className="bg-success text-white px-6 py-3 rounded-full font-bold text-lg border-4 border-white shadow-lg">
            INTERESTED
          </div>
        </motion.div>

        <motion.div
          className="absolute inset-0 flex items-center justify-center pointer-events-none"
          style={{ 
            opacity: useTransform(x, [-150, -50], [1, 0]),
            rotate: useTransform(x, [-150, -50], [0, 10])
          }}
        >
          <div className="bg-destructive text-white px-6 py-3 rounded-full font-bold text-lg border-4 border-white shadow-lg">
            PASS
          </div>
        </motion.div>
      </div>
    </div>
  );
};

export default SwipeInterface;