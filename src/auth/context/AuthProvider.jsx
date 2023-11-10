import { AuthContext } from "./AuthContext";
import { clearSession, getSession } from "../../api/sessions";
import { useEffect, useState } from "react";

export const AuthProvider = ({ children }) => {
  const [authState, setAuthState] = useState({});

  const init = async () => {
    const json = localStorage.getItem("user");
    if (json) {
      const user = JSON.parse(json);
      setAuthState({ user });
    }
  };

  const login = (payload) => {
    localStorage.setItem("user", JSON.stringify(payload));
    init();
  };

  const logout = () => {
    setAuthState({});
    localStorage.clear();
  };

  useEffect(() => {
    init();
  }, []);

  return (
    <AuthContext.Provider
      value={{
        ...authState,
        setAuthState,
        login,
        logout,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};
