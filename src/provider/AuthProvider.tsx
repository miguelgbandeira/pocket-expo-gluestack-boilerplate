import { AppState } from "react-native";
import { useSegments, useRouter, SplashScreen } from "expo-router";
import {
  useState,
  useEffect,
  createContext,
  useContext,
  type PropsWithChildren,
} from "react";
import { UsersRecord } from "@/pocketbase-types";
import { usePocketBase } from "./PocketBaseProvider";

// Add this to prevent auto hide of splash screen

type AuthContextProps = {
  user: UsersRecord | null;
  isLoggedIn: boolean;
  initialized: boolean;
  signIn: (
    email: string,
    password: string
  ) => Promise<{ user?: any; error?: any }>;
  signOut: () => Promise<{ user?: null; error?: any }>;
  createAccount: (params: {
    email: string;
    password: string;
    passwordConfirm: string;
    name?: string;
  }) => Promise<{ user?: any; error?: any }>;
};

export const AuthContext = createContext<AuthContextProps>({
  user: null,
  isLoggedIn: false,
  initialized: false,
  signIn: async () => ({}),
  signOut: async () => ({}),
  createAccount: async () => ({}),
});

export const useAuth = () => useContext(AuthContext);

export function AuthProvider({ children }: PropsWithChildren) {
  const router = useRouter();
  const segments = useSegments();
  const { pb } = usePocketBase();

  const [initialized, setInitialized] = useState<boolean>(false);
  const [isLoggedIn, setIsLoggedIn] = useState<boolean>(false);
  const [user, setUser] = useState<any | null>(null);

  // Initialize auth state
  useEffect(() => {
    const initAuth = async () => {
      if (pb) {
        const isLoggedIn = pb.authStore.isValid;
        setIsLoggedIn(isLoggedIn);
        setUser(isLoggedIn ? pb.authStore.record : null);
        setInitialized(true);
      }
    };

    void initAuth();

    // Set up auth change listeners if PocketBase supports them
    // This would be similar to Supabase's onAuthStateChange

    // PocketBase doesn't have built-in auth change events like Supabase,
    // but you can implement a similar mechanism with your own event system if needed
  }, [pb]);

  // Handle routing based on authentication state
  useEffect(() => {
    if (!initialized) return;

    const inProtectedGroup = segments[0] === "(protected)";
    const inPublicGroup = segments[0] === "(public)";

    if (isLoggedIn && !inProtectedGroup) {
      void (async () => {
        router.replace("/(protected)/(tabs)/home");
      })();
    } else if (!isLoggedIn && !inPublicGroup) {
      router.replace("/(public)/welcome");
    }
  }, [initialized, isLoggedIn, segments]);

  const appSignIn = async (email: string, password: string) => {
    if (!pb) return { error: "PocketBase not initialized" };
    try {
      console.log("signing in");
      const resp = await pb
        .collection("users")
        .authWithPassword(email, password);

      console.log("resp", resp);

      setUser(pb.authStore.isValid ? pb.authStore.record : null);
      setIsLoggedIn(pb.authStore.isValid);

      return { user: resp?.record };
    } catch (e) {
      console.log("error", e);
      return { error: e };
    }
  };

  const appSignOut = async () => {
    if (!pb) return { error: "PocketBase not initialized" };
    try {
      await pb.authStore.clear();
      setUser(null);
      setIsLoggedIn(false);

      return { user: null };
    } catch (e) {
      return { error: e };
    }
  };

  const createAccount = async ({
    email,
    password,
    passwordConfirm,
    name,
  }: {
    email: string;
    password: string;
    passwordConfirm: string;
    name?: string;
  }) => {
    if (!pb) return { error: "PocketBase not initialized" };
    try {
      const resp = await pb.collection("users").create({
        email,
        password,
        passwordConfirm,
        name: name ?? "",
      });
      return { user: resp };
    } catch (e) {
      return { error: e.response };
    }
  };

  if (!initialized) {
    return null;
  }

  return (
    <AuthContext.Provider
      value={{
        user,
        isLoggedIn,
        initialized,
        signIn: appSignIn,
        signOut: appSignOut,
        createAccount,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
}
