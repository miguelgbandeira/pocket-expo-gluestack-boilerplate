import { Stack } from "expo-router";
import { Text } from "@/src/components/ui/text";
import React from "react";

export default function NotFoundScreen() {
  return (
    <React.Fragment>
      <Stack.Screen options={{ title: "Oops!" }} />
      <Text>Not found</Text>
    </React.Fragment>
  );
}
