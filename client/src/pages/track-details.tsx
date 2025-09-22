import { useEffect } from "react";
import { useAuth } from "@/lib/auth";
import { useLocation, useParams } from "wouter";
import { useQuery } from "@tanstack/react-query";
import { Sidebar } from "@/components/layout/sidebar";
import { Header } from "@/components/layout/header";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { ArrowLeft, Play, Edit, Download, Music, PlayCircle, Heart, Share, DollarSign } from "lucide-react";
import type { Track } from "@shared/schema";

export default function TrackDetails() {
  const { isAuthenticated } = useAuth();
  const [, setLocation] = useLocation();
  const params = useParams();
  const trackId = params.id;

  useEffect(() => {
    if (!isAuthenticated) {
      setLocation("/login");
    }
  }, [isAuthenticated, setLocation]);

  const { data: track, isLoading } = useQuery<Track>({
    queryKey: ["/api/tracks", trackId],
    enabled: !!trackId,
  });

  const handleGoBack = () => {
    setLocation("/dashboard");
  };

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString("en-US", {
      year: "numeric",
      month: "long",
      day: "numeric",
    });
  };

  const getStatusClassName = (status: string) => {
    switch (status) {
      case "released":
        return "status-released";
      case "pending":
        return "status-pending";
      case "processing":
        return "status-processing";
      case "rejected":
        return "status-rejected";
      default:
        return "";
    }
  };

  if (!isAuthenticated) {
    return null;
  }

  if (isLoading) {
    return (
      <div className="min-h-screen bg-background">
        <Sidebar />
        <div className="lg:ml-64">
          <Header title="Track Details" subtitle="Loading..." />
          <main className="p-6">
            <div className="text-center">Loading track details...</div>
          </main>
        </div>
      </div>
    );
  }

  if (!track) {
    return (
      <div className="min-h-screen bg-background">
        <Sidebar />
        <div className="lg:ml-64">
          <Header title="Track Not Found" />
          <main className="p-6">
            <div className="text-center">
              <p className="text-muted-foreground mb-4">The track you're looking for doesn't exist.</p>
              <Button onClick={handleGoBack}>Back to Dashboard</Button>
            </div>
          </main>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-background">
      <Sidebar />
      <div className="lg:ml-64">
        <Header title="Track Details" subtitle="View track performance and details" />
        
        <main className="p-6 max-w-4xl mx-auto space-y-6">
          {/* Back Button */}
          <Button 
            variant="ghost" 
            onClick={handleGoBack}
            className="mb-4"
            data-testid="button-go-back"
          >
            <ArrowLeft className="w-4 h-4 mr-2" />
            Back to Dashboard
          </Button>
          
          {/* Track Header */}
          <Card>
            <CardContent className="p-8">
              <div className="flex flex-col md:flex-row gap-8">
                {/* Album Art / Placeholder */}
                <div className="w-full md:w-64 h-64 bg-gradient-to-br from-primary to-blue-500 rounded-lg flex items-center justify-center text-primary-foreground">
                  <Music className="w-16 h-16" />
                </div>
                
                {/* Track Info */}
                <div className="flex-1">
                  <h1 className="text-3xl font-bold text-card-foreground mb-2" data-testid="text-track-title">
                    {track.title}
                  </h1>
                  <p className="text-xl text-muted-foreground mb-4" data-testid="text-track-artist">
                    {track.artist}
                  </p>
                  
                  <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-6">
                    <div>
                      <p className="text-sm text-muted-foreground">Release Date</p>
                      <p className="font-medium" data-testid="text-track-release-date">
                        {formatDate(track.releaseDate)}
                      </p>
                    </div>
                    <div>
                      <p className="text-sm text-muted-foreground">Genre</p>
                      <p className="font-medium" data-testid="text-track-genre">
                        {track.genre}
                      </p>
                    </div>
                    <div>
                      <p className="text-sm text-muted-foreground">Duration</p>
                      <p className="font-medium" data-testid="text-track-duration">
                        {track.duration}
                      </p>
                    </div>
                    <div>
                      <p className="text-sm text-muted-foreground">Status</p>
                      <span className={getStatusClassName(track.status)} data-testid="text-track-status">
                        {track.status}
                      </span>
                    </div>
                  </div>
                  
                  <div className="flex flex-wrap gap-3">
                    <Button data-testid="button-preview">
                      <Play className="w-4 h-4 mr-2" />
                      Preview
                    </Button>
                    <Button variant="outline" data-testid="button-edit">
                      <Edit className="w-4 h-4 mr-2" />
                      Edit
                    </Button>
                    <Button variant="outline" data-testid="button-download">
                      <Download className="w-4 h-4 mr-2" />
                      Download
                    </Button>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
          
          {/* Stats and Analytics */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            <Card>
              <CardContent className="p-6">
                <div className="text-center">
                  <PlayCircle className="mx-auto text-3xl text-blue-500 mb-3 w-8 h-8" />
                  <p className="text-2xl font-bold text-card-foreground" data-testid="text-track-streams">
                    {(track.streams || 0).toLocaleString()}
                  </p>
                  <p className="text-sm text-muted-foreground">Total Streams</p>
                </div>
              </CardContent>
            </Card>
            
            <Card>
              <CardContent className="p-6">
                <div className="text-center">
                  <Heart className="mx-auto text-3xl text-red-500 mb-3 w-8 h-8" />
                  <p className="text-2xl font-bold text-card-foreground" data-testid="text-track-likes">
                    {(track.likes || 0).toLocaleString()}
                  </p>
                  <p className="text-sm text-muted-foreground">Likes</p>
                </div>
              </CardContent>
            </Card>
            
            <Card>
              <CardContent className="p-6">
                <div className="text-center">
                  <Share className="mx-auto text-3xl text-green-500 mb-3 w-8 h-8" />
                  <p className="text-2xl font-bold text-card-foreground" data-testid="text-track-shares">
                    {(track.shares || 0).toLocaleString()}
                  </p>
                  <p className="text-sm text-muted-foreground">Shares</p>
                </div>
              </CardContent>
            </Card>
            
            <Card>
              <CardContent className="p-6">
                <div className="text-center">
                  <DollarSign className="mx-auto text-3xl text-yellow-500 mb-3 w-8 h-8" />
                  <p className="text-2xl font-bold text-card-foreground" data-testid="text-track-earnings">
                    ${track.earnings || "0.00"}
                  </p>
                  <p className="text-sm text-muted-foreground">Earnings</p>
                </div>
              </CardContent>
            </Card>
          </div>
          
          {/* Platform Distribution */}
          <Card>
            <CardContent className="p-6">
              <h2 className="text-lg font-semibold text-card-foreground mb-6">Platform Distribution</h2>
              <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
                {[
                  { name: "Spotify", streams: "65,432", available: true, color: "bg-green-500" },
                  { name: "Apple Music", streams: "42,156", available: true, color: "bg-black" },
                  { name: "YouTube Music", streams: "17,844", available: true, color: "bg-red-500" },
                  { name: "Amazon Music", streams: "Not Available", available: false, color: "bg-orange-500" },
                ].map((platform) => (
                  <div key={platform.name} className="flex items-center p-4 border border-border rounded-lg">
                    <div className={`w-10 h-10 ${platform.color} rounded-full flex items-center justify-center text-white mr-3`}>
                      <Music className="w-4 h-4" />
                    </div>
                    <div>
                      <p className="font-medium text-card-foreground">{platform.name}</p>
                      <p className="text-sm text-muted-foreground">
                        {platform.available ? `${platform.streams} streams` : platform.streams}
                      </p>
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
          
          {/* Track Description */}
          {track.description && (
            <Card>
              <CardContent className="p-6">
                <h2 className="text-lg font-semibold text-card-foreground mb-4">About This Track</h2>
                <p className="text-muted-foreground leading-relaxed" data-testid="text-track-description">
                  {track.description}
                </p>
              </CardContent>
            </Card>
          )}
        </main>
      </div>
    </div>
  );
}
