import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Badge } from "@/components/ui/badge";
import { Upload, Plus, X, Heart, ArrowLeft } from "lucide-react";
import { useNavigate } from "react-router-dom";

const TeamCreation = () => {
  const navigate = useNavigate();
  const [person1Skills, setPerson1Skills] = useState<string[]>([]);
  const [person2Skills, setPerson2Skills] = useState<string[]>([]);
  const [newSkill1, setNewSkill1] = useState("");
  const [newSkill2, setNewSkill2] = useState("");

  const addSkill = (personNum: number, skill: string) => {
    if (skill.trim()) {
      if (personNum === 1) {
        setPerson1Skills([...person1Skills, skill.trim()]);
        setNewSkill1("");
      } else {
        setPerson2Skills([...person2Skills, skill.trim()]);
        setNewSkill2("");
      }
    }
  };

  const removeSkill = (personNum: number, index: number) => {
    if (personNum === 1) {
      setPerson1Skills(person1Skills.filter((_, i) => i !== index));
    } else {
      setPerson2Skills(person2Skills.filter((_, i) => i !== index));
    }
  };

  const PersonSection = ({ 
    personNum, 
    skills, 
    newSkill, 
    setNewSkill 
  }: { 
    personNum: number;
    skills: string[];
    newSkill: string;
    setNewSkill: (value: string) => void;
  }) => (
    <Card className="bg-card border-border">
      <CardHeader>
        <CardTitle className="text-xl">Person {personNum}</CardTitle>
      </CardHeader>
      <CardContent className="space-y-6">
        {/* Profile Picture */}
        <div className="text-center">
          <div className="w-32 h-32 mx-auto mb-4 bg-gradient-primary rounded-full flex items-center justify-center border-4 border-accent/20 shadow-glow">
            <Upload className="w-8 h-8 text-primary-foreground" />
          </div>
          <Button variant="outline" size="sm">
            Upload Profile Picture
          </Button>
        </div>

        {/* Basic Info */}
        <div className="grid grid-cols-2 gap-4">
          <div>
            <Label htmlFor={`name-${personNum}`}>Name</Label>
            <Input 
              id={`name-${personNum}`}
              placeholder="Enter name"
              className="bg-background border-border"
            />
          </div>
          <div>
            <Label htmlFor={`age-${personNum}`}>Age</Label>
            <Input 
              id={`age-${personNum}`}
              type="number"
              placeholder="Age"
              className="bg-background border-border"
            />
          </div>
        </div>

        {/* Media Attachments */}
        <div>
          <Label className="text-sm font-medium mb-3 block">Additional Photos</Label>
          <div className="grid grid-cols-3 gap-3">
            {[1, 2, 3].map((i) => (
              <div 
                key={i}
                className="aspect-square bg-muted rounded-lg border-2 border-dashed border-border hover:border-accent/50 flex items-center justify-center cursor-pointer transition-colors"
              >
                <Plus className="w-6 h-6 text-muted-foreground" />
              </div>
            ))}
          </div>
        </div>

        {/* Skills */}
        <div>
          <Label className="text-sm font-medium mb-3 block">Skills & Interests</Label>
          <div className="flex flex-wrap gap-2 mb-3">
            {skills.map((skill, index) => (
              <Badge 
                key={index}
                variant="secondary" 
                className="bg-gradient-accent text-accent-foreground"
              >
                {skill}
                <X 
                  className="w-3 h-3 ml-1 cursor-pointer hover:text-destructive" 
                  onClick={() => removeSkill(personNum, index)}
                />
              </Badge>
            ))}
          </div>
          <div className="flex gap-2">
            <Input
              value={newSkill}
              onChange={(e) => setNewSkill(e.target.value)}
              placeholder="Add a skill or interest"
              className="bg-background border-border"
              onKeyPress={(e) => {
                if (e.key === "Enter") {
                  addSkill(personNum, newSkill);
                }
              }}
            />
            <Button 
              variant="outline" 
              size="sm"
              onClick={() => addSkill(personNum, newSkill)}
            >
              <Plus className="w-4 h-4" />
            </Button>
          </div>
        </div>

        {/* Favorite Movie */}
        <div>
          <Label htmlFor={`movie-${personNum}`}>Favorite Movie</Label>
          <Input 
            id={`movie-${personNum}`}
            placeholder="What's your favorite movie?"
            className="bg-background border-border"
          />
        </div>
      </CardContent>
    </Card>
  );

  return (
    <div className="min-h-screen bg-gradient-subtle">
      {/* Header */}
      <header className="container mx-auto px-4 py-6">
        <nav className="flex items-center justify-between">
          <Button 
            variant="ghost" 
            onClick={() => navigate("/")}
            className="flex items-center gap-2"
          >
            <ArrowLeft className="w-4 h-4" />
            Back to Home
          </Button>
          <div className="flex items-center space-x-2">
            <div className="w-8 h-8 bg-gradient-primary rounded-lg flex items-center justify-center">
              <Heart className="w-5 h-5 text-primary-foreground" />
            </div>
            <h1 className="text-2xl font-bold bg-gradient-primary bg-clip-text text-transparent">
              DuoHombre
            </h1>
          </div>
        </nav>
      </header>

      {/* Main Content */}
      <div className="container mx-auto px-4 py-8">
        <div className="max-w-6xl mx-auto">
          {/* Title Section */}
          <div className="text-center mb-8">
            <h2 className="text-4xl font-bold mb-4">
              Create Your{" "}
              <span className="bg-gradient-primary bg-clip-text text-transparent">
                Dream Team
              </span>
            </h2>
            <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
              Set up your team profile with your best friend. Add photos, skills, and interests to attract your perfect double date matches!
            </p>
          </div>

          {/* Team Name */}
          <Card className="mb-8 bg-card border-border">
            <CardHeader>
              <CardTitle className="text-center">Team Details</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="max-w-md mx-auto space-y-4">
                <div>
                  <Label htmlFor="team-name">Team Name</Label>
                  <Input 
                    id="team-name"
                    placeholder="e.g., Ben & Jake"
                    className="bg-background border-border text-center text-lg"
                  />
                </div>
                <div>
                  <Label htmlFor="team-bio">About Your Team</Label>
                  <Textarea 
                    id="team-bio"
                    placeholder="Tell other teams what makes you unique..."
                    className="bg-background border-border resize-none"
                    rows={3}
                  />
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Person Sections */}
          <div className="grid lg:grid-cols-2 gap-8 mb-8">
            <PersonSection 
              personNum={1}
              skills={person1Skills}
              newSkill={newSkill1}
              setNewSkill={setNewSkill1}
            />
            <PersonSection 
              personNum={2}
              skills={person2Skills}
              newSkill={newSkill2}
              setNewSkill={setNewSkill2}
            />
          </div>

          {/* Action Buttons */}
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Button variant="outline" size="lg" className="px-8">
              Save as Draft
            </Button>
            <Button variant="gradient" size="lg" className="px-8">
              Create Team Profile
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default TeamCreation;