import { Button } from "@/components/ui/button";
import { Bell, Sun, Moon } from "lucide-react";
import { useTheme } from "next-themes";

interface HeaderProps {
  title: string;
  subtitle?: string;
}

export function Header({ title, subtitle }: HeaderProps) {
  const { theme, setTheme } = useTheme();

  return (
    <header className="bg-card border-b border-border px-6 py-4">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold text-card-foreground">{title}</h1>
          {subtitle && <p className="text-muted-foreground">{subtitle}</p>}
        </div>
        <div className="flex items-center space-x-4">
          <Button 
            variant="ghost" 
            size="icon"
            className="relative"
            data-testid="button-notifications"
          >
            <Bell className="h-4 w-4" />
            <span className="absolute -top-1 -right-1 w-3 h-3 bg-destructive rounded-full" />
          </Button>
          <Button 
            variant="ghost" 
            size="icon"
            onClick={() => setTheme(theme === "dark" ? "light" : "dark")}
            data-testid="button-theme-toggle"
          >
            {theme === "dark" ? <Sun className="h-4 w-4" /> : <Moon className="h-4 w-4" />}
          </Button>
        </div>
      </div>
    </header>
  );
}
