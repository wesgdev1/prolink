import { AuthContext } from "./AuthContext";
import { clearSession, getSession } from "../../api/sessions";
import { useEffect, useState } from "react";

export const AuthProvider = ({ children }) => {
  const [authState, setAuthState] = useState({});
  const [initComplete, setInitComplete] = useState(false);

  const init = async () => {
    const json = localStorage.getItem("user");
    if (json) {
      const user = JSON.parse(json);
      setAuthState({ user });
    }
  };

  const cambiarImagen = (imagen) => {
    const user = { ...authState.user, urlFoto: imagen };
    setAuthState({ user });
    localStorage.setItem("user", JSON.stringify(user));
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
    const initialize = async () => {
      await init();
      setInitComplete(true);
    };

    initialize();
  }, []);

  if (!initComplete) {
    return null;
  }

  return (
    <AuthContext.Provider
      value={{
        ...authState,
        setAuthState,
        login,
        logout,
        cambiarImagen,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};
