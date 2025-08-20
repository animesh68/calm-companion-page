import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Heart, MessageCircle, PenTool, Shield, Users, Zap } from "lucide-react";
import { Link } from "react-router-dom";
import heroImage from "@/assets/hero-bg.jpg";

const Index = () => {
  return (
    <div className="min-h-screen bg-gradient-subtle">
      {/* Header */}
      <header className="container mx-auto px-6 py-4">
        <nav className="flex items-center justify-between">
          <div className="flex items-center gap-2">
            <Heart className="h-8 w-8 text-wellness-purple" />
            <span className="text-2xl font-bold text-foreground">I'll be there for you</span>
          </div>
          <div className="flex items-center gap-4">
            <Button variant="ghost">About</Button>
            <Button variant="ghost">Features</Button>
            <Button variant="outline">Sign In</Button>
            <Button variant="hero">Get Started</Button>
          </div>
        </nav>
      </header>

      {/* Hero Section */}
      <section className="relative overflow-hidden py-20">
        <div className="absolute inset-0 z-0">
          <img 
            src={heroImage} 
            alt="Peaceful mental health background" 
            className="w-full h-full object-cover opacity-30"
          />
          <div className="absolute inset-0 bg-gradient-hero opacity-20"></div>
        </div>
        
        <div className="container relative z-10 mx-auto px-6 text-center">
          <h1 className="mb-6 text-5xl font-bold tracking-tight text-foreground animate-fade-in">
            Your Journey to 
            <span className="bg-gradient-hero bg-clip-text text-transparent"> Mental Wellness</span>
            <br />Starts Here
          </h1>
          <p className="mb-8 text-xl text-muted-foreground max-w-2xl mx-auto animate-fade-in">
            Connect with an AI companion that understands you, and journal your thoughts in a safe, supportive space. Take the first step towards better mental health today.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center animate-fade-in">
            <Link to="/chat">
              <Button variant="hero" size="xl" className="shadow-glow">
                <MessageCircle className="mr-2 h-5 w-5" />
                Start Chatting
              </Button>
            </Link>
            <Button variant="wellness" size="xl">
              <PenTool className="mr-2 h-5 w-5" />
              Begin Journaling
            </Button>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="py-20">
        <div className="container mx-auto px-6">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold mb-4 text-foreground">
              Everything You Need for Mental Wellness
            </h2>
            <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
              Our platform combines AI-powered support with proven journaling techniques to help you navigate life's challenges.
            </p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            <Card className="hover:shadow-glow transition-all duration-300">
              <CardHeader>
                <div className="mb-4 p-3 rounded-lg bg-wellness-blue/10 w-fit">
                  <MessageCircle className="h-8 w-8 text-wellness-blue" />
                </div>
                <CardTitle>AI Companion Chat</CardTitle>
                <CardDescription>
                  24/7 support from an empathetic AI that listens without judgment and provides thoughtful responses.
                </CardDescription>
              </CardHeader>
            </Card>

            <Card className="hover:shadow-glow transition-all duration-300">
              <CardHeader>
                <div className="mb-4 p-3 rounded-lg bg-wellness-green/10 w-fit">
                  <PenTool className="h-8 w-8 text-wellness-green" />
                </div>
                <CardTitle>Guided Journaling</CardTitle>
                <CardDescription>
                  Structured prompts and exercises designed to help you process emotions and track your mental health journey.
                </CardDescription>
              </CardHeader>
            </Card>

            <Card className="hover:shadow-glow transition-all duration-300">
              <CardHeader>
                <div className="mb-4 p-3 rounded-lg bg-wellness-purple/10 w-fit">
                  <Shield className="h-8 w-8 text-wellness-purple" />
                </div>
                <CardTitle>Privacy First</CardTitle>
                <CardDescription>
                  Your thoughts and conversations are encrypted and secure. What you share stays private, always.
                </CardDescription>
              </CardHeader>
            </Card>

            <Card className="hover:shadow-glow transition-all duration-300">
              <CardHeader>
                <div className="mb-4 p-3 rounded-lg bg-primary/10 w-fit">
                  <Zap className="h-8 w-8 text-primary" />
                </div>
                <CardTitle>Instant Access</CardTitle>
                <CardDescription>
                  No appointments needed. Get support whenever you need it, from anywhere you are.
                </CardDescription>
              </CardHeader>
            </Card>

            <Card className="hover:shadow-glow transition-all duration-300">
              <CardHeader>
                <div className="mb-4 p-3 rounded-lg bg-accent/20 w-fit">
                  <Users className="h-8 w-8 text-accent-foreground" />
                </div>
                <CardTitle>Community Support</CardTitle>
                <CardDescription>
                  Connect with others on similar journeys through anonymous, moderated community features.
                </CardDescription>
              </CardHeader>
            </Card>

            <Card className="hover:shadow-glow transition-all duration-300">
              <CardHeader>
                <div className="mb-4 p-3 rounded-lg bg-secondary/50 w-fit">
                  <Heart className="h-8 w-8 text-secondary-foreground" />
                </div>
                <CardTitle>Evidence-Based</CardTitle>
                <CardDescription>
                  Built on scientifically-proven therapeutic techniques and mental health best practices.
                </CardDescription>
              </CardHeader>
            </Card>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 bg-gradient-hero">
        <div className="container mx-auto px-6 text-center">
          <h2 className="mb-6 text-4xl font-bold text-white">
            Ready to Start Your Wellness Journey?
          </h2>
          <p className="mb-8 text-xl text-white/90 max-w-2xl mx-auto">
            Join thousands of people who are already improving their mental health with I'll be there for you.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Button variant="outline" size="xl" className="bg-white text-primary border-white hover:bg-white/90">
              Try Free for 7 Days
            </Button>
            <Button variant="ghost" size="xl" className="text-white border-white/30 hover:bg-white/10">
              Learn More
            </Button>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="py-12 bg-card border-t">
        <div className="container mx-auto px-6">
          <div className="flex flex-col md:flex-row items-center justify-between">
            <div className="flex items-center gap-2 mb-4 md:mb-0">
              <Heart className="h-6 w-6 text-wellness-purple" />
              <span className="text-lg font-semibold text-foreground">I'll be there for you</span>
            </div>
            <div className="flex items-center gap-6 text-sm text-muted-foreground">
              <a href="#" className="hover:text-foreground transition-colors">Privacy Policy</a>
              <a href="#" className="hover:text-foreground transition-colors">Terms of Service</a>
              <a href="#" className="hover:text-foreground transition-colors">Support</a>
            </div>
          </div>
          <div className="mt-8 pt-8 border-t text-center text-sm text-muted-foreground">
            <p>© 2024 I'll be there for you. Your mental health matters.</p>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default Index;