import { motion } from "framer-motion";
import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { 
  MessageCircle, 
  MoreHorizontal, 
  Building, 
  MapPin,
  DollarSign,
  TrendingUp,
  Filter
} from "lucide-react";

interface MatchesViewProps {
  onMatchClick: (match: any) => void;
}

const MatchesView = ({ onMatchClick }: MatchesViewProps) => {
  const allMatches = [
    {
      name: "Sarah Chen",
      company: "TechVentures Capital",
      avatar: "https://images.unsplash.com/photo-1494790108755-2616b612b786?w=60",
      status: "New Match",
      time: "2h ago",
      badge: "Premium",
      location: "San Francisco, CA",
      range: "$10M - $100M",
      industries: ["SaaS", "AI/ML"],
      revenue: "$25M ARR"
    },
    {
      name: "Marcus Rodriguez", 
      company: "Horizon Capital",
      avatar: "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=60",
      status: "Interested",
      time: "1d ago",
      badge: "Verified",
      location: "Austin, TX",
      range: "$5M - $50M",
      industries: ["FinTech", "SaaS"],
      revenue: "$15M ARR"
    },
    {
      name: "Elena Kowalski",
      company: "Growth Partners",
      avatar: "https://images.unsplash.com/photo-1580489944761-15a19d654956?w=60",
      status: "In Discussion",
      time: "3d ago",
      badge: "Premium",
      location: "New York, NY",
      range: "$20M - $200M",
      industries: ["HealthTech", "SaaS"],
      revenue: "$45M ARR"
    },
    {
      name: "David Kim",
      company: "Innovation Fund",
      avatar: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=60",
      status: "Viewed Profile",
      time: "5d ago",
      badge: "Verified",
      location: "Seattle, WA",
      range: "$1M - $25M",
      industries: ["E-commerce", "Logistics"],
      revenue: "$8M ARR"
    },
    {
      name: "Jennifer Walsh",
      company: "Apex Acquisitions",
      avatar: "https://images.unsplash.com/photo-1544725176-7c40e5a71c5e?w=60",
      status: "New Match",
      time: "1w ago",
      badge: "Premium",
      location: "Chicago, IL",
      range: "$50M - $500M",
      industries: ["Manufacturing", "B2B"],
      revenue: "$120M ARR"
    },
    {
      name: "Robert Chen",
      company: "Strategic Ventures",
      avatar: "https://images.unsplash.com/photo-1560250097-0b93528c311a?w=60",
      status: "Interested",
      time: "1w ago",
      badge: "Verified",
      location: "Los Angeles, CA",
      range: "$2M - $20M",
      industries: ["Media", "Entertainment"],
      revenue: "$6M ARR"
    }
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-background via-secondary/10 to-accent/10 p-6">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="mb-8"
        >
          <div className="flex items-center justify-between mb-6">
            <div>
              <h1 className="text-3xl font-bold text-foreground mb-2">All Matches</h1>
              <p className="text-muted-foreground">Your complete list of potential acquisition partners</p>
            </div>
            <Button variant="outline" className="gap-2">
              <Filter className="h-4 w-4" />
              Filter & Sort
            </Button>
          </div>
        </motion.div>

        {/* Matches Grid */}
        <div className="grid lg:grid-cols-2 xl:grid-cols-3 gap-6">
          {allMatches.map((match, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.1 }}
            >
              <Card 
                className="p-6 card-shadow hover:premium-shadow transition-all duration-300 cursor-pointer group"
                onClick={() => onMatchClick(match)}
              >
                <div className="flex items-start gap-4 mb-4">
                  <div className="relative">
                    <img 
                      src={match.avatar}
                      alt={match.name}
                      className="w-16 h-16 rounded-full object-cover"
                    />
                    <div className="absolute -top-1 -right-1 w-4 h-4 bg-success rounded-full border-2 border-white"></div>
                  </div>
                  
                  <div className="flex-1 min-w-0">
                    <div className="flex items-center gap-2 mb-1">
                      <h3 className="font-semibold text-foreground truncate">{match.name}</h3>
                      <Badge variant={match.badge === "Premium" ? "default" : "secondary"} className="text-xs">
                        {match.badge}
                      </Badge>
                    </div>
                    <p className="text-sm text-muted-foreground truncate mb-2">{match.company}</p>
                    <div className="flex items-center gap-2">
                      <Badge variant="outline" className="text-xs">
                        {match.status}
                      </Badge>
                      <span className="text-xs text-muted-foreground">{match.time}</span>
                    </div>
                  </div>

                  <Button variant="ghost" size="icon" className="w-8 h-8 opacity-0 group-hover:opacity-100 transition-opacity">
                    <MoreHorizontal className="h-4 w-4" />
                  </Button>
                </div>

                {/* Match Details */}
                <div className="space-y-3 mb-4">
                  <div className="flex items-center gap-2 text-sm">
                    <MapPin className="h-4 w-4 text-muted-foreground" />
                    <span className="text-muted-foreground">{match.location}</span>
                  </div>
                  <div className="flex items-center gap-2 text-sm">
                    <DollarSign className="h-4 w-4 text-muted-foreground" />
                    <span className="text-muted-foreground">{match.range}</span>
                  </div>
                  <div className="flex items-center gap-2 text-sm">
                    <TrendingUp className="h-4 w-4 text-muted-foreground" />
                    <span className="text-muted-foreground">{match.revenue}</span>
                  </div>
                </div>

                {/* Industries */}
                <div className="mb-4">
                  <div className="flex flex-wrap gap-1">
                    {match.industries.map((industry) => (
                      <Badge key={industry} variant="outline" className="text-xs">
                        {industry}
                      </Badge>
                    ))}
                  </div>
                </div>

                {/* Action Button */}
                <Button 
                  variant="outline" 
                  className="w-full group-hover:bg-primary group-hover:text-primary-foreground transition-colors"
                  onClick={(e) => {
                    e.stopPropagation();
                    console.log('Message clicked for', match.name);
                  }}
                >
                  <MessageCircle className="mr-2 h-4 w-4" />
                  Send Message
                </Button>
              </Card>
            </motion.div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default MatchesView;