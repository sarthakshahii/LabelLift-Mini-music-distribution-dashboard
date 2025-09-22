import { useState } from "react";
import { useAuth } from "@/lib/auth";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Card, CardContent } from "@/components/ui/card";
import { Checkbox } from "@/components/ui/checkbox";
import { useToast } from "@/hooks/use-toast";
import { Music } from "lucide-react";
import { Link, useLocation } from "wouter";
import { useEffect } from "react";

export default function Login() {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const { login, isAuthenticated } = useAuth();
  const { toast } = useToast();
  const [, setLocation] = useLocation();

  useEffect(() => {
    if (isAuthenticated) {
      setLocation("/dashboard");
    }
  }, [isAuthenticated, setLocation]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);

    const result = await login({ username, password });

    if (!result.success) {
      toast({
        title: "Login Failed",
        description: result.message || "Invalid credentials",
        variant: "destructive",
      });
    }

    setIsLoading(false);
  };

  return (
    <div className="min-h-screen flex">
      {/* Left Section - Branding */}
      <div className="hidden lg:flex lg:w-1/2 gradient-bg relative">
        <div className="flex flex-col justify-center items-center w-full p-12 text-primary-foreground">
          {/* Background pattern */}
          <div className="absolute inset-0 opacity-10">
            <div 
              className="w-full h-full" 
              style={{
                backgroundImage: "radial-gradient(circle at 25% 25%, white 2px, transparent 2px), radial-gradient(circle at 75% 75%, white 2px, transparent 2px)",
                backgroundSize: "50px 50px"
              }}
            />
          </div>
          <div className="relative z-10 text-center">
            <div className="mb-8">
              <Music className="mx-auto text-6xl mb-4 w-16 h-16" />
              <h1 className="text-4xl font-bold mb-4">LabelLift</h1>
              <p className="text-xl opacity-90">Your white-label music distribution platform</p>
            </div>
            <div className="max-w-md">
              <h2 className="text-2xl font-semibold mb-4">Distribute Your Music Globally</h2>
              <p className="opacity-80 leading-relaxed">
                Upload, manage, and distribute your tracks to all major streaming platforms. 
                Professional tools for independent artists and labels.
              </p>
            </div>
          </div>
        </div>
      </div>
      
      {/* Right Section - Login Form */}
      <div className="w-full lg:w-1/2 flex items-center justify-center p-8">
        <div className="w-full max-w-md">
          {/* Mobile Logo */}
          <div className="lg:hidden text-center mb-8">
            <Music className="mx-auto text-4xl text-primary mb-3 w-10 h-10" />
            <h1 className="text-2xl font-bold">LabelLift</h1>
          </div>
          
          <Card className="shadow-sm">
            <CardContent className="pt-6 p-8">
              <div className="text-center mb-8">
                <h2 className="text-2xl font-bold text-card-foreground mb-2">Welcome Back</h2>
                <p className="text-muted-foreground">Sign in to your distribution dashboard</p>
              </div>
              
              <form className="space-y-6" onSubmit={handleSubmit}>
                <div>
                  <Label htmlFor="username" className="block text-sm font-medium text-card-foreground mb-2">
                    Username
                  </Label>
                  <Input 
                    type="text" 
                    id="username" 
                    name="username"
                    value={username}
                    onChange={(e) => setUsername(e.target.value)}
                    placeholder="Enter your username"
                    data-testid="input-username"
                    required
                  />
                </div>
                
                <div>
                  <Label htmlFor="password" className="block text-sm font-medium text-card-foreground mb-2">
                    Password
                  </Label>
                  <Input 
                    type="password" 
                    id="password" 
                    name="password"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    placeholder="Enter your password"
                    data-testid="input-password"
                    required
                  />
                </div>
                
                <div className="flex items-center justify-between">
                  <div className="flex items-center space-x-2">
                    <Checkbox id="remember" />
                    <Label htmlFor="remember" className="text-sm text-muted-foreground">
                      Remember me
                    </Label>
                  </div>
                  <Link href="#" className="text-sm text-primary hover:underline">
                    Forgot password?
                  </Link>
                </div>
                
                <Button 
                  type="submit" 
                  className="w-full"
                  disabled={isLoading}
                  data-testid="button-login"
                >
                  {isLoading ? "Signing in..." : "Sign In"}
                </Button>
              </form>
              
              <div className="mt-6 text-center">
                <p className="text-sm text-muted-foreground">
                  Don't have an account? {" "}
                  <Link href="#" className="text-primary hover:underline font-medium">
                    Contact Sales
                  </Link>
                </p>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
}
