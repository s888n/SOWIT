// this is the github redirect page

import { useEffect } from "react";
import { useNavigate, useSearchParams } from "react-router";
import { useAuth } from "@/contexts/auth-context";
import { API_URL } from "@/lib/constants";

export default function RedirectPage() {
  const navigate = useNavigate();
  const { setAuth } = useAuth();
  const [searchParams] = useSearchParams();

  useEffect(() => {
    const code = searchParams.get("code");
    if (code) {
      const login = async () => {
        try {
          const response = await fetch(`${API_URL}/github/`, {
            method: "POST",
            credentials: "include",
            headers: {
              "Content-Type": "application/json",
            },
            body: JSON.stringify({ code }),
          });
          if (response.ok) {
            const data = await response.json();
            console.log("login data : ", data);
            setAuth({ user: data, loading: false });
            navigate("/");
          } else {
            throw new Error("Failed to authenticate");
          }
        } catch (error) {
          setAuth({ user: null, loading: false });
          console.error(error);
        }
      };

      login();
    }
  }, [searchParams, navigate, setAuth]);

  return null;
}
