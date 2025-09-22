import { Card, CardContent } from "@/components/ui/card";
import { Music, CheckCircle, Clock, Play } from "lucide-react";

interface StatsCardProps {
  title: string;
  value: string | number;
  icon: React.ReactNode;
  color?: string;
}

function StatsCard({ title, value, icon, color = "text-primary" }: StatsCardProps) {
  return (
    <Card>
      <CardContent className="p-6">
        <div className="flex items-center justify-between">
          <div>
            <p className="text-sm font-medium text-muted-foreground">{title}</p>
            <p className="text-2xl font-bold text-card-foreground">{value}</p>
          </div>
          <div className={`text-2xl ${color}`}>
            {icon}
          </div>
        </div>
      </CardContent>
    </Card>
  );
}

interface TrackStatsProps {
  stats: {
    totalTracks: number;
    releasedTracks: number;
    pendingTracks: number;
    totalStreams: number;
  };
}

export function TrackStats({ stats }: TrackStatsProps) {
  const formatNumber = (num: number) => {
    if (num >= 1000000) {
      return `${(num / 1000000).toFixed(1)}M`;
    }
    if (num >= 1000) {
      return `${(num / 1000).toFixed(1)}K`;
    }
    return num.toString();
  };

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
      <StatsCard
        title="Total Tracks"
        value={stats.totalTracks}
        icon={<Music className="w-6 h-6" />}
        color="text-primary"
      />
      <StatsCard
        title="Released"
        value={stats.releasedTracks}
        icon={<CheckCircle className="w-6 h-6" />}
        color="text-green-500"
      />
      <StatsCard
        title="Pending"
        value={stats.pendingTracks}
        icon={<Clock className="w-6 h-6" />}
        color="text-yellow-500"
      />
      <StatsCard
        title="Total Streams"
        value={formatNumber(stats.totalStreams)}
        icon={<Play className="w-6 h-6" />}
        color="text-blue-500"
      />
    </div>
  );
}
