import { Link, useLocation } from "wouter";
import { useAuth } from "@/lib/auth";
import { Button } from "@/components/ui/button";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import { Music, Home, Upload, BarChart3, DollarSign, Settings, LogOut, Menu } from "lucide-react";
import { useState } from "react";
import { cn } from "@/lib/utils";

const navigation = [
  { name: "Dashboard", href: "/dashboard", icon: Home },
  { name: "Upload Track", href: "/upload", icon: Upload },
  { name: "Analytics", href: "#", icon: BarChart3 },
  { name: "Earnings", href: "#", icon: DollarSign },
  { name: "Settings", href: "#", icon: Settings },
];

export function Sidebar({ className }: { className?: string }) {
  const [location] = useLocation();
  const { user, logout } = useAuth();
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  return (
    <>
      {/* Mobile menu button */}
      <div className="lg:hidden fixed top-4 left-4 z-50">
        <Button 
          variant="outline" 
          size="icon"
          onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
          data-testid="button-mobile-menu"
        >
          <Menu className="h-4 w-4" />
        </Button>
      </div>

      {/* Sidebar */}
      <div className={cn(
        "fixed inset-y-0 left-0 w-64 bg-sidebar border-r border-sidebar-border transform transition-transform duration-200 ease-in-out z-40",
        "lg:translate-x-0",
        isMobileMenuOpen ? "translate-x-0" : "-translate-x-full",
        className
      )}>
        <div className="flex flex-col h-full">
          {/* Logo */}
          <div className="flex items-center px-6 py-4 border-b border-sidebar-border">
            <Music className="text-2xl text-sidebar-primary mr-3 w-8 h-8" />
            <h1 className="text-xl font-bold text-sidebar-foreground">LabelLift</h1>
          </div>
          
          {/* Navigation */}
          <nav className="flex-1 px-4 py-6 space-y-2">
            {navigation.map((item) => {
              const isActive = location === item.href;
              const Icon = item.icon;
              
              return (
                <Link key={item.name} href={item.href}>
                  <Button
                    variant={isActive ? "secondary" : "ghost"}
                    className={cn(
                      "w-full justify-start text-sm font-medium",
                      isActive 
                        ? "bg-sidebar-accent text-sidebar-accent-foreground" 
                        : "text-sidebar-foreground hover:bg-sidebar-accent hover:text-sidebar-accent-foreground"
                    )}
                    data-testid={`nav-${item.name.toLowerCase().replace(" ", "-")}`}
                    onClick={() => setIsMobileMenuOpen(false)}
                  >
                    <Icon className="mr-3 h-4 w-4" />
                    {item.name}
                  </Button>
                </Link>
              );
            })}
          </nav>
          
          {/* User Profile */}
          <div className="p-4 border-t border-sidebar-border">
            <div className="flex items-center">
              <Avatar className="w-8 h-8">
                <AvatarFallback className="bg-sidebar-primary text-sidebar-primary-foreground text-sm">
                  {user?.name?.split(" ").map(n => n[0]).join("") || "U"}
                </AvatarFallback>
              </Avatar>
              <div className="ml-3 flex-1">
                <p className="text-sm font-medium text-sidebar-foreground">{user?.name || "User"}</p>
                <p className="text-xs text-muted-foreground">Artist</p>
              </div>
              <Button 
                variant="ghost" 
                size="icon"
                onClick={logout}
                className="text-sidebar-foreground hover:text-sidebar-accent-foreground"
                data-testid="button-logout"
              >
                <LogOut className="h-4 w-4" />
              </Button>
            </div>
          </div>
        </div>
      </div>

      {/* Mobile backdrop */}
      {isMobileMenuOpen && (
        <div 
          className="lg:hidden fixed inset-0 bg-black bg-opacity-50 z-30"
          onClick={() => setIsMobileMenuOpen(false)}
        />
      )}
    </>
  );
}
