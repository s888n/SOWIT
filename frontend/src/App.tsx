import { ThemeProvider } from "@/components/theme-provider"
import LoginPage from "./app/login/page"
import DashboardPage from "./app/dashboard/page";
import { BrowserRouter, Routes, Route } from "react-router";
import { ModeToggle } from "./components/mode-toggle";
import Page404 from "./app/404/page";

function App() {
  return (
    <ThemeProvider defaultTheme="dark" storageKey="vite-ui-theme">
      <BrowserRouter>
        <Routes>
          <Route path="/auth" element={<LoginPage />} title="SOWIT" />
          <Route path="/" element={<DashboardPage />} />
          <Route path="*" element={<Page404 />} />
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

