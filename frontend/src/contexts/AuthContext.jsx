import React, { createContext, useContext, useEffect, useState } from "react";
import * as authService from "../utils/authService";

const AuthContext = createContext();

export function AuthProvider({ children }) {
  const [user, setUser] = useState(null);
  const [userProfile, setUserProfile] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const init = async () => {
      const session = await authService.getSession();
      if (session.success) {
        setUser(session.user);
        const profile = await authService.getUserProfile(session.user.id);
        if (profile.success) setUserProfile(profile.data);
      }
      setLoading(false);
    };
    init();
  }, []);

  const signIn = async (email, password) => {
    const result = await authService.signIn(email, password);
    if (result.success) {
      setUser(result.user);
      setUserProfile({
        full_name: result.user.email.split("@")[0],
        role: result.user.role,
      });
    }
    return result;
  };

  const signUp = async (email, password, userData) => {
    const result = await authService.signUp(email, password, userData);
    if (result.success) {
      setUser(result.user);
      setUserProfile({ full_name: userData.fullName, role: "user" });
    }
    return result;
  };

  const signOut = async () => {
    await authService.signOut();
    setUser(null);
    setUserProfile(null);
  };

  return (
    <AuthContext.Provider
      value={{
        user,
        userProfile,
        loading,
        signIn,
        signUp,
        signOut,
        updateProfile: () => {},
        resetPassword: () => {},
        clearError: () => {},
      }}
    >
      {children}
    </AuthContext.Provider>
  );
}

export const useAuth = () => useContext(AuthContext);
export default AuthContext;
