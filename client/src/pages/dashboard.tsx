import { useEffect, useState } from "react";
import { useAuth } from "@/lib/auth";
import { useLocation } from "wouter";
import { useQuery } from "@tanstack/react-query";
import { Sidebar } from "@/components/layout/sidebar";
import { Header } from "@/components/layout/header";
import { TrackStats } from "@/components/tracks/track-stats";
import { TrackTable } from "@/components/tracks/track-table";
import type { Track } from "@shared/schema";

interface DashboardStats {
  totalTracks: number;
  releasedTracks: number;
  pendingTracks: number;
  processingTracks: number;
  totalStreams: number;
}

export default function Dashboard() {
  const { isAuthenticated } = useAuth();
  const [, setLocation] = useLocation();
  const [searchQuery, setSearchQuery] = useState("");
  const [statusFilter, setStatusFilter] = useState("");

  useEffect(() => {
    if (!isAuthenticated) {
      setLocation("/login");
    }
  }, [isAuthenticated, setLocation]);

  const { data: stats, isLoading: statsLoading } = useQuery<DashboardStats>({
    queryKey: ["/api/dashboard/stats"],
  });

  const { data: tracks = [], isLoading: tracksLoading } = useQuery<Track[]>({
    queryKey: ["/api/tracks", searchQuery, statusFilter],
    queryFn: async () => {
      const params = new URLSearchParams();
      if (searchQuery) params.append("search", searchQuery);
      if (statusFilter) params.append("status", statusFilter);
      
      const response = await fetch(`/api/tracks?${params}`);
      if (!response.ok) throw new Error("Failed to fetch tracks");
      return response.json();
    },
  });

  const handleSearch = (query: string) => {
    setSearchQuery(query);
  };

  const handleStatusFilter = (status: string) => {
    setStatusFilter(status);
  };

  if (!isAuthenticated) {
    return null;
  }

  return (
    <div className="min-h-screen bg-background">
      <Sidebar />
      <div className="lg:ml-64">
        <Header 
          title="Dashboard" 
          subtitle="Manage your music distribution"
        />
        
        <main className="p-6 space-y-6">
          {/* Stats Cards */}
          {stats && (
            <TrackStats stats={stats} />
          )}
          
          {/* Tracks Table */}
          <TrackTable 
            tracks={tracks}
            isLoading={tracksLoading}
            onSearch={handleSearch}
            onStatusFilter={handleStatusFilter}
          />
        </main>
      </div>
    </div>
  );
}
