import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Heart, MessageCircle, PenTool, Shield, Users, Zap } from "lucide-react";
import { Link } from "react-router-dom";
import { useState, useEffect } from "react";
import heroImage from "@/assets/hero-bg.jpg";

const Index = () => {
  const [user, setUser] = useState<{ name: string; email: string } | null>(null);
  const [isSignUpOpen, setIsSignUpOpen] = useState(false);
  const [signUpForm, setSignUpForm] = useState({ name: "", email: "" });

  // Load user from localStorage on component mount
  useEffect(() => {
    const savedUser = localStorage.getItem("demoUser");
    if (savedUser) {
      setUser(JSON.parse(savedUser));
    }
  }, []);

  const handleSignUp = (e: React.FormEvent) => {
    e.preventDefault();
    if (signUpForm.name && signUpForm.email) {
      const newUser = { name: signUpForm.name, email: signUpForm.email };
      setUser(newUser);
      localStorage.setItem("demoUser", JSON.stringify(newUser));
      setIsSignUpOpen(false);
      setSignUpForm({ name: "", email: "" });
    }
  };

  const handleSignOut = () => {
    setUser(null);
    localStorage.removeItem("demoUser");
  };

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
            {user ? (
              <div className="flex items-center gap-4">
                <span className="text-foreground font-medium">Welcome, {user.name}!</span>
                <Button variant="outline" onClick={handleSignOut}>Sign Out</Button>
              </div>
            ) : (
              <>
                <Dialog open={isSignUpOpen} onOpenChange={setIsSignUpOpen}>
                  <DialogTrigger asChild>
                    <Button variant="outline">Sign In</Button>
                  </DialogTrigger>
                  <DialogTrigger asChild>
                    <Button variant="hero">Get Started</Button>
                  </DialogTrigger>
                  <DialogContent className="sm:max-w-md">
                    <DialogHeader>
                      <DialogTitle>Welcome to I'll be there for you</DialogTitle>
                      <DialogDescription>
                        Enter your details to get started with your wellness journey.
                      </DialogDescription>
                    </DialogHeader>
                    <form onSubmit={handleSignUp} className="space-y-4">
                      <div className="space-y-2">
                        <Label htmlFor="name">Full Name</Label>
                        <Input
                          id="name"
                          placeholder="Enter your full name"
                          value={signUpForm.name}
                          onChange={(e) => setSignUpForm(prev => ({ ...prev, name: e.target.value }))}
                          required
                        />
                      </div>
                      <div className="space-y-2">
                        <Label htmlFor="email">Email</Label>
                        <Input
                          id="email"
                          type="email"
                          placeholder="Enter your email"
                          value={signUpForm.email}
                          onChange={(e) => setSignUpForm(prev => ({ ...prev, email: e.target.value }))}
                          required
                        />
                      </div>
                      <Button type="submit" className="w-full" variant="hero">
                        Get Started
                      </Button>
                    </form>
                  </DialogContent>
                </Dialog>
              </>
            )}
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
            <Link to="/journal">
              <Button variant="wellness" size="xl">
                <PenTool className="mr-2 h-5 w-5" />
                Begin Journaling
              </Button>
            </Link>
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

      {/* Demo Site Notice */}
      <section className="py-16 bg-muted/50 border-y">
        <div className="container mx-auto px-6 text-center">
          <div className="max-w-3xl mx-auto">
            <div className="inline-flex items-center gap-2 bg-primary/10 text-primary px-4 py-2 rounded-full text-sm font-medium mb-6">
              <Zap className="h-4 w-4" />
              Demo Site
            </div>
            <h2 className="mb-6 text-3xl font-bold text-foreground">
              Experience Our Mental Wellness Platform
            </h2>
            <p className="mb-8 text-lg text-muted-foreground">
              This is a demonstration version of "I'll be there for you". Feel free to explore the chat feature, try journaling, and sign up with demo credentials. All interactions are simulated for showcase purposes.
            </p>
            <div className="grid md:grid-cols-3 gap-6 text-left">
              <div className="p-4 bg-card border rounded-lg">
                <MessageCircle className="h-8 w-8 text-wellness-blue mb-3" />
                <h3 className="font-semibold mb-2">AI Chat Demo</h3>
                <p className="text-sm text-muted-foreground">Try conversing with our AI companion</p>
              </div>
              <div className="p-4 bg-card border rounded-lg">
                <PenTool className="h-8 w-8 text-wellness-green mb-3" />
                <h3 className="font-semibold mb-2">Journal Experience</h3>
                <p className="text-sm text-muted-foreground">Explore our beautiful journaling interface</p>
              </div>
              <div className="p-4 bg-card border rounded-lg">
                <Users className="h-8 w-8 text-wellness-purple mb-3" />
                <h3 className="font-semibold mb-2">Demo Sign Up</h3>
                <p className="text-sm text-muted-foreground">Test the sign up flow with any credentials</p>
              </div>
            </div>
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