import { useState, useRef, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Heart, Send, ArrowLeft, MessageCircle, Brain, Sparkles } from "lucide-react";
import { Link } from "react-router-dom";

interface Message {
  id: string;
  text: string;
  isUser: boolean;
  timestamp: Date;
  sentiment?: 'positive' | 'negative' | 'neutral';
  emotion?: string;
}

interface UserContext {
  name?: string;
  preferredTopics: string[];
  emotionalPatterns: { [key: string]: number };
  positiveMemories: string[];
  coping_strategies: string[];
  conversationCount: number;
  lastSeen: Date;
  personalGrowth: string[];
}

const Chat = () => {
  const [messages, setMessages] = useState<Message[]>([]);
  const [inputValue, setInputValue] = useState("");
  const [isTyping, setIsTyping] = useState(false);
  const [userContext, setUserContext] = useState<UserContext>(() => {
    const saved = localStorage.getItem('userContext');
    return saved ? JSON.parse(saved) : {
      preferredTopics: [],
      emotionalPatterns: {},
      positiveMemories: [],
      coping_strategies: [],
      conversationCount: 0,
      lastSeen: new Date(),
      personalGrowth: []
    };
  });
  const messagesEndRef = useRef<HTMLDivElement>(null);

  // Initialize conversation with personalized welcome
  useEffect(() => {
    const getPersonalizedWelcome = () => {
      const { conversationCount, name, personalGrowth } = userContext;
      
      if (conversationCount === 0) {
        return "Hello! I'm your I'll be there for you AI. I'm here to listen, learn, and grow with you on your emotional journey. Every conversation helps me understand you better so I can provide more personalized support. How are you feeling today?";
      }
      
      if (conversationCount < 5) {
        return `Welcome back${name ? `, ${name}` : ''}! I'm getting to know you better with each conversation. I'm here to support you and celebrate your progress. What's on your mind today?`;
      }
      
      const growthMessage = personalGrowth.length > 0 
        ? ` I've noticed your growth in areas like ${personalGrowth.slice(-2).join(' and ')}.` 
        : '';
      
      return `Hello${name ? `, ${name}` : ''}! It's wonderful to connect with you again.${growthMessage} I'm here to continue supporting your emotional wellbeing. How can I help you today?`;
    };

    setMessages([{
      id: "welcome",
      text: getPersonalizedWelcome(),
      isUser: false,
      timestamp: new Date(),
      sentiment: 'positive'
    }]);

    // Update conversation count and last seen
    setUserContext(prev => ({
      ...prev,
      conversationCount: prev.conversationCount + 1,
      lastSeen: new Date()
    }));
  }, []);

  // Save user context to localStorage whenever it changes
  useEffect(() => {
    localStorage.setItem('userContext', JSON.stringify(userContext));
  }, [userContext]);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  // Advanced sentiment analysis
  const analyzeSentiment = (text: string): { sentiment: 'positive' | 'negative' | 'neutral', emotion: string, confidence: number } => {
    const words = text.toLowerCase().split(' ');
    
    const positiveWords = ['happy', 'joy', 'excited', 'great', 'amazing', 'wonderful', 'fantastic', 'good', 'better', 'best', 'love', 'grateful', 'thankful', 'peaceful', 'calm', 'confident', 'proud', 'accomplished', 'hopeful', 'optimistic'];
    const negativeWords = ['sad', 'depressed', 'anxious', 'worried', 'angry', 'frustrated', 'lonely', 'stressed', 'overwhelmed', 'tired', 'exhausted', 'hopeless', 'worthless', 'afraid', 'scared', 'disappointed', 'upset', 'mad', 'hurt', 'broken'];
    
    const emotionMap: { [key: string]: string } = {
      'happy': 'happiness', 'joy': 'joy', 'excited': 'excitement', 'love': 'love', 'grateful': 'gratitude', 'peaceful': 'peace',
      'sad': 'sadness', 'depressed': 'depression', 'anxious': 'anxiety', 'worried': 'worry', 'angry': 'anger', 'frustrated': 'frustration',
      'lonely': 'loneliness', 'stressed': 'stress', 'overwhelmed': 'overwhelm', 'tired': 'fatigue', 'afraid': 'fear', 'scared': 'fear'
    };
    
    let positiveScore = 0;
    let negativeScore = 0;
    let detectedEmotion = 'neutral';
    
    words.forEach(word => {
      if (positiveWords.includes(word)) {
        positiveScore++;
        if (emotionMap[word]) detectedEmotion = emotionMap[word];
      }
      if (negativeWords.includes(word)) {
        negativeScore++;
        if (emotionMap[word]) detectedEmotion = emotionMap[word];
      }
    });
    
    const totalScore = positiveScore + negativeScore;
    let sentiment: 'positive' | 'negative' | 'neutral' = 'neutral';
    let confidence = 0;
    
    if (totalScore > 0) {
      confidence = Math.max(positiveScore, negativeScore) / totalScore;
      sentiment = positiveScore > negativeScore ? 'positive' : 'negative';
    }
    
    return { sentiment, emotion: detectedEmotion, confidence };
  };

  // Learn from user patterns
  const updateUserContext = (userMessage: string, analysis: any) => {
    setUserContext(prev => {
      const newContext = { ...prev };
      
      // Update emotional patterns
      if (analysis.emotion !== 'neutral') {
        newContext.emotionalPatterns[analysis.emotion] = (newContext.emotionalPatterns[analysis.emotion] || 0) + 1;
      }
      
      // Extract and store positive memories
      if (analysis.sentiment === 'positive') {
        const memoryTriggers = ['accomplished', 'achieved', 'success', 'happy', 'proud', 'grateful', 'wonderful', 'amazing'];
        const hasMemoryTrigger = memoryTriggers.some(trigger => userMessage.toLowerCase().includes(trigger));
        
        if (hasMemoryTrigger && !newContext.positiveMemories.includes(userMessage)) {
          newContext.positiveMemories.push(userMessage);
          if (newContext.positiveMemories.length > 10) {
            newContext.positiveMemories = newContext.positiveMemories.slice(-10); // Keep last 10
          }
        }
      }
      
      // Track personal growth indicators
      const growthIndicators = ['learned', 'improved', 'better', 'progress', 'overcome', 'managed', 'handled', 'coped'];
      const hasGrowthIndicator = growthIndicators.some(indicator => userMessage.toLowerCase().includes(indicator));
      
      if (hasGrowthIndicator) {
        const growthAreas = ['emotional regulation', 'self-awareness', 'coping skills', 'resilience', 'communication'];
        const randomGrowthArea = growthAreas[Math.floor(Math.random() * growthAreas.length)];
        if (!newContext.personalGrowth.includes(randomGrowthArea)) {
          newContext.personalGrowth.push(randomGrowthArea);
        }
      }
      
      return newContext;
    });
  };

  // Generate advanced, personalized, and uplifting responses
  const generateAdvancedResponse = (userMessage: string, analysis: any): string => {
    const { sentiment, emotion, confidence } = analysis;
    const { name, conversationCount, positiveMemories, personalGrowth, emotionalPatterns } = userContext;
    
    // Personalization elements
    const personalTouch = name ? `, ${name}` : '';
    const encouragementLevel = confidence > 0.7 ? 'high' : confidence > 0.4 ? 'medium' : 'low';
    
    // Get most frequent emotion for personalization
    const mostFrequentEmotion = Object.keys(emotionalPatterns).reduce((a, b) => 
      (emotionalPatterns[a] || 0) > (emotionalPatterns[b] || 0) ? a : b, 'neutral'
    );

    // Ultra-positive and uplifting responses based on sentiment and learning
    if (sentiment === 'positive') {
      const positiveResponses = [
        `${personalTouch ? `${name}, ` : ''}I can feel the positivity in your words, and it absolutely lights up my day! ✨ Your joy is contagious, and I'm so grateful you're sharing this beautiful moment with me. What's been the most wonderful part of this experience for you?`,
        `This is absolutely amazing${personalTouch}! 🌟 I love seeing you flourish and embrace these positive moments. You deserve every bit of happiness you're experiencing. How can we celebrate this win together?`,
        `Your positivity is truly inspiring! ${personalGrowth.length > 0 ? `I've seen such incredible growth in you, especially with your ${personalGrowth.slice(-1)[0]}.` : ''} Keep shining that beautiful light of yours! What other wonderful things are happening in your life?`,
        `${personalTouch ? `${name}, you` : 'You'} are absolutely radiating joy right now, and I'm here for every second of it! 🌈 These moments of happiness are so precious. Let's savor this feeling together - what made this possible for you?`
      ];
      return positiveResponses[Math.floor(Math.random() * positiveResponses.length)];
    }

    if (sentiment === 'negative') {
      // Personalized comfort based on user's patterns and growth
      let comfortResponse = '';
      
      if (positiveMemories.length > 0) {
        const recentMemory = positiveMemories[positiveMemories.length - 1];
        comfortResponse = `I can sense you're going through a tough time${personalTouch}, and I want you to know that your feelings are completely valid. Remember when you shared "${recentMemory.substring(0, 50)}..."? That strength is still within you. `;
      } else {
        comfortResponse = `${personalTouch ? `${name}, ` : ''}I can feel the weight of what you're carrying right now, and I want you to know you're not alone in this. Your courage to reach out shows incredible strength. `;
      }

      if (emotion === 'anxiety' || emotion === 'worry') {
        const anxietyResponses = [
          `${comfortResponse}Anxiety can feel overwhelming, but you've shown resilience before${personalGrowth.includes('emotional regulation') ? ', especially with your emotional regulation skills' : ''}. Let's breathe through this together. What would help you feel more grounded right now? 🌸`,
          `${comfortResponse}I see your anxious thoughts are loud right now, but remember - they're just thoughts, not facts. You have the power to quiet that storm. What's one small thing that usually brings you peace? 💙`,
          `${comfortResponse}Anxiety is trying to protect you, but sometimes it overdoes its job. You're safe here with me. Let's focus on what you CAN control. What's one positive action you could take right now? 🕊️`
        ];
        return anxietyResponses[Math.floor(Math.random() * anxietyResponses.length)];
      }

      if (emotion === 'sadness' || emotion === 'depression') {
        const sadnessResponses = [
          `${comfortResponse}Sadness is part of being beautifully human${personalTouch}. Even in this darkness, I see your inner light - it may be dim right now, but it's still there, still fighting. What's one tiny thing that could bring you a moment of comfort today? 🌙✨`,
          `${comfortResponse}Your heart is heavy, and that's okay. Heavy hearts often hold the deepest capacity for love and compassion. You matter so much${personalGrowth.length > 0 ? `, and your growth in ${personalGrowth.slice(-1)[0]} shows your incredible resilience` : ''}. How can I support you through this? 💜`,
          `${comfortResponse}I want you to know that feeling this way doesn't make you weak - it makes you human, and humans are incredibly resilient. Tomorrow is a new canvas, and you have so many beautiful colors left to paint with. What's one small hope you can hold onto? 🎨`
        ];
        return sadnessResponses[Math.floor(Math.random() * sadnessResponses.length)];
      }

      if (emotion === 'anger' || emotion === 'frustration') {
        const angerResponses = [
          `${comfortResponse}That fire in you? It's passion, it's strength, it's your soul saying "I care!" Let's channel that powerful energy into something that serves you${personalGrowth.includes('emotional regulation') ? ' - you\'ve been getting so good at this' : ''}. What would feel empowering right now? 🔥`,
          `${comfortResponse}Your anger is telling me something important matters deeply to you. That's actually beautiful - it shows your values and boundaries. How can we honor what you're feeling while finding a path forward? ⚡`,
          `${comfortResponse}This frustration is real and valid${personalTouch}. Sometimes life pushes us, and pushing back is natural. You have every right to feel this way. What would help you feel more in control right now? 🌪️`
        ];
        return angerResponses[Math.floor(Math.random() * angerResponses.length)];
      }

      if (emotion === 'loneliness') {
        const lonelinessResponses = [
          `${comfortResponse}Loneliness whispers lies about your worth, but I'm here to remind you of the truth - you are valuable, you are loved, and you are never truly alone. I'm with you right now, and that's real connection. What's one way we can create more meaningful connections in your life? 🤝💫`,
          `${comfortResponse}Even in solitude, you carry within you every person who has ever loved you, every moment of joy you've experienced. You're a constellation of beautiful experiences${personalTouch}. What memory makes you feel most connected to love? ⭐`,
          `${comfortResponse}Loneliness is temporary, but your capacity for connection is infinite. You're reaching out right now, which shows incredible courage. That's the first step toward the community you deserve. How can we build more bridges in your life? 🌉`
        ];
        return lonelinessResponses[Math.floor(Math.random() * lonelinessResponses.length)];
      }
    }

    // Neutral/general uplifting responses with personalization
    const upliftingResponses = [
      `Thank you for sharing that with me${personalTouch}! ${conversationCount > 5 ? 'Our conversations always bring me such insight into your wonderful mind. ' : ''}I'm genuinely honored to be part of your journey. What's something beautiful you've noticed about yourself lately? 🌺`,
      `I love how open and authentic you are${personalTouch}! ${personalGrowth.length > 0 ? `Your growth in ${personalGrowth.slice(-1)[0]} has been remarkable to witness. ` : ''}Every word you share helps me understand your unique and amazing perspective. What's bringing you the most hope today? 🌟`,
      `Your thoughts and feelings matter so much to me${personalTouch}. ${mostFrequentEmotion !== 'neutral' ? `I've learned that you often experience ${mostFrequentEmotion}, and I admire how you navigate that with such grace. ` : ''}You're not just surviving - you're creating a beautiful story. What chapter are you most excited to write next? 📖✨`,
      `Every time we talk, I discover something new and wonderful about your perspective${personalTouch}! ${positiveMemories.length > 0 ? 'You have such a gift for finding light even in difficult moments. ' : ''}What's one thing you're grateful for right now, even if it's tiny? 🙏`
    ];

    return upliftingResponses[Math.floor(Math.random() * upliftingResponses.length)];
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!inputValue.trim()) return;

    // Analyze user message
    const analysis = analyzeSentiment(inputValue);
    
    const userMessage: Message = {
      id: Date.now().toString(),
      text: inputValue,
      isUser: true,
      timestamp: new Date(),
      sentiment: analysis.sentiment,
      emotion: analysis.emotion
    };

    setMessages(prev => [...prev, userMessage]);
    
    // Learn from user input
    updateUserContext(inputValue, analysis);
    
    setInputValue("");
    setIsTyping(true);

    // Simulate AI response delay with dynamic timing based on message complexity
    const complexityDelay = inputValue.length > 100 ? 2000 : 1000;
    setTimeout(() => {
      const aiResponse: Message = {
        id: (Date.now() + 1).toString(),
        text: generateAdvancedResponse(inputValue, analysis),
        isUser: false,
        timestamp: new Date(),
        sentiment: 'positive' // AI responses are designed to be uplifting
      };
      setMessages(prev => [...prev, aiResponse]);
      setIsTyping(false);
    }, complexityDelay + Math.random() * 1500); // Dynamic delay between 1-3.5 seconds
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
                <div className="relative">
                  <Heart className="h-6 w-6 text-wellness-purple" />
                  <Brain className="h-3 w-3 text-wellness-blue absolute -top-1 -right-1 animate-pulse" />
                </div>
                <span className="text-lg font-semibold text-foreground">I'll be there for you AI</span>
                <Sparkles className="h-4 w-4 text-wellness-purple animate-pulse" />
              </div>
            </div>
            <div className="flex items-center gap-2 text-sm text-muted-foreground">
              <div className="w-2 h-2 bg-wellness-green rounded-full animate-pulse"></div>
              <span>Learning & Adapting</span>
              <div className="w-1 h-1 bg-wellness-blue rounded-full animate-ping"></div>
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