import React from "react";
import { VStack } from "./ui/vstack";
import { StatusBar } from "expo-status-bar";
import { SafeAreaView, ScrollView } from "react-native";
import { Box } from "./ui/box";

type GuestLayoutProps = {
  children: React.ReactNode;
};

export default function GuestLayout(props: GuestLayoutProps) {
  return (
    <SafeAreaView
      className={"flex-1 bg-background-light dark:bg-background-dark"}
      style={{ flex: 1 }}
    >
      <Box className={"h-full flex-1 flex"}>
        <StatusBar translucent style="auto" />
        <ScrollView
          className={"flex-1 "}
          contentContainerStyle={{
            alignItems: "center",
            flexGrow: 1,
            justifyContent: "center",
          }}
          bounces={false}
        >
          <VStack className={"w-full flex-1 overflow-hidden"}>
            {props.children}
          </VStack>
        </ScrollView>
      </Box>
    </SafeAreaView>
  );
}
