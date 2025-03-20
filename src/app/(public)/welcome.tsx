import GuestLayout from "@/src/components/GuestLayout";
import { Button, ButtonText } from "@/src/components/ui/button";
import { Center } from "@/src/components/ui/center";
import { Heading } from "@/src/components/ui/heading";
import { VStack } from "@/src/components/ui/vstack";
import { Image } from "@/src/components/ui/image";
import { router } from "expo-router";
import React from "react";
import { type ImageSourcePropType } from "react-native";

const Welcome = () => {
  return (
    <GuestLayout>
      <VStack className="py-12 px-4 flex-1 justify-between items-center">
        <Center className="mb-8 mt-32">
          <Image
            size="md"
            source={
              require("@/assets/images/react-logo.png") as ImageSourcePropType
            }
            alt="image"
            className="mb-8 padding-4"
          />
          <Heading className="text-3xl text-center">Welcome to Sushi!</Heading>
        </Center>

        <VStack space="md" className="w-full max-w-sm">
          <Button
            size="lg"
            onPress={() => {
              router.push("/sign-in");
            }}
            variant="solid"
            className="flex-1 w-full"
          >
            <ButtonText>Sign In</ButtonText>
          </Button>

          <Button
            size="lg"
            onPress={() => {
              router.push("/sign-up");
            }}
            variant="solid"
            className="flex-1 w-full"
          >
            <ButtonText>Sign Up</ButtonText>
          </Button>
        </VStack>
      </VStack>
    </GuestLayout>
  );
};

export default Welcome;
