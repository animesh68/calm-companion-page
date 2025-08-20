import { useState, useRef, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Heart, Send, ArrowLeft, MessageCircle } from "lucide-react";
import { Link } from "react-router-dom";

interface Message {
  id: string;
  text: string;
  isUser: boolean;
  timestamp: Date;
}

const Chat = () => {
  const [messages, setMessages] = useState<Message[]>([
    {
      id: "welcome",
      text: "Hello! I'm your CalmCompanion AI. I'm here to listen and provide emotional support. How are you feeling today?",
      isUser: false,
      timestamp: new Date(),
    },
  ]);
  const [inputValue, setInputValue] = useState("");
  const [isTyping, setIsTyping] = useState(false);
  const messagesEndRef = useRef<HTMLDivElement>(null);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  const generateResponse = (userMessage: string): string => {
    const lowerMessage = userMessage.toLowerCase();
    
    // Mental health supportive responses
    if (lowerMessage.includes("sad") || lowerMessage.includes("depressed") || lowerMessage.includes("down")) {
      const responses = [
        "I hear that you're feeling sad right now. It's completely okay to feel this way - sadness is a natural human emotion. Can you tell me more about what's been weighing on your mind?",
        "Thank you for sharing that you're feeling down. Your feelings are valid, and I'm here to listen. Sometimes it helps to talk about what's contributing to these feelings. What's been on your heart lately?",
        "I'm sorry you're going through a difficult time. Depression and sadness can feel overwhelming, but you're not alone. Would you like to share what's been troubling you, or would you prefer we explore some gentle coping strategies together?"
      ];
      return responses[Math.floor(Math.random() * responses.length)];
    }
    
    if (lowerMessage.includes("anxious") || lowerMessage.includes("anxiety") || lowerMessage.includes("worried") || lowerMessage.includes("nervous")) {
      const responses = [
        "Anxiety can feel really overwhelming. I want you to know that what you're experiencing is valid. Let's take this one step at a time. Can you tell me what's been making you feel anxious?",
        "I understand that you're feeling worried. Anxiety affects many people, and it's nothing to be ashamed of. Would you like to try a quick breathing exercise together, or would you prefer to talk about what's on your mind?",
        "Thank you for trusting me with your feelings about anxiety. It takes courage to acknowledge these emotions. What situations or thoughts tend to trigger your anxious feelings?"
      ];
      return responses[Math.floor(Math.random() * responses.length)];
    }
    
    if (lowerMessage.includes("stress") || lowerMessage.includes("overwhelm") || lowerMessage.includes("pressure")) {
      const responses = [
        "Stress can make everything feel more difficult. You're taking a positive step by reaching out. What aspects of your life are feeling most overwhelming right now?",
        "I can hear that you're under a lot of pressure. Stress affects us all differently, and it's important to acknowledge when we're struggling. What's been your biggest source of stress lately?",
        "Feeling overwhelmed is a signal that you're dealing with a lot right now. Let's break this down together. What are the main things that are contributing to your stress?"
      ];
      return responses[Math.floor(Math.random() * responses.length)];
    }
    
    if (lowerMessage.includes("angry") || lowerMessage.includes("frustrated") || lowerMessage.includes("mad")) {
      const responses = [
        "Anger is a valid emotion, and it often signals that something important to you has been affected. I'm here to listen without judgment. What's been frustrating you?",
        "It sounds like you're dealing with some difficult feelings of anger. Thank you for sharing this with me. Can you help me understand what's been making you feel this way?",
        "Frustration can be really challenging to deal with. I appreciate you being open about how you're feeling. What situation or experience has been making you angry?"
      ];
      return responses[Math.floor(Math.random() * responses.length)];
    }
    
    if (lowerMessage.includes("lonely") || lowerMessage.includes("alone") || lowerMessage.includes("isolated")) {
      const responses = [
        "Loneliness can be one of the most difficult feelings to experience. I want you to know that reaching out here shows strength, and you're not truly alone. Can you tell me more about what's been making you feel isolated?",
        "Thank you for sharing about feeling lonely. These feelings are more common than you might think, and they're completely valid. What aspects of loneliness have been hardest for you?",
        "I hear that you're feeling alone right now. That must be really difficult. Even though we're connecting virtually, I want you to know that your feelings matter and you deserve support. What's been contributing to these feelings of isolation?"
      ];
      return responses[Math.floor(Math.random() * responses.length)];
    }
    
    if (lowerMessage.includes("good") || lowerMessage.includes("fine") || lowerMessage.includes("okay") || lowerMessage.includes("well")) {
      const responses = [
        "I'm glad to hear you're doing well! It's wonderful when we have moments of feeling good. Is there anything specific that's been contributing to your positive mood?",
        "That's great to hear! Even when we're feeling okay, it's still valuable to check in with ourselves. What's been going well for you lately?",
        "I'm happy you're feeling good today. Those positive moments are important to acknowledge and celebrate. What's been bringing you joy or contentment?"
      ];
      return responses[Math.floor(Math.random() * responses.length)];
    }
    
    if (lowerMessage.includes("help") || lowerMessage.includes("support")) {
      return "I'm here to provide emotional support and be a listening ear. While I can offer comfort and coping strategies, please remember that for serious mental health concerns, it's important to reach out to a mental health professional. How can I best support you right now?";
    }
    
    if (lowerMessage.includes("thank") || lowerMessage.includes("grateful")) {
      return "You're so welcome. It means a lot to me that I can be here for you. Taking care of your mental health takes courage, and I'm proud of you for reaching out. Is there anything else you'd like to talk about?";
    }
    
    // Default empathetic responses
    const defaultResponses = [
      "Thank you for sharing that with me. I'm here to listen and support you. Can you tell me more about how you're feeling?",
      "I appreciate you opening up. Your feelings and experiences matter. What would be most helpful for you to talk about right now?",
      "I'm here to support you through whatever you're going through. Would you like to explore these feelings together, or is there something specific on your mind?",
      "Thank you for trusting me with your thoughts. I'm here to listen without judgment. What's been on your heart lately?",
      "I hear you, and I want you to know that your feelings are completely valid. What would feel most supportive for you right now?"
    ];
    
    return defaultResponses[Math.floor(Math.random() * defaultResponses.length)];
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!inputValue.trim()) return;

    const userMessage: Message = {
      id: Date.now().toString(),
      text: inputValue,
      isUser: true,
      timestamp: new Date(),
    };

    setMessages(prev => [...prev, userMessage]);
    setInputValue("");
    setIsTyping(true);

    // Simulate AI response delay
    setTimeout(() => {
      const aiResponse: Message = {
        id: (Date.now() + 1).toString(),
        text: generateResponse(inputValue),
        isUser: false,
        timestamp: new Date(),
      };
      setMessages(prev => [...prev, aiResponse]);
      setIsTyping(false);
    }, 1000 + Math.random() * 2000); // Random delay between 1-3 seconds
  };

  return (
    <div className="min-h-screen bg-gradient-subtle">
      {/* Header */}
      <header className="border-b bg-card/50 backdrop-blur-sm sticky top-0 z-10">
        <div className="container mx-auto px-6 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-4">
              <Link to="/">
                <Button variant="ghost" size="sm">
                  <ArrowLeft className="h-4 w-4 mr-2" />
                  Back
                </Button>
              </Link>
              <div className="flex items-center gap-2">
                <Heart className="h-6 w-6 text-wellness-purple" />
                <span className="text-lg font-semibold text-foreground">CalmCompanion AI</span>
              </div>
            </div>
            <div className="flex items-center gap-2 text-sm text-muted-foreground">
              <div className="w-2 h-2 bg-wellness-green rounded-full animate-pulse"></div>
              Online & Ready to Help
            </div>
          </div>
        </div>
      </header>

      {/* Chat Container */}
      <div className="container mx-auto px-6 py-8 max-w-4xl">
        <Card className="h-[calc(100vh-12rem)] flex flex-col">
          <CardHeader className="border-b">
            <CardTitle className="flex items-center gap-2">
              <MessageCircle className="h-5 w-5 text-wellness-blue" />
              Your Safe Space to Talk
            </CardTitle>
            <p className="text-sm text-muted-foreground">
              This is a judgment-free zone. Share whatever is on your mind.
            </p>
          </CardHeader>
          
          <CardContent className="flex-1 flex flex-col p-0">
            {/* Messages Area */}
            <div className="flex-1 overflow-y-auto p-6 space-y-4">
              {messages.map((message) => (
                <div
                  key={message.id}
                  className={`flex ${message.isUser ? "justify-end" : "justify-start"}`}
                >
                  <div
                    className={`max-w-[80%] p-4 rounded-lg ${
                      message.isUser
                        ? "bg-primary text-primary-foreground"
                        : "bg-secondary text-secondary-foreground shadow-card"
                    }`}
                  >
                    <p className="text-sm leading-relaxed">{message.text}</p>
                    <p className="text-xs opacity-70 mt-2">
                      {message.timestamp.toLocaleTimeString([], {
                        hour: "2-digit",
                        minute: "2-digit",
                      })}
                    </p>
                  </div>
                </div>
              ))}
              
              {isTyping && (
                <div className="flex justify-start">
                  <div className="bg-secondary text-secondary-foreground p-4 rounded-lg shadow-card">
                    <div className="flex items-center gap-1">
                      <div className="w-2 h-2 bg-wellness-blue rounded-full animate-bounce"></div>
                      <div className="w-2 h-2 bg-wellness-blue rounded-full animate-bounce" style={{ animationDelay: "0.1s" }}></div>
                      <div className="w-2 h-2 bg-wellness-blue rounded-full animate-bounce" style={{ animationDelay: "0.2s" }}></div>
                    </div>
                  </div>
                </div>
              )}
              
              <div ref={messagesEndRef} />
            </div>

            {/* Input Area */}
            <div className="border-t p-6">
              <form onSubmit={handleSubmit} className="flex gap-3">
                <Input
                  value={inputValue}
                  onChange={(e) => setInputValue(e.target.value)}
                  placeholder="Share what's on your mind..."
                  className="flex-1"
                  disabled={isTyping}
                />
                <Button 
                  type="submit" 
                  variant="hero" 
                  size="icon"
                  disabled={!inputValue.trim() || isTyping}
                >
                  <Send className="h-4 w-4" />
                </Button>
              </form>
              <p className="text-xs text-muted-foreground mt-2">
                This AI provides emotional support but is not a replacement for professional therapy.
              </p>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default Chat;