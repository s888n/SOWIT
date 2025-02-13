import { ThemeProvider } from "@/components/theme-provider"
import LoginPage from "./app/login/page"
import DashboardPage from "./app/dashboard/page";
import { BrowserRouter, Routes, Route } from "react-router";
import { ModeToggle } from "./components/mode-toggle";


function App() {
  return (
    <ThemeProvider defaultTheme="dark" storageKey="vite-ui-theme">
      <BrowserRouter>
        <Routes>
          <Route path="/auth" element={<LoginPage />} />
          <Route path="/" element={<DashboardPage />} />
        </Routes>
      </BrowserRouter>
      {/* place the mode toggle in the bottom right */}
      <div className="fixed bottom-4 right-4">
        <ModeToggle />
      </div>
    </ThemeProvider>
  )
}

export default App

