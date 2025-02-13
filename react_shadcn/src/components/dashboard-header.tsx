import { Button } from "@/components/ui/button";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { useTheme } from "./theme-provider";
import Logo from "@/assets/Logo.png";
import LogoDark from "@/assets/LogoDark.png";
interface HeaderProps {
  username: string;
}

export function Header({ username }: HeaderProps) {
  const { theme } = useTheme();
  return (
    <header className="flex items-center justify-between px-6 py-4  border-b">
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
          <AvatarImage src="/avatar.png" alt={`${username}'s avatar`} />
          <AvatarFallback>{username.slice(0, 1).toUpperCase()}</AvatarFallback>
        </Avatar>
        <Button variant="outline">Log out</Button>
      </div>
    </header>
  );
}
