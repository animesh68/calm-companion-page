import { useState, useRef, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Textarea } from "@/components/ui/textarea";
import { Heart, ArrowLeft, BookOpen, Send, Calendar, Clock } from "lucide-react";
import { Link } from "react-router-dom";

interface JournalEntry {
  id: string;
  date: Date;
  content: string;
  aiResponse?: string;
}

const Journal = () => {
  const [currentEntry, setCurrentEntry] = useState("");
  const [entries, setEntries] = useState<JournalEntry[]>([]);
  const [isGettingFeedback, setIsGettingFeedback] = useState(false);
  const [showAiFeedback, setShowAiFeedback] = useState<string | null>(null);
  const textareaRef = useRef<HTMLTextAreaElement>(null);

  const generateAiFeedback = (entryContent: string): string => {
    const lowerContent = entryContent.toLowerCase();
    
    // Analyze the emotional tone and content
    if (lowerContent.includes("good day") || lowerContent.includes("happy") || lowerContent.includes("great") || lowerContent.includes("wonderful")) {
      const responses = [
        "It's wonderful to read about your positive day! These moments of happiness are so important to cherish. What was the highlight that made you feel most joyful?",
        "Your joy really comes through in your writing! It's beautiful to see you experiencing such positive emotions. Keep nurturing these feelings - they're helping me understand what brings you happiness.",
        "Thank you for sharing such a bright entry! Days like these are precious. I'm learning that positive experiences like these really energize you - this helps me support you better in our conversations."
      ];
      return responses[Math.floor(Math.random() * responses.length)];
    }
    
    if (lowerContent.includes("difficult") || lowerContent.includes("hard") || lowerContent.includes("struggle") || lowerContent.includes("challenging")) {
      const responses = [
        "I can sense this was a challenging day for you. Thank you for being so honest in your writing - this vulnerability helps me understand your experiences better. What gave you strength to get through it?",
        "Your courage in sharing difficult moments is remarkable. These honest reflections are teaching me about your resilience and how you navigate tough times. You're stronger than you realize.",
        "I appreciate you trusting me with these challenging feelings. Understanding how you process difficult days helps me be a better companion for you. What would support look like for you right now?"
      ];
      return responses[Math.floor(Math.random() * responses.length)];
    }
    
    if (lowerContent.includes("work") || lowerContent.includes("job") || lowerContent.includes("meeting") || lowerContent.includes("colleague")) {
      const responses = [
        "I'm getting a sense of how your work life affects your overall wellbeing. These details about your professional experiences help me understand your daily stressors and motivations better.",
        "Your work experiences seem to play a significant role in your day. I'm learning how workplace dynamics impact your mood - this insight helps me offer more relevant support in our chats.",
        "Thank you for sharing about your work day. Understanding your professional challenges and victories helps me recognize patterns in what energizes or drains you."
      ];
      return responses[Math.floor(Math.random() * responses.length)];
    }
    
    if (lowerContent.includes("family") || lowerContent.includes("friend") || lowerContent.includes("relationship") || lowerContent.includes("partner")) {
      const responses = [
        "Relationships seem really important to you - I can see how your connections with others deeply influence your day. This helps me understand what matters most in your life.",
        "Your relationships clearly bring both joy and complexity to your life. Learning about these important connections helps me better understand your emotional landscape.",
        "The people in your life seem to be a significant source of meaning for you. These insights about your relationships help me appreciate what truly matters to you."
      ];
      return responses[Math.floor(Math.random() * responses.length)];
    }
    
    if (lowerContent.includes("tired") || lowerContent.includes("exhausted") || lowerContent.includes("sleep") || lowerContent.includes("rest")) {
      const responses = [
        "I notice you're mentioning feeling tired. Rest and energy levels seem to be important factors in your wellbeing. Understanding your energy patterns helps me recognize when you might need extra support.",
        "Your body seems to be telling you something important about rest. These observations about your energy help me learn when you're most receptive to different types of conversations and support.",
        "Thank you for noting your energy levels - this kind of self-awareness is so valuable. Learning about your rest patterns helps me understand your natural rhythms better."
      ];
      return responses[Math.floor(Math.random() * responses.length)];
    }
    
    // Default thoughtful responses
    const defaultResponses = [
      "Thank you for this thoughtful entry. Each reflection you share helps me understand your unique perspective and experiences better. Your openness is helping me become a more supportive companion.",
      "I appreciate the time you took to reflect on your day. These personal insights are invaluable - they're teaching me about your values, challenges, and what brings you meaning.",
      "Your writing reveals so much about who you are and what matters to you. This kind of honest reflection is helping me learn how to better support you in our conversations.",
      "Every entry teaches me something new about your inner world. Your willingness to share these personal moments is helping me understand how to be more helpful and empathetic in our interactions.",
      "I'm grateful you chose to share these thoughts with me. Understanding your daily experiences and emotions helps me recognize patterns and offer more personalized support."
    ];
    
    return defaultResponses[Math.floor(Math.random() * defaultResponses.length)];
  };

  const handleSaveEntry = async () => {
    if (!currentEntry.trim()) return;

    const newEntry: JournalEntry = {
      id: Date.now().toString(),
      date: new Date(),
      content: currentEntry,
    };

    setEntries(prev => [newEntry, ...prev]);
    
    // Generate AI feedback
    setIsGettingFeedback(true);
    setTimeout(() => {
      const feedback = generateAiFeedback(currentEntry);
      setShowAiFeedback(feedback);
      setIsGettingFeedback(false);
    }, 1500 + Math.random() * 1000);

    setCurrentEntry("");
    if (textareaRef.current) {
      textareaRef.current.style.height = 'auto';
    }
  };

  const formatDate = (date: Date) => {
    return date.toLocaleDateString('en-US', {
      weekday: 'long',
      year: 'numeric',
      month: 'long',
      day: 'numeric'
    });
  };

  const formatTime = (date: Date) => {
    return date.toLocaleTimeString('en-US', {
      hour: '2-digit',
      minute: '2-digit'
    });
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
                <span className="text-lg font-semibold text-foreground">My Journal</span>
              </div>
            </div>
            <div className="flex items-center gap-2 text-sm text-muted-foreground">
              <BookOpen className="h-4 w-4" />
              Personal Reflection Space
            </div>
          </div>
        </div>
      </header>

      <div className="container mx-auto px-6 py-8 max-w-5xl">
        <div className="grid lg:grid-cols-2 gap-8">
          {/* Writing Area */}
          <div className="space-y-6">
            {/* Notebook Header */}
            <Card className="bg-gradient-notebook border-notebook-lines shadow-notebook">
              <CardContent className="p-8">
                <div className="text-center mb-6">
                  <h1 className="font-handwriting text-4xl text-ink-black mb-2">
                    Dear Journal...
                  </h1>
                  <div className="flex items-center justify-center gap-4 text-ink-blue font-journal">
                    <div className="flex items-center gap-1">
                      <Calendar className="h-4 w-4" />
                      <span>{formatDate(new Date())}</span>
                    </div>
                    <div className="flex items-center gap-1">
                      <Clock className="h-4 w-4" />
                      <span>{formatTime(new Date())}</span>
                    </div>
                  </div>
                </div>

                {/* Lined Paper Effect */}
                <div className="relative">
                  <div className="absolute inset-0 pointer-events-none">
                    {Array.from({ length: 20 }, (_, i) => (
                      <div
                        key={i}
                        className="border-b border-notebook-lines opacity-50"
                        style={{ height: '1.5rem', marginBottom: '0.5rem' }}
                      />
                    ))}
                  </div>
                  
                  <Textarea
                    ref={textareaRef}
                    value={currentEntry}
                    onChange={(e) => setCurrentEntry(e.target.value)}
                    placeholder="How was your day? What's on your mind? Share your thoughts here..."
                    className="relative z-10 min-h-[400px] bg-transparent border-none resize-none focus:ring-0 font-journal text-ink-black text-lg leading-8 placeholder:text-ink-blue/60"
                    style={{ lineHeight: '2rem' }}
                  />
                </div>

                <div className="flex justify-between items-center mt-6 pt-4 border-t border-notebook-lines">
                  <p className="text-sm text-ink-blue font-journal">
                    {currentEntry.length} characters written
                  </p>
                  <Button
                    onClick={handleSaveEntry}
                    disabled={!currentEntry.trim()}
                    variant="hero"
                    className="font-journal"
                  >
                    <Send className="h-4 w-4 mr-2" />
                    Save Entry
                  </Button>
                </div>
              </CardContent>
            </Card>
          </div>

          {/* AI Companion Feedback */}
          <div className="space-y-6">
            <Card className="bg-gradient-card shadow-card">
              <CardContent className="p-6">
                <h2 className="font-handwriting text-2xl text-ink-black mb-4 text-center">
                  Your AI Companion's Thoughts
                </h2>
                
                {isGettingFeedback && (
                  <div className="text-center py-8">
                    <div className="inline-flex items-center gap-2 text-muted-foreground">
                      <div className="w-2 h-2 bg-wellness-blue rounded-full animate-bounce"></div>
                      <div className="w-2 h-2 bg-wellness-blue rounded-full animate-bounce" style={{ animationDelay: "0.1s" }}></div>
                      <div className="w-2 h-2 bg-wellness-blue rounded-full animate-bounce" style={{ animationDelay: "0.2s" }}></div>
                      <span className="ml-2 font-journal">Reading your thoughts...</span>
                    </div>
                  </div>
                )}
                
                {showAiFeedback && (
                  <div className="bg-notebook-paper/50 p-4 rounded-lg border border-notebook-lines">
                    <p className="font-journal text-ink-black leading-relaxed">
                      {showAiFeedback}
                    </p>
                    <div className="mt-4 pt-3 border-t border-notebook-lines">
                      <p className="text-xs text-ink-blue font-journal">
                        This feedback helps me understand you better for our future conversations.
                      </p>
                    </div>
                  </div>
                )}
                
                {!showAiFeedback && !isGettingFeedback && (
                  <div className="text-center py-8 text-muted-foreground">
                    <BookOpen className="h-12 w-12 mx-auto mb-3 opacity-50" />
                    <p className="font-journal">
                      Write an entry and I'll share my thoughts to help understand you better.
                    </p>
                  </div>
                )}
              </CardContent>
            </Card>

            {/* Previous Entries */}
            {entries.length > 0 && (
              <Card className="bg-notebook-vintage/30 shadow-card">
                <CardContent className="p-6">
                  <h3 className="font-handwriting text-xl text-ink-black mb-4">
                    Recent Reflections
                  </h3>
                  <div className="space-y-4 max-h-96 overflow-y-auto">
                    {entries.slice(0, 3).map((entry) => (
                      <div
                        key={entry.id}
                        className="bg-notebook-paper/70 p-4 rounded border border-notebook-lines"
                      >
                        <div className="flex items-center gap-2 text-xs text-ink-blue mb-2 font-journal">
                          <span>{formatDate(entry.date)}</span>
                          <span>•</span>
                          <span>{formatTime(entry.date)}</span>
                        </div>
                        <p className="font-journal text-ink-black text-sm leading-relaxed line-clamp-3">
                          {entry.content}
                        </p>
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Journal;