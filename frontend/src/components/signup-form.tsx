import { useState } from "react";
import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { GithubButton } from "./github-button";
import { useAuth } from "@/contexts/auth-context";
import { useNavigate } from "react-router";
import { API_URL } from "@/lib/constants";
export function SignupForm({
  className,
  setIsLogin,
  ...props
}: React.ComponentPropsWithoutRef<"form"> & {
  setIsLogin: (value: boolean) => void;
}) {
  const navigate = useNavigate();
  const { setAuth } = useAuth();
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [password2, setPassword2] = useState("");
  const [error, setError] = useState<string | null>(null);
  const handleSubmit = async (e: any) => {
    e.preventDefault();
    setError(null);
    try {
      const response = await fetch(`${API_URL}/register/`, {
        method: "POST",
        credentials: "include",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ username, password, password2 }),
      });

      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.message || "Login failed");
      }
      const data = await response.json();
      console.log("register data : ", data);
      setAuth({ user: data, loading: false });
      navigate("/");
    } catch (err: any) {
      setAuth({ user: null, loading: false });
      setError(err.message);
    }
  };
  return (
    <form
      className={cn("flex flex-col gap-6", className)}
      {...props}
      onSubmit={handleSubmit}
    >
      <div className="flex flex-col items-center gap-2 text-center">
        <h1 className="text-2xl font-bold">Register</h1>
      </div>
      <div className="grid gap-6">
        <div className="grid gap-2">
          <Label htmlFor="username">Username</Label>
          <Input
            id="username"
            type="text"
            // placeholder="Enter your username"
            required
            value={username}
            onChange={(e) => setUsername(e.target.value)}
          />
        </div>
        <div className="grid gap-2">
          <div className="flex items-center">
            <Label htmlFor="password">Password</Label>
          </div>
          <Input
            id="password"
            type="password"
            required
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
        </div>
        <div className="grid gap-2">
          <div className="flex items-center">
            <Label htmlFor="password2">Confirm Password</Label>
          </div>
          <Input
            id="password2"
            type="password"
            required
            value={password2}
            onChange={(e) => setPassword2(e.target.value)}
          />
        </div>
        <Button type="submit" className="w-full">
          Register
        </Button>
      </div>
      <div className="relative text-center text-sm after:absolute after:inset-0 after:top-1/2 after:z-0 after:flex after:items-center after:border-t after:border-border">
        <span className="relative z-10 bg-background px-2 text-muted-foreground">
          Or continue with
        </span>
      </div>
      <GithubButton />
      <div className="text-center text-sm">
        you have an account?{" "}
        <button
          type="button"
          onClick={() => setIsLogin(true)}
          className="underline underline-offset-4"
        >
          Login
        </button>
      </div>
      <div className="text-center text-sm">
        {error && (
          <div className="text-red-500 text-sm text-center">{error}</div>
        )}
      </div>
    </form>
  );
}
