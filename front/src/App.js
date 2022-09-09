import { Suspense, useEffect, useMemo } from "react";
import "./App.css";
import useSWR, { SWRConfig } from "swr";
import { fetcher } from "./services";
import Rutas from "./pages/Rutas";
import { Spin } from "antd";
import { BrowserRouter, matchPath } from "react-router-dom";
import { AuthProvider } from "./context/useContext";
import { UserInfo } from "./models";
import { useState } from "react";

function localStorageProvider() {
  const map = new Map(JSON.parse(localStorage.getItem("data-cache") || "[]"));

  window.addEventListener("beforeunload", () => {
    const appCache = JSON.stringify(Array.from(map.entries()));
    localStorage.setItem("data-cache", appCache);
  });

  return map;
}

const App = () => {
  const [user, setUser] = useState(null);

  useEffect(() => {
    let data = localStorage.getItem("data-user");
    data = JSON.parse(data || JSON.stringify(UserInfo));
    setUser(data);
  }, []);

  if (!user) return <Spin />;
  return (
    <SWRConfig
      value={{
        provider: localStorageProvider,
        suspense: true,
        // fetcher: fetcher,
      }}
    >
      {user && (
        <AuthProvider user={user}>
          <BrowserRouter>
            <Rutas />
          </BrowserRouter>
        </AuthProvider>
      )}
    </SWRConfig>
  );
};

export default App;
