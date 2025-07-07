import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Heart, Users, MessageSquare } from "lucide-react";
import { useNavigate } from "react-router-dom";
import heroImage from "@/assets/hero-image.jpg";

const Index = () => {
  const navigate = useNavigate();
  return (
    <div className="min-h-screen bg-gradient-subtle">
      {/* Header */}
      <header className="container mx-auto px-4 py-6">
        <nav className="flex items-center justify-between">
          <div className="flex items-center space-x-2">
            <div className="w-8 h-8 bg-gradient-primary rounded-lg flex items-center justify-center">
              <Heart className="w-5 h-5 text-primary-foreground" />
            </div>
            <h1 className="text-2xl font-bold bg-gradient-primary bg-clip-text text-transparent">
              DuoHombre
            </h1>
          </div>
          <div className="flex items-center space-x-4">
            <Button variant="ghost">Sign In</Button>
            <Button variant="gradient" onClick={() => navigate("/create-team")}>Get Started</Button>
          </div>
        </nav>
      </header>

      {/* Hero Section */}
      <section className="container mx-auto px-4 py-12 text-center">
        <div className="max-w-4xl mx-auto">
          <Badge variant="secondary" className="mb-6 text-sm px-4 py-2">
            🔥 The Future of Double Dating
          </Badge>
          
          <h2 className="text-5xl md:text-7xl font-bold mb-6 leading-tight">
            <span className="bg-gradient-primary bg-clip-text text-transparent">
              Double
            </span>{" "}
            the Fun,{" "}
            <span className="bg-gradient-secondary bg-clip-text text-transparent">
              Double
            </span>{" "}
            the Connections
          </h2>
          
          <p className="text-xl text-muted-foreground mb-8 max-w-2xl mx-auto leading-relaxed">
            Team up with your best friend and meet other awesome duos. 
            DuoHombre makes double dating fun, safe, and authentic.
          </p>
          

          <div className="relative rounded-2xl overflow-hidden shadow-elegant max-w-3xl mx-auto">
            <img 
              src={heroImage} 
              alt="Friends having fun together" 
              className="w-full h-auto"
            />
            <div className="absolute inset-0 bg-gradient-accent opacity-10"></div>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="container mx-auto px-4 py-16">
        <div className="text-center mb-12">
          <h3 className="text-3xl md:text-4xl font-bold mb-4">
            How DuoHombre Works
          </h3>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
            Simple, fun, and designed for authentic connections between friend groups.
          </p>
        </div>

        <div className="grid md:grid-cols-3 gap-8 max-w-5xl mx-auto">
          <Card className="text-center p-8 hover:shadow-card transition-all duration-300 hover:-translate-y-2">
            <CardContent className="p-0">
              <div className="w-16 h-16 bg-gradient-primary rounded-full flex items-center justify-center mx-auto mb-6">
                <Users className="w-8 h-8 text-primary-foreground" />
              </div>
              <h4 className="text-xl font-semibold mb-4">Create Your Team</h4>
              <p className="text-muted-foreground">
                Sign up with your best friend and create a team profile with both your photos and interests.
              </p>
            </CardContent>
          </Card>

          <Card className="text-center p-8 hover:shadow-card transition-all duration-300 hover:-translate-y-2">
            <CardContent className="p-0">
              <div className="w-16 h-16 bg-gradient-secondary rounded-full flex items-center justify-center mx-auto mb-6">
                <Heart className="w-8 h-8 text-accent-foreground" />
              </div>
              <h4 className="text-xl font-semibold mb-4">Swipe & Match</h4>
              <p className="text-muted-foreground">
                Discover other teams and swipe right when you both want to meet. Match when the feeling is mutual!
              </p>
            </CardContent>
          </Card>

          <Card className="text-center p-8 hover:shadow-card transition-all duration-300 hover:-translate-y-2">
            <CardContent className="p-0">
              <div className="w-16 h-16 bg-gradient-accent rounded-full flex items-center justify-center mx-auto mb-6">
                <MessageSquare className="w-8 h-8 text-primary-foreground" />
              </div>
              <h4 className="text-xl font-semibold mb-4">Plan & Meet</h4>
              <p className="text-muted-foreground">
                Chat with your matches, plan amazing double dates, and rate your experiences to help the community.
              </p>
            </CardContent>
          </Card>
        </div>
      </section>

      {/* Stats Section */}
      <section className="container mx-auto px-4 py-16">
        <div className="bg-gradient-primary rounded-3xl p-12 text-center shadow-glow">
          <h3 className="text-3xl md:text-4xl font-bold text-primary-foreground mb-8">
            Join the Community
          </h3>
          <div className="grid md:grid-cols-3 gap-8 max-w-3xl mx-auto">
            <div className="text-primary-foreground">
              <div className="text-4xl font-bold mb-2">1000+</div>
              <div className="text-primary-foreground/80">Active Teams</div>
            </div>
            <div className="text-primary-foreground">
              <div className="text-4xl font-bold mb-2">5000+</div>
              <div className="text-primary-foreground/80">Successful Dates</div>
            </div>
            <div className="text-primary-foreground">
              <div className="text-4xl font-bold mb-2">4.8 ⭐</div>
              <div className="text-primary-foreground/80">Average Rating</div>
            </div>
          </div>
        </div>
      </section>


      {/* Footer */}
      <footer className="bg-card py-12 border-t border-border">
        <div className="container mx-auto px-4 text-center">
          <div className="flex items-center justify-center space-x-2 mb-4">
            <div className="w-6 h-6 bg-gradient-primary rounded-lg flex items-center justify-center">
              <Heart className="w-4 h-4 text-primary-foreground" />
            </div>
            <span className="font-semibold">DuoHombre</span>
          </div>
          <p className="text-muted-foreground">
            Made with ❤️ for authentic connections and unforgettable experiences.
          </p>
        </div>
      </footer>
    </div>
  );
};

export default Index;