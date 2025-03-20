import React, {
  createContext,
  useContext,
  useState,
  useEffect,
  ReactNode,
} from "react";
import PocketBase, { AsyncAuthStore } from "pocketbase";
import AsyncStorage from "@react-native-async-storage/async-storage";

interface PocketBaseContextProps {
  pb: PocketBase | undefined;
}

const PocketBaseContext = createContext<PocketBaseContextProps>({
  pb: undefined,
});

export const usePocketBase = () => useContext(PocketBaseContext);

interface PocketBaseProviderProps {
  children: ReactNode;
}

export const PocketBaseProvider = ({ children }: PocketBaseProviderProps) => {
  const [pb, setPb] = useState<PocketBase>();

  useEffect(() => {
    const initializePocketBase = async () => {
      const store = new AsyncAuthStore({
        save: async (serialized: string) =>
          AsyncStorage.setItem("pb_auth", serialized),
        initial: (await AsyncStorage.getItem("pb_auth")) || undefined,
        clear: async () => AsyncStorage.removeItem("pb_auth"),
      });

      // TODO: Replace with your actual PocketBase URL
      const pbInstance = new PocketBase(process.env.POCKETBASE_URL, store);
      setPb(pbInstance);
    };

    initializePocketBase();
  }, []);

  return (
    <PocketBaseContext.Provider value={{ pb }}>
      {children}
    </PocketBaseContext.Provider>
  );
};
