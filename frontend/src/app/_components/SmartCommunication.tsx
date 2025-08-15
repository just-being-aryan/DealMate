import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Textarea } from "@/components/ui/textarea";
import { Input } from "@/components/ui/input";
import { useToast } from "../../hooks/use-toast";
import { 
  MessageSquare, 
  Send, 
  Clock, 
  User, 
  Bot,
  Sparkles,
  Calendar,
  Phone,
  Video,
  Mail
} from "lucide-react";

interface Message {
  id: string;
  sender: 'user' | 'counterpart' | 'ai';
  content: string;
  timestamp: Date;
  type: 'message' | 'suggestion' | 'reminder';
}

interface AITemplate {
  id: string;
  name: string;
  description: string;
  content: string;
  category: 'negotiation' | 'follow_up' | 'due_diligence' | 'closing';
}

export const SmartCommunication = () => {
  const [messages, setMessages] = useState<Message[]>([
    {
      id: '1',
      sender: 'counterpart',
      content: "Thanks for the financial documents. We're reviewing them now. Can we schedule a call to discuss the customer concentration concerns?",
      timestamp: new Date(Date.now() - 2 * 60 * 60 * 1000),
      type: 'message'
    },
    {
      id: '2',
      sender: 'ai',
      content: "AI Suggestion: Consider addressing the customer concentration by highlighting your customer retention strategy and pipeline diversification plans.",
      timestamp: new Date(Date.now() - 1 * 60 * 60 * 1000),
      type: 'suggestion'
    }
  ]);
  
  const [newMessage, setNewMessage] = useState('');
  const [showTemplates, setShowTemplates] = useState(false);
  const { toast } = useToast();

  const aiTemplates: AITemplate[] = [
    {
      id: '1',
      name: 'Customer Concentration Response',
      description: 'Address concerns about customer dependency',
      content: "I understand your concern about customer concentration. Let me provide additional context:\n\n• Customer A represents 15% of revenue but has a 5-year contract with auto-renewal\n• We've added 8 new customers in the last 6 months\n• Our pipeline shows 40% potential growth from new customer segments\n\nWould you like to see our customer acquisition strategy and pipeline details?",
      category: 'negotiation'
    },
    {
      id: '2',
      name: 'Due Diligence Follow-up',
      description: 'Professional follow-up on pending items',
      content: "Hi [Name],\n\nI wanted to follow up on the due diligence items we discussed. I've attached:\n\n• Updated financial projections (Q1-Q4)\n• Customer reference contact list\n• Technology infrastructure audit\n\nPlease let me know if you need any additional information. I'm available for a call this week to discuss any questions.",
      category: 'follow_up'
    },
    {
      id: '3',
      name: 'Closing Momentum',
      description: 'Keep deal momentum moving forward',
      content: "I'm excited about the progress we're making together. Based on our discussions, I believe we're aligned on the key terms:\n\n• Valuation: $2.5M as discussed\n• Timeline: 45-day close\n• Transition support: 6 months\n\nShall we schedule a call to finalize the Letter of Intent? I'm available [Day/Time] or [Day/Time].",
      category: 'closing'
    }
  ];

  const handleSendMessage = () => {
    if (!newMessage.trim()) return;

    const message: Message = {
      id: Date.now().toString(),
      sender: 'user',
      content: newMessage,
      timestamp: new Date(),
      type: 'message'
    };

    setMessages(prev => [...prev, message]);
    setNewMessage('');


    setTimeout(() => {
      const aiSuggestion: Message = {
        id: (Date.now() + 1).toString(),
        sender: 'ai',
        content: "AI Analysis: Your message shows good transparency. Consider mentioning specific timeline commitments to build trust.",
        timestamp: new Date(),
        type: 'suggestion'
      };
      setMessages(prev => [...prev, aiSuggestion]);
    }, 2000);

    toast({
      title: "Message sent",
      description: "Your message has been sent successfully",
    });
  };

  const useTemplate = (template: AITemplate) => {
    setNewMessage(template.content);
    setShowTemplates(false);
    toast({
      title: "Template applied",
      description: `Using "${template.name}" template`,
    });
  };

  const getSenderIcon = (sender: string) => {
    switch (sender) {
      case 'user': return <User className="h-4 w-4" />;
      case 'counterpart': return <MessageSquare className="h-4 w-4" />;
      case 'ai': return <Bot className="h-4 w-4 text-primary" />;
      default: return <MessageSquare className="h-4 w-4" />;
    }
  };

  const getSenderName = (sender: string) => {
    switch (sender) {
      case 'user': return 'You';
      case 'counterpart': return 'TechVentures Capital';
      case 'ai': return 'AI Assistant';
      default: return 'Unknown';
    }
  };

  return (
    <div className="space-y-6">
 
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <MessageSquare className="h-5 w-5 text-primary" />
            Smart Communication Hub
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
            <Button variant="outline" className="flex items-center gap-2">
              <Calendar className="h-4 w-4" />
              Schedule Call
            </Button>
            <Button variant="outline" className="flex items-center gap-2">
              <Video className="h-4 w-4" />
              Video Meeting
            </Button>
            <Button variant="outline" className="flex items-center gap-2">
              <Phone className="h-4 w-4" />
              Phone Call
            </Button>
            <Button variant="outline" className="flex items-center gap-2">
              <Mail className="h-4 w-4" />
              Send Email
            </Button>
          </div>
        </CardContent>
      </Card>


      <Card>
        <CardHeader>
          <div className="flex items-center justify-between">
            <CardTitle>Deal Discussion</CardTitle>
            <Badge variant="outline" className="flex items-center gap-1">
              <Clock className="h-3 w-3" />
              Active
            </Badge>
          </div>
        </CardHeader>
        <CardContent>
          <div className="space-y-4 max-h-96 overflow-y-auto mb-4">
            {messages.map((message) => (
              <div 
                key={message.id}
                className={`flex items-start gap-3 ${
                  message.sender === 'user' ? 'flex-row-reverse' : ''
                } ${
                  message.type === 'suggestion' ? 'bg-primary/5 p-3 rounded-lg' : ''
                }`}
              >
                <div className={`w-8 h-8 rounded-full flex items-center justify-center shrink-0 ${
                  message.sender === 'user' ? 'bg-primary text-white' :
                  message.sender === 'ai' ? 'bg-primary/10' : 'bg-muted'
                }`}>
                  {getSenderIcon(message.sender)}
                </div>
                
                <div className={`flex-1 ${message.sender === 'user' ? 'text-right' : ''}`}>
                  <div className="flex items-center gap-2 mb-1">
                    <span className="text-sm font-medium">
                      {getSenderName(message.sender)}
                    </span>
                    <span className="text-xs text-muted-foreground">
                      {message.timestamp.toLocaleTimeString([], { 
                        hour: '2-digit', 
                        minute: '2-digit' 
                      })}
                    </span>
                    {message.sender === 'ai' && (
                      <Sparkles className="h-3 w-3 text-primary" />
                    )}
                  </div>
                  <div className={`text-sm ${
                    message.sender === 'user' ? 'bg-primary text-white' :
                    message.sender === 'ai' ? 'bg-primary/10' : 'bg-muted'
                  } rounded-lg p-3 inline-block max-w-xs`}>
                    {message.content}
                  </div>
                </div>
              </div>
            ))}
          </div>

          <div className="space-y-3">
            <div className="flex gap-2">
              <Textarea
                value={newMessage}
                onChange={(e) => setNewMessage(e.target.value)}
                placeholder="Type your message..."
                className="flex-1"
                rows={3}
              />
            </div>
            
            <div className="flex items-center justify-between">
              <div className="flex gap-2">
                <Button 
                  variant="outline" 
                  size="sm"
                  onClick={() => setShowTemplates(!showTemplates)}
                >
                  <Sparkles className="mr-2 h-4 w-4" />
                  AI Templates
                </Button>
              </div>
              
              <Button onClick={handleSendMessage} disabled={!newMessage.trim()}>
                <Send className="mr-2 h-4 w-4" />
                Send
              </Button>
            </div>
          </div>


          {showTemplates && (
            <div className="mt-4 p-4 border rounded-lg bg-muted/30">
              <h4 className="font-semibold mb-3 flex items-center gap-2">
                <Sparkles className="h-4 w-4 text-primary" />
                AI Message Templates
              </h4>
              <div className="grid gap-3">
                {aiTemplates.map((template) => (
                  <div 
                    key={template.id}
                    className="p-3 border rounded-lg bg-background cursor-pointer hover:bg-primary/5 transition-colors"
                    onClick={() => useTemplate(template)}
                  >
                    <div className="flex items-center justify-between mb-1">
                      <h5 className="font-medium text-sm">{template.name}</h5>
                      <Badge variant="outline" className="text-xs">
                        {template.category.replace('_', ' ')}
                      </Badge>
                    </div>
                    <p className="text-xs text-muted-foreground">
                      {template.description}
                    </p>
                  </div>
                ))}
              </div>
            </div>
          )}
        </CardContent>
      </Card>
    </div>
  );
};