import { ThemeProvider } from "@/components/theme-provider";
import LoginPage from "./app/login/page";
import DashboardPage from "./app/dashboard/page";
import { BrowserRouter, Routes, Route } from "react-router";
import { ModeToggle } from "./components/mode-toggle";
import Page404 from "./app/404/page";
import { AuthProvider } from "./contexts/auth-context";
import PrivateRoute from "./components/private-route";
import RedirectPage from "./app/redirect/page";
function App() {
  return (
    <ThemeProvider defaultTheme="dark" storageKey="vite-ui-theme">
      <AuthProvider>
        <BrowserRouter>
          <Routes>
            <Route
              path="/"
              element={
                <PrivateRoute>
                  <DashboardPage />
                </PrivateRoute>
              }
            />
            <Route path="/auth" element={<LoginPage />} />
            <Route path="*" element={<Page404 />} />
            <Route path="/redirect" element={<RedirectPage />} />
          </Routes>
        </BrowserRouter>
      </AuthProvider>
      <div className="fixed bottom-4 right-4">
        <ModeToggle />
      </div>
    </ThemeProvider>
  );
}

export default App;
