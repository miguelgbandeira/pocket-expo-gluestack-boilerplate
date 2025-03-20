import { Slot, Stack } from "expo-router";

import "@/global.css";
import { GluestackUIProvider } from "@/src/components/ui/gluestack-ui-provider";
import { AuthProvider } from "../provider/AuthProvider";
import { PocketBaseProvider } from "../provider/PocketBaseProvider";

export default function RootLayout() {
  return (
    <PocketBaseProvider>
      <AuthProvider>
        <GluestackUIProvider mode="light">
          <Slot />
        </GluestackUIProvider>
      </AuthProvider>
    </PocketBaseProvider>
  );
}
