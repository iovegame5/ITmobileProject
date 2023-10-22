import React, { createContext, useContext, useReducer, useEffect } from "react";
import loadUserData from "./LoadUserData";
import firebase from "../database/firebase";
// Define the initial state
const initialState = {
  user: null,
  role: null,
  isAuthenticated: false,
};

// Create the context
const AuthContext = createContext(initialState);

// Define a reducer to handle authentication actions
const authReducer = (state, action) => {
  switch (action.type) {
    case "LOGIN":
      return {
        ...state,
        user: action.user,
        role: action.role,
        isAuthenticated: true,
      };
    case "LOGOUT":
      return {
        ...state,
        user: null,
        role: null,
        isAuthenticated: false,
      };
    default:
      return state;
  }
};

// Create an AuthProvider component to wrap your app
export const AuthProvider = ({ children }) => {
  const [state, dispatch] = useReducer(authReducer, initialState);

  // You can load user data from storage or Firebase on app startup and dispatch a LOGIN action

  useEffect(() => {
    // Example: Load user data from storage or Firebase
    const loadUserDataAsync = async () => {
      const userData = await loadUserData(); // Wait for the asynchronous function to complete
      console.log("userDataOnAuth", userData);
      if (userData) {
        dispatch({ type: "LOGIN", user: userData.user, role: userData.role });
      }
    };

    loadUserDataAsync();
  }, []);

  return (
    <AuthContext.Provider value={{ state, dispatch }}>
      {children}
    </AuthContext.Provider>
  );
};

// Create a custom hook to access the context
export const useAuth = () => {
  const { state, dispatch } = useContext(AuthContext);

  const logout = () => {
    // You may want to add a Firebase sign-out call here if you're using Firebase
    // For example:
    firebase
      .auth()
      .signOut()
      .then(() => {
        dispatch({ type: "LOGOUT" });
      })
      .catch((error) => {
        console.error("Logout error: ", error);
      });

    // For simplicity, we're just dispatching the 'LOGOUT' action without signing out
    //   dispatch({ type: 'LOGOUT' });
  };
  const login = (email, password) => {
    return firebase
      .auth()
      .signInWithEmailAndPassword(email, password)
      .then(async (userCredential) => {
        const userData = await loadUserData();
        if (userData) {
          dispatch({ type: 'LOGIN', user: userData.user, role: userData.role });
        }
        return null; // No error, successful login
      })
      .catch((error) => {
        throw error; // Throw the error
      });
  };

  return {
    user: state.user,
    role: state.role,
    isAuthenticated: state.isAuthenticated,
    login,
    logout,
  };
};
