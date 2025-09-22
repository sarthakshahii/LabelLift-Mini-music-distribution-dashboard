import { useEffect, useState } from "react";
import { useAuth } from "@/lib/auth";
import { useLocation } from "wouter";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { Sidebar } from "@/components/layout/sidebar";
import { Header } from "@/components/layout/header";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Card, CardContent } from "@/components/ui/card";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Checkbox } from "@/components/ui/checkbox";
import { useToast } from "@/hooks/use-toast";
import { CloudUpload, Upload as UploadIcon } from "lucide-react";
import { insertTrackSchema, type InsertTrack } from "@shared/schema";
import { apiRequest } from "@/lib/queryClient";

const genres = [
  "pop", "rock", "hip-hop", "electronic", "jazz", "classical", 
  "country", "r&b", "alternative", "folk"
];

const platforms = [
  { name: "Spotify", checked: true },
  { name: "Apple Music", checked: true },
  { name: "YouTube Music", checked: true },
  { name: "Amazon Music", checked: false },
  { name: "Deezer", checked: false },
  { name: "Tidal", checked: false },
];

export default function UploadTrack() {
  const { isAuthenticated } = useAuth();
  const [, setLocation] = useLocation();
  const { toast } = useToast();
  const queryClient = useQueryClient();
  const [selectedPlatforms, setSelectedPlatforms] = useState(
    platforms.filter(p => p.checked).map(p => p.name)
  );

  useEffect(() => {
    if (!isAuthenticated) {
      setLocation("/login");
    }
  }, [isAuthenticated, setLocation]);

  const form = useForm<InsertTrack>({
    resolver: zodResolver(insertTrackSchema),
    defaultValues: {
      title: "",
      artist: "",
      releaseDate: "",
      genre: "",
      description: "",
    },
  });

  const createTrackMutation = useMutation({
    mutationFn: async (data: InsertTrack) => {
      const response = await apiRequest("POST", "/api/tracks", data);
      return response.json();
    },
    onSuccess: () => {
      toast({
        title: "Track Uploaded",
        description: "Your track has been submitted for review.",
      });
      queryClient.invalidateQueries({ queryKey: ["/api/tracks"] });
      queryClient.invalidateQueries({ queryKey: ["/api/dashboard/stats"] });
      setLocation("/dashboard");
    },
    onError: (error: any) => {
      toast({
        title: "Upload Failed",
        description: error.message || "Failed to upload track",
        variant: "destructive",
      });
    },
  });

  const handleSubmit = (data: InsertTrack) => {
    createTrackMutation.mutate(data);
  };

  const handlePlatformChange = (platform: string, checked: boolean) => {
    setSelectedPlatforms(prev => 
      checked 
        ? [...prev, platform]
        : prev.filter(p => p !== platform)
    );
  };

  if (!isAuthenticated) {
    return null;
  }

  return (
    <div className="min-h-screen bg-background">
      <Sidebar />
      <div className="lg:ml-64">
        <Header 
          title="Upload Track" 
          subtitle="Add new music to your catalog"
        />
        
        <main className="p-6">
          <div className="max-w-2xl mx-auto">
            <Card>
              <CardContent className="p-8">
                <div className="text-center mb-8">
                  <UploadIcon className="mx-auto text-4xl text-primary mb-4 w-12 h-12" />
                  <h2 className="text-2xl font-bold text-card-foreground mb-2">Upload New Track</h2>
                  <p className="text-muted-foreground">Add your music to the distribution network</p>
                </div>
                
                <form className="space-y-6" onSubmit={form.handleSubmit(handleSubmit)}>
                  {/* File Upload Area */}
                  <div className="border-2 border-dashed border-input rounded-lg p-8 text-center hover:border-primary transition-colors cursor-pointer">
                    <CloudUpload className="mx-auto text-3xl text-muted-foreground mb-4 w-8 h-8" />
                    <h3 className="text-lg font-medium text-card-foreground mb-2">Drop your audio file here</h3>
                    <p className="text-muted-foreground mb-4">or click to browse</p>
                    <p className="text-sm text-muted-foreground">Supports MP3, WAV, FLAC up to 100MB</p>
                    <input type="file" className="hidden" accept=".mp3,.wav,.flac" />
                  </div>
                  
                  {/* Track Information */}
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div>
                      <Label htmlFor="title" className="block text-sm font-medium text-card-foreground mb-2">
                        Track Title *
                      </Label>
                      <Input 
                        {...form.register("title")}
                        placeholder="Enter track title"
                        data-testid="input-track-title"
                      />
                      {form.formState.errors.title && (
                        <p className="text-sm text-destructive mt-1">{form.formState.errors.title.message}</p>
                      )}
                    </div>
                    
                    <div>
                      <Label htmlFor="artist" className="block text-sm font-medium text-card-foreground mb-2">
                        Artist Name *
                      </Label>
                      <Input 
                        {...form.register("artist")}
                        placeholder="Enter artist name"
                        data-testid="input-artist-name"
                      />
                      {form.formState.errors.artist && (
                        <p className="text-sm text-destructive mt-1">{form.formState.errors.artist.message}</p>
                      )}
                    </div>
                    
                    <div>
                      <Label htmlFor="releaseDate" className="block text-sm font-medium text-card-foreground mb-2">
                        Release Date *
                      </Label>
                      <Input 
                        {...form.register("releaseDate")}
                        type="date"
                        data-testid="input-release-date"
                      />
                      {form.formState.errors.releaseDate && (
                        <p className="text-sm text-destructive mt-1">{form.formState.errors.releaseDate.message}</p>
                      )}
                    </div>
                    
                    <div>
                      <Label htmlFor="genre" className="block text-sm font-medium text-card-foreground mb-2">
                        Genre *
                      </Label>
                      <Select onValueChange={(value) => form.setValue("genre", value)}>
                        <SelectTrigger data-testid="select-genre">
                          <SelectValue placeholder="Select Genre" />
                        </SelectTrigger>
                        <SelectContent>
                          {genres.map((genre) => (
                            <SelectItem key={genre} value={genre}>
                              {genre.charAt(0).toUpperCase() + genre.slice(1)}
                            </SelectItem>
                          ))}
                        </SelectContent>
                      </Select>
                      {form.formState.errors.genre && (
                        <p className="text-sm text-destructive mt-1">{form.formState.errors.genre.message}</p>
                      )}
                    </div>
                  </div>
                  
                  {/* Description */}
                  <div>
                    <Label htmlFor="description" className="block text-sm font-medium text-card-foreground mb-2">
                      Description
                    </Label>
                    <Textarea 
                      {...form.register("description")}
                      rows={4}
                      placeholder="Tell us about your track..."
                      data-testid="textarea-description"
                    />
                  </div>
                  
                  {/* Distribution Platforms */}
                  <div>
                    <h3 className="text-lg font-medium text-card-foreground mb-4">Distribution Platforms</h3>
                    <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
                      {platforms.map((platform) => (
                        <div key={platform.name} className="flex items-center space-x-3 p-3 border border-input rounded-md hover:bg-accent transition-colors">
                          <Checkbox 
                            id={platform.name}
                            defaultChecked={platform.checked}
                            onCheckedChange={(checked) => handlePlatformChange(platform.name, !!checked)}
                            data-testid={`checkbox-${platform.name.toLowerCase().replace(/\s+/g, "-")}`}
                          />
                          <Label htmlFor={platform.name} className="text-sm cursor-pointer">
                            {platform.name}
                          </Label>
                        </div>
                      ))}
                    </div>
                  </div>
                  
                  {/* Submit Buttons */}
                  <div className="flex flex-col sm:flex-row gap-4 pt-6">
                    <Button 
                      type="button" 
                      variant="outline"
                      className="flex-1"
                      data-testid="button-save-draft"
                    >
                      Save as Draft
                    </Button>
                    <Button 
                      type="submit" 
                      className="flex-1"
                      disabled={createTrackMutation.isPending}
                      data-testid="button-submit-track"
                    >
                      {createTrackMutation.isPending ? "Submitting..." : "Submit for Review"}
                    </Button>
                  </div>
                </form>
              </CardContent>
            </Card>
          </div>
        </main>
      </div>
    </div>
  );
}
