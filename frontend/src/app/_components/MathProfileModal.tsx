'use client'

import { motion } from "framer-motion";
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Card } from "@/components/ui/card";
import { 
  Building, 
  MapPin, 
  DollarSign, 
  Users, 
  Calendar, 
  TrendingUp,
  MessageCircle,
  Heart,
  X
} from "lucide-react";

interface MatchProfileModalProps {
  match: any;
  isOpen: boolean;
  onClose: () => void;
}

const MatchProfileModal = ({ match, isOpen, onClose }: MatchProfileModalProps) => {
  if (!match) return null;

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="max-w-2xl max-h-[90vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle className="flex items-center gap-3">
            <img 
              src={match.avatar}
              alt={match.name}
              className="w-12 h-12 rounded-full object-cover"
            />
            <div>
              <h2 className="text-xl font-bold">{match.name}</h2>
              <p className="text-muted-foreground">{match.company}</p>
            </div>
          </DialogTitle>
        </DialogHeader>

        <div className="space-y-6">
        
          <div className="flex items-center gap-2">
            <Badge variant={match.badge === "Premium" ? "default" : "secondary"}>
              {match.badge}
            </Badge>
            <Badge variant="outline">{match.status}</Badge>
            <span className="text-sm text-muted-foreground ml-auto">{match.time}</span>
          </div>


          <Card className="p-6">
            <h3 className="font-semibold mb-4">Profile Details</h3>
            <div className="grid grid-cols-2 gap-4">
              <div className="flex items-center gap-2">
                <Building className="h-4 w-4 text-muted-foreground" />
                <span className="text-sm">{match.company}</span>
              </div>
              <div className="flex items-center gap-2">
                <MapPin className="h-4 w-4 text-muted-foreground" />
                <span className="text-sm">New York, NY</span>
              </div>
              <div className="flex items-center gap-2">
                <DollarSign className="h-4 w-4 text-muted-foreground" />
                <span className="text-sm">$5M - $50M Range</span>
              </div>
              <div className="flex items-center gap-2">
                <Users className="h-4 w-4 text-muted-foreground" />
                <span className="text-sm">50-200 Employees</span>
              </div>
              <div className="flex items-center gap-2">
                <Calendar className="h-4 w-4 text-muted-foreground" />
                <span className="text-sm">Founded 2018</span>
              </div>
              <div className="flex items-center gap-2">
                <TrendingUp className="h-4 w-4 text-muted-foreground" />
                <span className="text-sm">$12M ARR</span>
              </div>
            </div>
          </Card>


          <Card className="p-6">
            <h3 className="font-semibold mb-3">About</h3>
            <p className="text-sm text-muted-foreground leading-relaxed">
              Experienced buyer with a focus on SaaS companies in the mid-market segment. 
              Looking for profitable businesses with strong recurring revenue and growth potential. 
              Previous successful acquisitions include 3 companies in the last 5 years.
            </p>
          </Card>

      
          <Card className="p-6">
            <h3 className="font-semibold mb-3">Industries of Interest</h3>
            <div className="flex flex-wrap gap-2">
              {["SaaS", "FinTech", "HealthTech", "E-commerce"].map((industry) => (
                <Badge key={industry} variant="outline" className="text-xs">
                  {industry}
                </Badge>
              ))}
            </div>
          </Card>

  
          <div className="flex gap-3 pt-4 border-t">
            <Button className="flex-1" size="lg">
              <MessageCircle className="mr-2 h-4 w-4" />
              Send Message
            </Button>
            <Button variant="outline" size="lg">
              <Heart className="mr-2 h-4 w-4" />
              Add to Favorites
            </Button>
            <Button variant="outline" size="icon">
              <X className="h-4 w-4" />
            </Button>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
};

export default MatchProfileModal;