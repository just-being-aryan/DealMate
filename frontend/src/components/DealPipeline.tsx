import { useState } from "react";
import { motion } from "framer-motion";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Progress } from "@/components/ui/progress";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { AIDocumentAnalyzer } from "./AIDocumentAnalyzer";
import { AIRiskAssessment } from "./AIRiskAssessment";
import { SmartCommunication } from "./SmartCommunication";
import { 
  FileText, 
  Search, 
  MessageSquare, 
  CheckCircle, 
  Clock,
  ArrowRight,
  Upload,
  Users,
  Calculator,
  Award,
  Brain,
  Shield,
  Zap
} from "lucide-react";

interface DealWorkflowProps {
  dealId?: string;
  userType?: "seller" | "buyer";
}

const DealPipeline = ({ dealId }: DealWorkflowProps) => {
  const [activeTab, setActiveTab] = useState("pipeline");
  const dealStages = [
    {
      id: 1,
      title: "Initial Contact & NDA",
      description: "Exchange NDAs and basic business information",
      icon: FileText,
      status: "completed",
      progress: 100,
      items: [
        { task: "NDA Signed", completed: true },
        { task: "Initial Business Summary", completed: true },
        { task: "Preliminary Valuation", completed: true }
      ]
    },
    {
      id: 2,
      title: "Due Diligence",
      description: "Comprehensive business and financial review",
      icon: Search,
      status: "active",
      progress: 65,
      items: [
        { task: "Financial Statements Review", completed: true },
        { task: "Legal Documentation", completed: true },
        { task: "Customer Interviews", completed: false },
        { task: "Technology Assessment", completed: false }
      ]
    },
    {
      id: 3,
      title: "Negotiation",
      description: "Terms discussion and deal structuring",
      icon: MessageSquare,
      status: "pending",
      progress: 0,
      items: [
        { task: "Initial Offer", completed: false },
        { task: "Terms Negotiation", completed: false },
        { task: "Contract Drafting", completed: false }
      ]
    },
    {
      id: 4,
      title: "Closing",
      description: "Final paperwork and transaction completion",
      icon: CheckCircle,
      status: "pending",
      progress: 0,
      items: [
        { task: "Final Due Diligence", completed: false },
        { task: "Escrow Setup", completed: false },
        { task: "Transfer of Assets", completed: false },
        { task: "Closing Celebration", completed: false }
      ]
    }
  ];

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'completed': return 'default';
      case 'active': return 'default';
      case 'pending': return 'secondary';
      default: return 'secondary';
    }
  };

  const getStatusIcon = (status: string) => {
    switch (status) {
      case 'completed': return CheckCircle;
      case 'active': return Clock;
      case 'pending': return Clock;
      default: return Clock;
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-background via-secondary/10 to-accent/10 p-6">
      <div className="max-w-6xl mx-auto">
        {/* Header */}
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="mb-8"
        >
          <div className="flex items-center justify-between mb-4">
            <div>
              <h1 className="text-3xl font-bold text-foreground mb-2">AI-Powered Deal Pipeline</h1>
              <p className="text-muted-foreground">
                Smart acquisition platform with AI-driven insights and automation
              </p>
            </div>
            <div className="flex items-center gap-4">
              <Badge variant="default" className="text-sm px-3 py-1 flex items-center gap-1">
                <Zap className="h-3 w-3" />
                AI Enhanced
              </Badge>
              <Badge variant="outline" className="text-sm px-3 py-1">
                Active Deal
              </Badge>
            </div>
          </div>

          {/* Deal Summary Cards */}
          <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-8">
            <Card className="p-4 card-shadow">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 bg-primary/10 rounded-full flex items-center justify-center">
                  <Calculator className="h-5 w-5 text-primary" />
                </div>
                <div>
                  <p className="text-sm text-muted-foreground">Deal Value</p>
                  <p className="text-lg font-bold text-foreground">$2.5M</p>
                </div>
              </div>
            </Card>

            <Card className="p-4 card-shadow">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 bg-info/10 rounded-full flex items-center justify-center">
                  <Clock className="h-5 w-5 text-info" />
                </div>
                <div>
                  <p className="text-sm text-muted-foreground">Timeline</p>
                  <p className="text-lg font-bold text-foreground">45 days</p>
                </div>
              </div>
            </Card>

            <Card className="p-4 card-shadow">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 bg-warning/10 rounded-full flex items-center justify-center">
                  <Users className="h-5 w-5 text-warning" />
                </div>
                <div>
                  <p className="text-sm text-muted-foreground">Team Members</p>
                  <p className="text-lg font-bold text-foreground">8</p>
                </div>
              </div>
            </Card>

            <Card className="p-4 card-shadow">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 bg-success/10 rounded-full flex items-center justify-center">
                  <Award className="h-5 w-5 text-success" />
                </div>
                <div>
                  <p className="text-sm text-muted-foreground">Completion</p>
                  <p className="text-lg font-bold text-foreground">41%</p>
                </div>
              </div>
            </Card>
          </div>
        </motion.div>

        {/* AI-Enhanced Deal Management Tabs */}
        <Tabs value={activeTab} onValueChange={setActiveTab} className="w-full">
          <TabsList className="grid w-full grid-cols-4 mb-8">
            <TabsTrigger value="pipeline" className="flex items-center gap-2">
              <Award className="h-4 w-4" />
              Pipeline
            </TabsTrigger>
            <TabsTrigger value="documents" className="flex items-center gap-2">
              <Brain className="h-4 w-4" />
              AI Documents
            </TabsTrigger>
            <TabsTrigger value="risk" className="flex items-center gap-2">
              <Shield className="h-4 w-4" />
              Risk Analysis
            </TabsTrigger>
            <TabsTrigger value="communication" className="flex items-center gap-2">
              <MessageSquare className="h-4 w-4" />
              Smart Comms
            </TabsTrigger>
          </TabsList>

          <TabsContent value="pipeline" className="space-y-6">
            {/* Deal Stages */}
            <div className="space-y-6">
          {dealStages.map((stage, index) => {
            const StatusIcon = getStatusIcon(stage.status);
            const StageIcon = stage.icon;
            
            return (
              <motion.div
                key={stage.id}
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: index * 0.1 }}
              >
                <Card className={`p-6 card-shadow transition-all duration-300 ${
                  stage.status === 'active' ? 'ring-2 ring-primary/20 premium-shadow' : ''
                }`}>
                  <div className="flex items-start gap-6">
                    {/* Stage Number & Icon */}
                    <div className="flex flex-col items-center">
                      <div className={`w-12 h-12 rounded-full flex items-center justify-center mb-2 ${
                        stage.status === 'completed' ? 'bg-success text-white' :
                        stage.status === 'active' ? 'bg-primary text-white' :
                        'bg-muted text-muted-foreground'
                      }`}>
                        <StageIcon className="h-6 w-6" />
                      </div>
                      <span className="text-sm font-medium text-muted-foreground">
                        Stage {stage.id}
                      </span>
                    </div>

                    {/* Stage Content */}
                    <div className="flex-1">
                      <div className="flex items-center justify-between mb-4">
                        <div>
                          <h3 className="text-xl font-semibold text-foreground mb-1">
                            {stage.title}
                          </h3>
                          <p className="text-muted-foreground">{stage.description}</p>
                        </div>
                        
                        <div className="flex items-center gap-3">
                          <Badge variant={getStatusColor(stage.status)}>
                            <StatusIcon className="mr-1 h-3 w-3" />
                            {stage.status.charAt(0).toUpperCase() + stage.status.slice(1)}
                          </Badge>
                          {stage.status !== 'pending' && (
                            <span className="text-sm font-medium text-foreground">
                              {stage.progress}%
                            </span>
                          )}
                        </div>
                      </div>

                      {/* Progress Bar */}
                      <div className="mb-4">
                        <Progress value={stage.progress} className="h-2" />
                      </div>

                      {/* Task List */}
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-3 mb-4">
                        {stage.items.map((item, itemIndex) => (
                          <div 
                            key={itemIndex}
                            className={`flex items-center gap-2 p-2 rounded-md transition-colors ${
                              item.completed ? 'bg-success/10' : 'bg-muted/30'
                            }`}
                          >
                            <CheckCircle className={`h-4 w-4 ${
                              item.completed ? 'text-success' : 'text-muted-foreground'
                            }`} />
                            <span className={`text-sm ${
                              item.completed ? 'text-foreground line-through' : 'text-foreground'
                            }`}>
                              {item.task}
                            </span>
                          </div>
                        ))}
                      </div>

                      {/* Action Buttons */}
                      {stage.status === 'active' && (
                        <div className="flex gap-3">
                          <Button variant="default" size="sm">
                            <MessageSquare className="mr-2 h-4 w-4" />
                            Message Team
                          </Button>
                          <Button variant="outline" size="sm">
                            <Upload className="mr-2 h-4 w-4" />
                            Upload Documents
                          </Button>
                          <Button variant="outline" size="sm">
                            View Details
                            <ArrowRight className="ml-2 h-4 w-4" />
                          </Button>
                        </div>
                      )}
                    </div>
                  </div>
                </Card>
              </motion.div>
            );
          })}
            </div>

            {/* Next Steps */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.5 }}
              className="mt-8"
            >
              <Card className="p-6 card-shadow bg-gradient-to-r from-primary/5 to-primary-glow/5">
                <div className="flex items-center justify-between">
                  <div>
                    <h3 className="text-lg font-semibold text-foreground mb-2 flex items-center gap-2">
                      <Brain className="h-5 w-5 text-primary" />
                      AI Recommendation: Customer Interviews
                    </h3>
                    <p className="text-muted-foreground">
                      Our AI analysis suggests scheduling customer calls now to validate revenue streams and address buyer concerns about customer concentration.
                    </p>
                  </div>
                  <Button variant="default" className="shrink-0">
                    Schedule Now
                    <ArrowRight className="ml-2 h-4 w-4" />
                  </Button>
                </div>
              </Card>
            </motion.div>
          </TabsContent>

          <TabsContent value="documents">
            <AIDocumentAnalyzer />
          </TabsContent>

          <TabsContent value="risk">
            <AIRiskAssessment />
          </TabsContent>

          <TabsContent value="communication">
            <SmartCommunication />
          </TabsContent>
        </Tabs>
      </div>
    </div>
  );
};

export default DealPipeline;