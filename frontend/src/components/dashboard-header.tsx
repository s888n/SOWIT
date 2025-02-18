import { Button } from "@/components/ui/button";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { useTheme } from "./theme-provider";
import Logo from "@/assets/Logo.png";
import LogoDark from "@/assets/LogoDark.png";
import { API_URL } from "@/lib/constants";
import { useAuth } from "@/contexts/auth-context";
import { useNavigate } from "react-router";
const BASE_URL = API_URL.replace("/api", "");

interface HeaderProps {
  username: string;
  avatar: string;
}
export function Header({ username, avatar }: HeaderProps) {
  const { theme } = useTheme();
  const { setAuth } = useAuth();
  const navigate = useNavigate();

  const handleLogout = async (e: any) => {
    e.preventDefault();
    try {
      const response = await fetch(`${API_URL}/logout/`, {
        method: "POST",
        credentials: "include",
      });

      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.message || "Logout failed");
      }
      const data = await response.json();
      console.log(data);
      setAuth({ user: null, loading: false });
      navigate("/auth");
    } catch (err: any) {
      console.error(err);
    }
  };
  return (
    <header className="flex items-center justify-between px-6 py-4  border-b z-10">
      <div className="flex items-center">
        <img
          src={theme === "dark" ? LogoDark : Logo}
          alt="SOWIT Logo"
          width={120}
          height={40}
        />
      </div>
      <div className="flex items-center space-x-4">
        <span className="text-sm font-medium">Hi, {username}</span>
        <Avatar>
          <AvatarImage
            src={avatar ? `${BASE_URL}${avatar}` : undefined}
            alt={`${username}'s avatar`}
          />
          <AvatarFallback>
            {username ? username[0].toUpperCase() : "You"}
          </AvatarFallback>
        </Avatar>
        <Button variant="outline" onClick={handleLogout}>
          Log out
        </Button>
      </div>
    </header>
  );
}
