import { useState } from "react";
import { Link } from "wouter";
import { Card, CardContent, CardHeader } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Button } from "@/components/ui/button";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Badge } from "@/components/ui/badge";
import { Music, Search, Eye, Edit, Trash2 } from "lucide-react";
import type { Track } from "@shared/schema";
import { cn } from "@/lib/utils";

interface TrackTableProps {
  tracks: Track[];
  isLoading?: boolean;
  onSearch?: (query: string) => void;
  onStatusFilter?: (status: string) => void;
  onDelete?: (trackId: string) => void;
}

export function TrackTable({ tracks, isLoading, onSearch, onStatusFilter, onDelete }: TrackTableProps) {
  const [searchQuery, setSearchQuery] = useState("");
  const [statusFilter, setStatusFilter] = useState("all");

  const handleSearchChange = (value: string) => {
    setSearchQuery(value);
    onSearch?.(value);
  };

  const handleStatusChange = (value: string) => {
    setStatusFilter(value);
    // Convert "all" to empty string for the API call
    onStatusFilter?.(value === "all" ? "" : value);
  };

  const getStatusBadgeVariant = (status: string) => {
    switch (status) {
      case "released":
        return "success";
      case "pending":
        return "warning";
      case "processing":
        return "info";
      case "rejected":
        return "destructive";
      default:
        return "secondary";
    }
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

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString("en-US", {
      year: "numeric",
      month: "short",
      day: "numeric",
    });
  };

  const formatStreams = (streams: number) => {
    if (streams === 0) return "--";
    return streams.toLocaleString();
  };

  return (
    <Card>
      <CardHeader>
        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
          <h2 className="text-lg font-semibold text-card-foreground">Your Tracks</h2>
          <div className="flex flex-col sm:flex-row gap-3">
            <div className="relative">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground w-4 h-4" />
              <Input 
                type="text" 
                placeholder="Search tracks..." 
                value={searchQuery}
                onChange={(e) => handleSearchChange(e.target.value)}
                className="pl-10 w-full sm:w-64"
                data-testid="input-search-tracks"
              />
            </div>
            <Select value={statusFilter} onValueChange={handleStatusChange}>
              <SelectTrigger className="w-full sm:w-32" data-testid="select-status-filter">
                <SelectValue placeholder="All Status" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">All Status</SelectItem>
                <SelectItem value="released">Released</SelectItem>
                <SelectItem value="pending">Pending</SelectItem>
                <SelectItem value="processing">Processing</SelectItem>
                <SelectItem value="rejected">Rejected</SelectItem>
              </SelectContent>
            </Select>
          </div>
        </div>
      </CardHeader>
      
      <CardContent className="p-0">
        <div className="overflow-x-auto">
          <Table>
            <TableHeader>
              <TableRow className="bg-muted/50">
                <TableHead>Track</TableHead>
                <TableHead>Artist</TableHead>
                <TableHead>Release Date</TableHead>
                <TableHead>Status</TableHead>
                <TableHead>Streams</TableHead>
                <TableHead>Actions</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {isLoading ? (
                <TableRow>
                  <TableCell colSpan={6} className="h-32 text-center">
                    Loading tracks...
                  </TableCell>
                </TableRow>
              ) : tracks.length === 0 ? (
                <TableRow>
                  <TableCell colSpan={6} className="h-32 text-center text-muted-foreground">
                    No tracks found
                  </TableCell>
                </TableRow>
              ) : (
                tracks.map((track) => (
                  <TableRow 
                    key={track.id}
                    className="hover:bg-muted/50 transition-colors cursor-pointer"
                    onClick={() => {/* Navigate to track details */}}
                    data-testid={`row-track-${track.id}`}
                  >
                    <TableCell>
                      <div className="flex items-center">
                        <div className="w-10 h-10 bg-gradient-to-br from-primary to-blue-500 rounded-md flex items-center justify-center text-primary-foreground font-medium text-sm">
                          <Music className="w-4 h-4" />
                        </div>
                        <div className="ml-4">
                          <p className="text-sm font-medium text-card-foreground" data-testid={`text-track-title-${track.id}`}>
                            {track.title}
                          </p>
                          <p className="text-sm text-muted-foreground">{track.duration}</p>
                        </div>
                      </div>
                    </TableCell>
                    <TableCell className="text-sm text-card-foreground" data-testid={`text-track-artist-${track.id}`}>
                      {track.artist}
                    </TableCell>
                    <TableCell className="text-sm text-muted-foreground" data-testid={`text-track-date-${track.id}`}>
                      {formatDate(track.releaseDate)}
                    </TableCell>
                    <TableCell>
                      <span className={cn("text-xs font-medium px-2 py-1 rounded-full", getStatusClassName(track.status))}>
                        {track.status}
                      </span>
                    </TableCell>
                    <TableCell className="text-sm text-muted-foreground" data-testid={`text-track-streams-${track.id}`}>
                      {formatStreams(track.streams || 0)}
                    </TableCell>
                    <TableCell>
                      <div className="flex items-center space-x-2">
                        <Link href={`/track/${track.id}`}>
                          <Button 
                            variant="ghost" 
                            size="sm"
                            data-testid={`button-view-${track.id}`}
                          >
                            <Eye className="w-4 h-4" />
                          </Button>
                        </Link>
                        <Button 
                          variant="ghost" 
                          size="sm"
                          data-testid={`button-edit-${track.id}`}
                        >
                          <Edit className="w-4 h-4" />
                        </Button>
                        <Button 
                          variant="ghost" 
                          size="sm"
                          onClick={(e) => {
                            e.stopPropagation();
                            onDelete?.(track.id);
                          }}
                          data-testid={`button-delete-${track.id}`}
                        >
                          <Trash2 className="w-4 h-4" />
                        </Button>
                      </div>
                    </TableCell>
                  </TableRow>
                ))
              )}
            </TableBody>
          </Table>
        </div>
        
        {/* Pagination placeholder */}
        {tracks.length > 0 && (
          <div className="px-6 py-4 border-t border-border">
            <div className="flex items-center justify-between">
              <div className="text-sm text-muted-foreground">
                Showing 1 to {tracks.length} of {tracks.length} results
              </div>
              <div className="flex items-center space-x-2">
                <Button variant="outline" size="sm" disabled>
                  Previous
                </Button>
                <Button variant="outline" size="sm" className="bg-primary text-primary-foreground">
                  1
                </Button>
                <Button variant="outline" size="sm" disabled>
                  Next
                </Button>
              </div>
            </div>
          </div>
        )}
      </CardContent>
    </Card>
  );
}
