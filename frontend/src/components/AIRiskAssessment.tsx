import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Progress } from "@/components/ui/progress";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { 
  Shield, 
  AlertTriangle, 
  TrendingUp, 
  Users, 
  Target,
  RefreshCw,
  Brain
} from "lucide-react";

interface RiskFactor {
  category: string;
  risk: string;
  severity: 'low' | 'medium' | 'high';
  probability: number;
  impact: string;
  mitigation: string;
}

export const AIRiskAssessment = () => {
  const overallRiskScore = 32; // Low-medium risk

  const riskFactors: RiskFactor[] = [
    {
      category: "Financial",
      risk: "Customer Concentration",
      severity: "medium",
      probability: 35,
      impact: "15% revenue from single customer",
      mitigation: "Diversify customer base over next 12 months"
    },
    {
      category: "Market",
      risk: "Competitive Pressure",
      severity: "medium",
      probability: 45,
      impact: "New entrants with similar offerings",
      mitigation: "Strengthen competitive moats and IP protection"
    },
    {
      category: "Operational",
      risk: "Key Person Dependency",
      severity: "high",
      probability: 60,
      impact: "Founder handles 70% of client relationships",
      mitigation: "Implement succession planning and team expansion"
    },
    {
      category: "Technology",
      risk: "Technical Debt",
      severity: "low",
      probability: 25,
      impact: "Legacy code affecting scalability",
      mitigation: "Gradual code refactoring planned"
    },
    {
      category: "Legal",
      risk: "Regulatory Changes",
      severity: "low",
      probability: 20,
      impact: "Potential compliance costs",
      mitigation: "Monitor regulatory landscape closely"
    }
  ];

  const getSeverityColor = (severity: string) => {
    switch (severity) {
      case 'low': return 'bg-success text-white';
      case 'medium': return 'bg-warning text-white';
      case 'high': return 'bg-destructive text-white';
      default: return 'bg-muted text-muted-foreground';
    }
  };

  const getRiskScoreColor = (score: number) => {
    if (score <= 30) return 'text-success';
    if (score <= 70) return 'text-warning';
    return 'text-destructive';
  };

  return (
    <div className="space-y-6">
      {/* Overall Risk Score */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Brain className="h-5 w-5 text-primary" />
            AI Risk Assessment
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="flex items-center justify-between mb-6">
            <div>
              <h3 className="text-2xl font-bold mb-1">
                <span className={getRiskScoreColor(overallRiskScore)}>
                  {overallRiskScore}% Risk Score
                </span>
              </h3>
              <p className="text-muted-foreground">
                Overall deal risk assessment based on AI analysis
              </p>
            </div>
            <div className="flex items-center gap-3">
              <div className="w-16 h-16 relative">
                <div className="w-full h-full rounded-full bg-muted"></div>
                <div 
                  className="absolute top-0 left-0 w-full h-full rounded-full bg-gradient-to-r from-success to-warning"
                  style={{
                    background: `conic-gradient(
                      ${overallRiskScore <= 30 ? '#10b981' : overallRiskScore <= 70 ? '#f59e0b' : '#ef4444'} ${overallRiskScore}%, 
                      #e5e7eb ${overallRiskScore}%
                    )`
                  }}
                ></div>
                <div className="absolute top-2 left-2 w-12 h-12 bg-background rounded-full flex items-center justify-center">
                  <Shield className="h-6 w-6 text-primary" />
                </div>
              </div>
              <Button variant="outline" size="sm">
                <RefreshCw className="mr-2 h-4 w-4" />
                Refresh
              </Button>
            </div>
          </div>

          {/* Risk Categories Overview */}
          <div className="grid grid-cols-2 md:grid-cols-5 gap-4 mb-6">
            {['Financial', 'Market', 'Operational', 'Technology', 'Legal'].map((category) => {
              const categoryRisks = riskFactors.filter(r => r.category === category);
              const avgRisk = categoryRisks.reduce((acc, r) => acc + r.probability, 0) / categoryRisks.length;
              
              return (
                <div key={category} className="text-center p-3 bg-muted/30 rounded-lg">
                  <p className="text-sm font-medium mb-1">{category}</p>
                  <p className={`text-lg font-bold ${getRiskScoreColor(avgRisk)}`}>
                    {avgRisk.toFixed(0)}%
                  </p>
                </div>
              );
            })}
          </div>
        </CardContent>
      </Card>

      {/* Detailed Risk Factors */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <AlertTriangle className="h-5 w-5 text-warning" />
            Risk Factor Analysis
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            {riskFactors.map((factor, index) => (
              <div key={index} className="border rounded-lg p-4 space-y-3">
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-3">
                    <Badge variant="outline" className="text-xs">
                      {factor.category}
                    </Badge>
                    <h4 className="font-semibold">{factor.risk}</h4>
                  </div>
                  <div className="flex items-center gap-2">
                    <Badge className={getSeverityColor(factor.severity)}>
                      {factor.severity.toUpperCase()}
                    </Badge>
                    <span className="text-sm font-medium">
                      {factor.probability}%
                    </span>
                  </div>
                </div>

                <div className="space-y-2">
                  <div>
                    <p className="text-sm font-medium text-muted-foreground">Impact:</p>
                    <p className="text-sm">{factor.impact}</p>
                  </div>
                  <div>
                    <p className="text-sm font-medium text-muted-foreground">Mitigation:</p>
                    <p className="text-sm text-success">{factor.mitigation}</p>
                  </div>
                </div>

                <Progress value={factor.probability} className="h-2" />
              </div>
            ))}
          </div>
        </CardContent>
      </Card>

      {/* AI Recommendations */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Target className="h-5 w-5 text-primary" />
            AI Recommendations
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-3">
            <div className="flex items-start gap-3 p-3 bg-primary/5 rounded-lg">
              <TrendingUp className="h-5 w-5 text-primary mt-0.5" />
              <div>
                <p className="font-medium">Priority Action</p>
                <p className="text-sm text-muted-foreground">
                  Address key person dependency by implementing structured knowledge transfer and expanding the management team.
                </p>
              </div>
            </div>
            
            <div className="flex items-start gap-3 p-3 bg-warning/5 rounded-lg">
              <Users className="h-5 w-5 text-warning mt-0.5" />
              <div>
                <p className="font-medium">Customer Diversification</p>
                <p className="text-sm text-muted-foreground">
                  Develop customer acquisition strategy to reduce concentration risk and increase revenue stability.
                </p>
              </div>
            </div>
            
            <div className="flex items-start gap-3 p-3 bg-success/5 rounded-lg">
              <Shield className="h-5 w-5 text-success mt-0.5" />
              <div>
                <p className="font-medium">Competitive Positioning</p>
                <p className="text-sm text-muted-foreground">
                  Strengthen IP portfolio and develop proprietary technology to create sustainable competitive advantages.
                </p>
              </div>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};