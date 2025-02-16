import { Button } from "@/components/ui/button";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { useTheme } from "./theme-provider";
import Logo from "@/assets/Logo.png";
import LogoDark from "@/assets/LogoDark.png";
import { getUser } from "@/api/api";
import { useEffect, useState } from "react";
interface HeaderProps {
  username: string | null;
  avatar: string | null;
}
const BASE_URL = import.meta.env.VITE_API_URL as string;
import { useAuth } from "@/contexts/auth-context";
export function Header() {
  const { logoutUser } = useAuth();
  const { theme } = useTheme();
  const [user, setUser] = useState<HeaderProps>({ username: null, avatar: null });
  useEffect(() => {
    getUser().then((data) => {
      setUser(data);
    });
  }, []);
  const { username, avatar } = user;
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
          <AvatarFallback>{username ? username.slice(0, 1).toUpperCase() : ''}</AvatarFallback>
        </Avatar>
        <Button variant="outline" onClick={() => logoutUser()}>
          Log out
        </Button>
      </div>
    </header>
  );
}
