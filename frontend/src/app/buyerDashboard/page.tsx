'use client'

import { useState, useEffect } from 'react'
import DashboardLayout from '@/components/DashboardLayout'
import DealPipeline from '@/components/DealPipeline'
import SwipeInterface from '@/components/SwipeInterface'
import ViewAllMatchesModal from '@/components/ViewAllMatchesModal'
import { SwipedMatchesProvider, useSwipedMatches } from '@/contexts/SwipedMatchesContext'
import { motion } from "framer-motion";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import MatchProfileModal from "../_components/MathProfileModal";
import { 
  TrendingUp, 
  Users, 
  Heart, 
  MessageCircle, 
  Building, 
  DollarSign,
  Clock,
  Star,
  ArrowRight,
  MoreHorizontal
} from "lucide-react";

interface DashboardContentProps {
  userType: 'buyer' | 'seller';
  username: string;
  onNavigate: (section: string) => void;
}

const DashboardContent = ({ userType, username, onNavigate }: DashboardContentProps) => {
  const [selectedMatch, setSelectedMatch] = useState<any>(null);
  const [isViewAllModalOpen, setIsViewAllModalOpen] = useState(false);
  const { rightSwipedMatches } = useSwipedMatches();
  const stats = userType === 'seller' ? {
    views: 156,
    matches: 23,
    messages: 12,
    deals: 3
  } : {
    searches: 89,
    saved: 34,
    matches: 18,
    deals: 2
  };

  const recentMatches = [
    {
      name: "TechStart Solutions",
      company: "SaaS Platform - $2.5M Revenue",
      avatar: "https://images.unsplash.com/photo-1560472354-b33ff0c44a43?w=60",
      status: "New Listing",
      time: "2h ago",
      badge: "Premium"
    },
    {
      name: "Creative Digital Agency", 
      company: "Digital Marketing - $850K Revenue",
      avatar: "https://images.unsplash.com/photo-1542744173-8e7e53415bb0?w=60",
      status: "Interested",
      time: "1d ago",
      badge: "Verified"
    },
    {
      name: "E-commerce Platform",
      company: "Online Retail - $1.2M Revenue",
      avatar: "https://images.unsplash.com/photo-1556742049-0cfed4f6a45d?w=60",
      status: "Under Review",
      time: "3d ago",
      badge: "Premium"
    }
  ];

  return (
    <div className="space-y-6">

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {Object.entries(stats).map(([key, value], index) => {
            const icons = {
              views: TrendingUp,
              matches: Heart,
              messages: MessageCircle,
              deals: Building,
              searches: TrendingUp,
              saved: Star
            };
            const Icon = icons[key as keyof typeof icons] || TrendingUp;
            
            return (
              <motion.div
                key={key}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.1 }}
              >
                <Card className="p-6 card-shadow hover:premium-shadow transition-all duration-300">
                  <div className="flex items-center justify-between mb-4">
                    <div className="w-12 h-12 bg-primary/10 rounded-full flex items-center justify-center">
                      <Icon className="h-6 w-6 text-primary" />
                    </div>
                    <Badge variant="secondary" className="capitalize">{key}</Badge>
                  </div>
                  <div className="space-y-1">
                    <p className="text-2xl font-bold text-foreground">{value}</p>
                    <p className="text-sm text-muted-foreground">
                      {key === 'deals' ? 'Active deals' : 'This month'}
                    </p>
                  </div>
                </Card>
              </motion.div>
            );
          })}
      </div>

      <div className="grid lg:grid-cols-3 gap-8">

          <motion.div
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.4 }}
            className="lg:col-span-1"
          >
            <Card className="p-6 card-shadow">
              <h3 className="text-lg font-semibold mb-4 text-foreground">Quick Actions</h3>
              <div className="space-y-3">
                <Button 
                  variant="default" 
                  className="w-full justify-start group"
                  onClick={() => onNavigate('swipe')}
                >
                  <Heart className="mr-2 h-4 w-4 group-hover:scale-110 transition-transform" />
                  {userType === 'seller' ? 'Discover Buyers' : 'Browse Deals'}
                  <ArrowRight className="ml-auto h-4 w-4 group-hover:translate-x-1 transition-transform" />
                </Button>
                
                <Button 
                  variant="outline" 
                  className="w-full justify-start group"
                >
                  <MessageCircle className="mr-2 h-4 w-4" />
                  Messages
                  <Badge variant="destructive" className="ml-auto">3</Badge>
                </Button>
                
                <Button 
                  variant="outline" 
                  className="w-full justify-start group"
                >
                  <Building className="mr-2 h-4 w-4" />
                  {userType === 'seller' ? 'Edit Listing' : 'My Watchlist'}
                  <ArrowRight className="ml-auto h-4 w-4 group-hover:translate-x-1 transition-transform" />
                </Button>
                
                <Button 
                  variant="outline" 
                  className="w-full justify-start group"
                  onClick={() => onNavigate('dealPipeline')}
                >
                  <DollarSign className="mr-2 h-4 w-4" />
                  Deal Pipeline
                  <ArrowRight className="ml-auto h-4 w-4 group-hover:translate-x-1 transition-transform" />
                </Button>
              </div>
            </Card>
          </motion.div>

         
          <motion.div
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.6 }}
            className="lg:col-span-2"
          >
            <Card className="p-6 card-shadow">
              <div className="flex items-center justify-between mb-6">
                <h3 className="text-lg font-semibold text-foreground">
                  {userType === 'buyer' ? 'Recent Opportunities' : 'Recent Matches'}
                </h3>
                <Button 
                  variant="ghost" 
                  size="sm"
                  onClick={() => setIsViewAllModalOpen(true)}
                >
                  View All ({rightSwipedMatches.length})
                  <ArrowRight className="ml-1 h-4 w-4" />
                </Button>
              </div>
              
              <div className="space-y-4">
                {rightSwipedMatches.slice(0, 3).map((match, index) => (
                  <motion.div
                    key={index}
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.7 + index * 0.1 }}
                    className="flex items-center gap-4 p-4 rounded-lg hover:bg-accent/20 transition-colors cursor-pointer group"
                    onClick={() => setSelectedMatch(match)}
                  >
                    <div className="relative">
                      <img 
                        src={match.avatar}
                        alt={match.name}
                        className="w-12 h-12 rounded-full object-cover"
                      />
                      <div className="absolute -top-1 -right-1 w-4 h-4 bg-success rounded-full border-2 border-white"></div>
                    </div>
                    
                    <div className="flex-1 min-w-0">
                      <div className="flex items-center gap-2 mb-1">
                        <h4 className="font-semibold text-foreground truncate">{match.name}</h4>
                        <Badge variant={match.badge === "Premium" ? "default" : "secondary"} className="text-xs">
                          {match.badge}
                        </Badge>
                      </div>
                      <p className="text-sm text-muted-foreground truncate">{match.company}</p>
                      <div className="flex items-center gap-2 mt-1">
                        <Badge variant="outline" className="text-xs">
                          {match.status}
                        </Badge>
                        <span className="text-xs text-muted-foreground">{match.time}</span>
                      </div>
                    </div>
                    
                    <div className="flex items-center gap-2">
                      <Button variant="ghost" size="sm" className="group-hover:bg-primary/10">
                        <MessageCircle className="h-4 w-4" />
                      </Button>
                      <Button variant="ghost" size="icon" className="w-8 h-8">
                        <MoreHorizontal className="h-4 w-4" />
                      </Button>
                    </div>
                  </motion.div>
                ))}
              </div>
            </Card>
          </motion.div>
      </div>


        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.8 }}
          className="mt-8"
        >
          <Card className="p-6 card-shadow">
            <h3 className="text-lg font-semibold mb-4 text-foreground">Recent Activity</h3>
            <div className="space-y-4">
              {[
                {
                  type: "opportunity",
                  text: "New opportunity: TechStart Solutions listed for acquisition",
                  time: "2 hours ago",
                  icon: Building
                },
                {
                  type: "message",
                  text: "Message received from Creative Digital seller",
                  time: "1 day ago", 
                  icon: MessageCircle
                },
                {
                  type: "saved",
                  text: "Added E-commerce Platform to your watchlist",
                  time: "1 day ago",
                  icon: Star
                }
              ].map((activity, index) => (
                <div key={index} className="flex items-start gap-3 pb-3 border-b border-border/50 last:border-0">
                  <div className="w-8 h-8 bg-primary/10 rounded-full flex items-center justify-center mt-1">
                    <activity.icon className="h-4 w-4 text-primary" />
                  </div>
                  <div className="flex-1">
                    <p className="text-sm text-foreground">{activity.text}</p>
                    <div className="flex items-center gap-2 mt-1">
                      <Clock className="h-3 w-3 text-muted-foreground" />
                      <span className="text-xs text-muted-foreground">{activity.time}</span>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </Card>
      </motion.div>


      <MatchProfileModal 
        match={selectedMatch}
        isOpen={!!selectedMatch}
        onClose={() => setSelectedMatch(null)}
      />
      
    
      <ViewAllMatchesModal 
        isOpen={isViewAllModalOpen}
        onClose={() => setIsViewAllModalOpen(false)}
        userType={userType}
      />
    </div>
  );
};


const BuyerDashboard = () => {
  const [currentSection, setCurrentSection] = useState('dashboard')
  const [username, setUsername] = useState<string>('Buyer')
  const userType = 'buyer' as const

  useEffect(() => {
    try {

      const raw =
        localStorage.getItem('userData') ||
        localStorage.getItem('user') ||
        localStorage.getItem('authUser') ||
        localStorage.getItem('currentUser');

      if (raw) {
        try {
          const parsed = JSON.parse(raw);
          const name =
            parsed?.name ||
            parsed?.data?.name ||
            parsed?.user?.name;
          if (name) {
            setUsername(name);
            return;
          }
        } catch {
         
          if (raw && typeof raw === 'string') {
            setUsername(raw);
            return;
          }
        }
      }

 
      const simple =
        localStorage.getItem('username') ||
        localStorage.getItem('name');
      if (simple) {
        setUsername(simple);
        return;
      }

     
      const token = localStorage.getItem('authToken') || localStorage.getItem('token');
      const API_BASE = process.env.NEXT_PUBLIC_API_BASE_URL || '';
      const meEndpoint = API_BASE ? `${API_BASE}/auth/me` : '/api/auth/me';

      if (token) {
        fetch(meEndpoint, { headers: { Authorization: `Bearer ${token}` } })
          .then((r) => (r.ok ? r.json() : Promise.reject()))
          .then((data) => {
            const name = data?.data?.name || data?.name;
            if (name) setUsername(name);
          })
          .catch(() => {});
      }
    } catch (err){
        console.log(err)
    }
  }, []);

  const handleSectionChange = (section: string) => {
    setCurrentSection(section)
  }

  const handleNavigate = (section: string) => {
    setCurrentSection(section)
  }

  const renderContent = () => {
    switch (currentSection) {
      case 'dashboard':
        return (
          <DashboardContent 
            userType={userType} 
            username={username} 
            onNavigate={handleNavigate} 
          />
        )
      case 'dealPipeline':
        return <DealPipeline userType={userType} />
      case 'swipe':
        return <SwipeInterface userType={userType} />
      default:
        return (
          <DashboardContent 
            userType={userType} 
            username={username} 
            onNavigate={handleNavigate} 
          />
        )
    }
  }

  return (
    <SwipedMatchesProvider>
      <DashboardLayout
        userType={userType}
        username={username}
        currentSection={currentSection}
        onSectionChange={handleSectionChange}
      >
        {renderContent()}
      </DashboardLayout>
    </SwipedMatchesProvider>
  )
}

export default BuyerDashboard;
