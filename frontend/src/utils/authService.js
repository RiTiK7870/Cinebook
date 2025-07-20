import api from "./api";

export const signIn = async (email, password) => {
  // This is a mock - implement real backend auth or JWT
  if (email === "customer@example.com" && password === "customer123") {
    return { success: true, user: { email, role: "user" } };
  }
  if (email === "admin@cinebook.com" && password === "admin123") {
    return { success: true, user: { email, role: "admin" } };
  }
  return { success: false, error: "Invalid credentials" };
};

export const signUp = async (email, password, userData) => {
  return { success: true, user: { email, ...userData } };
};

export const signOut = async () => {
  return { success: true };
};

export const getSession = async () => {
  return { success: false };
};

export const getUserProfile = async (userId) => {
  return { success: true, data: { full_name: "Demo User", role: "user" } };
};

export const updateUserProfile = async (userId, updates) => {
  return { success: true, data: { ...updates } };
};

export const resetPassword = async (email) => {
  return { success: true };
};

export const onAuthStateChange = () => {
  return { data: { subscription: { unsubscribe: () => {} } } };
};
