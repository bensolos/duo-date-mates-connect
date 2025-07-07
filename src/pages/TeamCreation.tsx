import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Badge } from "@/components/ui/badge";
import { Upload, Plus, X, Heart, ArrowLeft } from "lucide-react";
import { useNavigate } from "react-router-dom";
import { useToast } from "@/hooks/use-toast";

const TeamCreation = () => {
  const navigate = useNavigate();
  const { toast } = useToast();
  
  // Form state
  const [teamName, setTeamName] = useState("");
  const [teamBio, setTeamBio] = useState("");
  const [person1Name, setPerson1Name] = useState("");
  const [person1Age, setPerson1Age] = useState("");
  const [person1Movie, setPerson1Movie] = useState("");
  const [person1ProfilePic, setPerson1ProfilePic] = useState<string | null>(null);
  const [person1Photos, setPerson1Photos] = useState<string[]>([]);
  const [person2Name, setPerson2Name] = useState("");
  const [person2Age, setPerson2Age] = useState("");
  const [person2Movie, setPerson2Movie] = useState("");
  const [person2ProfilePic, setPerson2ProfilePic] = useState<string | null>(null);
  const [person2Photos, setPerson2Photos] = useState<string[]>([]);
  
  const [person1Skills, setPerson1Skills] = useState<string[]>([]);
  const [person2Skills, setPerson2Skills] = useState<string[]>([]);
  const [newSkill1, setNewSkill1] = useState("");
  const [newSkill2, setNewSkill2] = useState("");
  
  // Validation state
  const [missingFields, setMissingFields] = useState<string[]>([]);

  const handleFileUpload = (file: File, type: 'profile' | 'photo', personNum: number) => {
    const reader = new FileReader();
    reader.onload = (e) => {
      const result = e.target?.result as string;
      if (type === 'profile') {
        if (personNum === 1) {
          setPerson1ProfilePic(result);
        } else {
          setPerson2ProfilePic(result);
        }
      } else {
        if (personNum === 1 && person1Photos.length < 6) {
          setPerson1Photos([...person1Photos, result]);
        } else if (personNum === 2 && person2Photos.length < 6) {
          setPerson2Photos([...person2Photos, result]);
        }
      }
    };
    reader.readAsDataURL(file);
  };

  const removePhoto = (personNum: number, index: number) => {
    if (personNum === 1) {
      setPerson1Photos(person1Photos.filter((_, i) => i !== index));
    } else {
      setPerson2Photos(person2Photos.filter((_, i) => i !== index));
    }
  };

  const validateForm = () => {
    const missing: string[] = [];
    
    if (!teamName.trim()) missing.push('team-name');
    if (!teamBio.trim()) missing.push('team-bio');
    if (!person1Name.trim()) missing.push('person1-name');
    if (!person1Age.trim()) missing.push('person1-age');
    if (!person1Movie.trim()) missing.push('person1-movie');
    if (!person1ProfilePic) missing.push('person1-profile');
    if (person1Skills.length === 0) missing.push('person1-skills');
    if (!person2Name.trim()) missing.push('person2-name');
    if (!person2Age.trim()) missing.push('person2-age');
    if (!person2Movie.trim()) missing.push('person2-movie');
    if (!person2ProfilePic) missing.push('person2-profile');
    if (person2Skills.length === 0) missing.push('person2-skills');
    
    setMissingFields(missing);
    return missing.length === 0;
  };

  const handleCreateDuo = () => {
    if (validateForm()) {
      toast({
        title: "Success!",
        description: "Your duo has been created successfully!",
      });
      // Handle successful creation here
    } else {
      toast({
        title: "Missing Information",
        description: "Please fill out all required fields highlighted in red.",
        variant: "destructive",
      });
    }
  };

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
    setNewSkill,
    name,
    setName,
    age,
    setAge,
    movie,
    setMovie,
    profilePic,
    photos
  }: { 
    personNum: number;
    skills: string[];
    newSkill: string;
    setNewSkill: (value: string) => void;
    name: string;
    setName: (value: string) => void;
    age: string;
    setAge: (value: string) => void;
    movie: string;
    setMovie: (value: string) => void;
    profilePic: string | null;
    photos: string[];
  }) => (
    <Card className={`bg-card border-border ${
      missingFields.some(field => field.startsWith(`person${personNum}`)) 
        ? 'border-destructive border-2' 
        : ''
    }`}>
      <CardHeader>
        <CardTitle className="text-xl">Person {personNum}</CardTitle>
      </CardHeader>
      <CardContent className="space-y-6">
        {/* Profile Picture */}
        <div className="text-center">
          <div className={`w-32 h-32 mx-auto mb-4 rounded-full flex items-center justify-center border-4 shadow-glow relative overflow-hidden ${
            missingFields.includes(`person${personNum}-profile`) 
              ? 'border-destructive' 
              : 'border-accent/20 bg-gradient-primary'
          }`}>
            {profilePic ? (
              <img src={profilePic} alt={`Person ${personNum}`} className="w-full h-full object-cover" />
            ) : (
              <Upload className="w-8 h-8 text-primary-foreground" />
            )}
          </div>
          <input
            type="file"
            accept="image/*"
            onChange={(e) => {
              const file = e.target.files?.[0];
              if (file) handleFileUpload(file, 'profile', personNum);
            }}
            className="hidden"
            id={`profile-upload-${personNum}`}
          />
          <Button 
            variant="outline" 
            size="sm"
            onClick={() => document.getElementById(`profile-upload-${personNum}`)?.click()}
          >
            Upload Profile Picture
          </Button>
        </div>

        {/* Basic Info */}
        <div className="grid grid-cols-2 gap-4">
          <div>
            <Label htmlFor={`name-${personNum}`}>Name *</Label>
            <Input 
              id={`name-${personNum}`}
              placeholder="Enter name"
              value={name}
              onChange={(e) => setName(e.target.value)}
              className={`bg-background border-border ${
                missingFields.includes(`person${personNum}-name`) ? 'border-destructive' : ''
              }`}
            />
          </div>
          <div>
            <Label htmlFor={`age-${personNum}`}>Age *</Label>
            <Input 
              id={`age-${personNum}`}
              type="number"
              placeholder="Age"
              value={age}
              onChange={(e) => setAge(e.target.value)}
              className={`bg-background border-border ${
                missingFields.includes(`person${personNum}-age`) ? 'border-destructive' : ''
              }`}
            />
          </div>
        </div>

        {/* Photos */}
        <div>
          <Label className="text-sm font-medium mb-3 block">Photos (optional)</Label>
          <div className="grid grid-cols-3 gap-3">
            {/* Existing photos */}
            {photos.map((photo, index) => (
              <div key={index} className="aspect-square relative rounded-lg overflow-hidden">
                <img src={photo} alt={`Photo ${index + 1}`} className="w-full h-full object-cover" />
                <button
                  onClick={() => removePhoto(personNum, index)}
                  className="absolute top-1 right-1 bg-destructive text-destructive-foreground rounded-full w-5 h-5 flex items-center justify-center text-xs hover:bg-destructive/80"
                >
                  <X className="w-3 h-3" />
                </button>
              </div>
            ))}
            {/* Upload slots */}
            {Array.from({ length: 6 - photos.length }).map((_, i) => (
              <div key={`upload-${i}`}>
                <input
                  type="file"
                  accept="image/*"
                  onChange={(e) => {
                    const file = e.target.files?.[0];
                    if (file) handleFileUpload(file, 'photo', personNum);
                  }}
                  className="hidden"
                  id={`photo-upload-${personNum}-${i}`}
                />
                <div 
                  className="aspect-square bg-muted rounded-lg border-2 border-dashed border-border hover:border-accent/50 flex items-center justify-center cursor-pointer transition-colors"
                  onClick={() => document.getElementById(`photo-upload-${personNum}-${i}`)?.click()}
                >
                  <Plus className="w-6 h-6 text-muted-foreground" />
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Skills */}
        <div>
          <Label className={`text-sm font-medium mb-3 block ${
            missingFields.includes(`person${personNum}-skills`) ? 'text-destructive' : ''
          }`}>
            Skills & Interests *
          </Label>
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
              className={`bg-background border-border ${
                missingFields.includes(`person${personNum}-skills`) ? 'border-destructive' : ''
              }`}
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
          <Label htmlFor={`movie-${personNum}`}>Favorite Movie *</Label>
          <Input 
            id={`movie-${personNum}`}
            placeholder="What's your favorite movie?"
            value={movie}
            onChange={(e) => setMovie(e.target.value)}
            className={`bg-background border-border ${
              missingFields.includes(`person${personNum}-movie`) ? 'border-destructive' : ''
            }`}
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
          <Card className={`mb-8 bg-card border-border ${
            missingFields.some(field => field.startsWith('team')) ? 'border-destructive border-2' : ''
          }`}>
            <CardHeader>
              <CardTitle>Team Details</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                <div>
                  <Label htmlFor="team-name">Team Name *</Label>
                  <Input 
                    id="team-name"
                    placeholder="e.g., Ben & Jake"
                    value={teamName}
                    onChange={(e) => setTeamName(e.target.value)}
                    className={`bg-background border-border ${
                      missingFields.includes('team-name') ? 'border-destructive' : ''
                    }`}
                  />
                </div>
                <div>
                  <Label htmlFor="team-bio">About Your Team *</Label>
                  <Textarea 
                    id="team-bio"
                    placeholder="Tell other teams what makes you unique..."
                    value={teamBio}
                    onChange={(e) => setTeamBio(e.target.value)}
                    className={`bg-background border-border resize-none ${
                      missingFields.includes('team-bio') ? 'border-destructive' : ''
                    }`}
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
              name={person1Name}
              setName={setPerson1Name}
              age={person1Age}
              setAge={setPerson1Age}
              movie={person1Movie}
              setMovie={setPerson1Movie}
              profilePic={person1ProfilePic}
              photos={person1Photos}
            />
            <PersonSection 
              personNum={2}
              skills={person2Skills}
              newSkill={newSkill2}
              setNewSkill={setNewSkill2}
              name={person2Name}
              setName={setPerson2Name}
              age={person2Age}
              setAge={setPerson2Age}
              movie={person2Movie}
              setMovie={setPerson2Movie}
              profilePic={person2ProfilePic}
              photos={person2Photos}
            />
          </div>

          {/* Action Buttons */}
          <div className="flex justify-center">
            <Button 
              variant="gradient" 
              size="lg" 
              className="px-12"
              onClick={handleCreateDuo}
            >
              Create Duo
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default TeamCreation;