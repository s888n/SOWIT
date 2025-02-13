
import Logo  from "@/assets/Logo.png"
import { useTheme } from "@/components/theme-provider"
import LogoDark from "@/assets/LogoDark.png"
import { LoginForm } from "@/components/login-form"
import { SignupForm } from "@/components/signup-form"
import { useState } from "react"
// import { ModeToggle } from "@/components/mode-toggle"
import { LoginScene } from "@/components/login-scene"
export default function LoginPage() {
  const { theme } = useTheme()
  const [isLogin, setIsLogin] = useState(true)
  return (
    <div className="grid min-h-svh lg:grid-cols-2">
      <div className="relative hidden bg-muted lg:block border-4">
        <LoginScene />
        {/* <div className="absolute top-4 right-4">
          <ModeToggle /> */}
      </div>
      <div className="flex flex-col gap-4 p-6 md:p-10">
        <div className="flex justify-center gap-2 md:justify-start">
          <a href="#" className="flex items-center gap-2 font-medium">
            <div className="flex w-40 items-center justify-center rounded-md  text-primary-foreground">
              <img src={
                theme === "dark" ? LogoDark : Logo
              } alt="Logo" className="h-8 " />
            </div>
          </a>
        </div>
        <div className="flex flex-1 items-center justify-center">
          <div className="w-full max-w-xs">
            {
              isLogin ? (
                <LoginForm setIsLogin={setIsLogin} />
              ) : (
                <SignupForm setIsLogin={setIsLogin} />
              )
            }
          </div>
        </div>
      </div>
    </div>
  )
}
