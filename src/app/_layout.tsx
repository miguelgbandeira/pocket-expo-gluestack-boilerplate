import { Slot, Stack } from "expo-router";

import "@/global.css";
import { GluestackUIProvider } from "@/src/components/ui/gluestack-ui-provider";
import { AuthProvider } from "../provider/AuthProvider";

export default function RootLayout() {
  return (
    <AuthProvider>
      <GluestackUIProvider mode="light">
        <Slot />
      </GluestackUIProvider>
    </AuthProvider>
  );
}
