import React from "react";

export const useAuth0 = () => ({
  isAuthenticated: true,
  user: {
    email: "test@example.com",
    given_name: "Test",
    family_name: "User",
  },
  isLoading: false,
});
