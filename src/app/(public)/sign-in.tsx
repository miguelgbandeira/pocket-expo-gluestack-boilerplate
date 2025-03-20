import { View, Text, TextInput, TouchableOpacity } from "react-native";
import React, { useState } from "react";
import GuestLayout from "@/src/components/GuestLayout";
import { useAuth } from "@/src/provider/AuthProvider";

export default function SignIn() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const { signIn } = useAuth();

  const handleSubmit = async () => {
    try {
      const { user, error } = await signIn(email, password);
      console.log("User:", user);
      if (error) {
        // Handle error here
        console.error("Sign in error:", error);
      }
    } catch (e) {
      console.error("Unexpected error:", e);
    }
  };

  return (
    <GuestLayout>
      <View style={{ padding: 20 }}>
        <Text style={{ fontSize: 24, marginBottom: 20 }}>Sign In</Text>

        <View style={{ marginBottom: 16 }}>
          <Text>Email</Text>
          <TextInput
            value={email}
            onChangeText={setEmail}
            placeholder="Enter your email"
            keyboardType="email-address"
            autoCapitalize="none"
            style={{
              borderWidth: 1,
              borderColor: "#ccc",
              padding: 10,
              borderRadius: 5,
              marginTop: 5,
            }}
          />
        </View>

        <View style={{ marginBottom: 16 }}>
          <Text>Password</Text>
          <TextInput
            value={password}
            onChangeText={setPassword}
            placeholder="Enter your password"
            secureTextEntry
            style={{
              borderWidth: 1,
              borderColor: "#ccc",
              padding: 10,
              borderRadius: 5,
              marginTop: 5,
            }}
          />
        </View>

        <TouchableOpacity
          onPress={handleSubmit}
          style={{
            backgroundColor: "#007AFF",
            padding: 15,
            borderRadius: 5,
            alignItems: "center",
          }}
        >
          <Text style={{ color: "white", fontWeight: "bold" }}>Sign In</Text>
        </TouchableOpacity>
      </View>
    </GuestLayout>
  );
}

// import React from "react";
// import { Link as ExpoLink } from "expo-router";

// import { Platform, type ImageSourcePropType } from "react-native";
// import SignInForm from "../../components/sign-in/SignInForm";
// import AuthButton from "../../components/auth/AuthButton";
// import GuestLayout from "@/src/components/GuestLayout";
// import { Center } from "@/src/components/ui/center";
// import { Heading } from "@/src/components/ui/heading";
// import { LinkText } from "@/src/components/ui/link";
// import { VStack } from "@/src/components/ui/vstack";
// import { Image } from "@/src/components/ui/image";
// import { Text } from "@/src/components/ui/text";

// const SignIn = () => {
//   return (
//     <GuestLayout>
//       <VStack className={"py-12 px-4 flex-1"}>
//         <Center className={"mb-8"}>
//           <Image
//             size="md"
//             source={
//               require("../../assets/images/logo.png") as ImageSourcePropType
//             }
//             alt="image"
//           />
//         </Center>
//         <Heading className={"text-3xl text-center mb-8"}>Sign in</Heading>
//         <SignInForm />
//         <Text className="text-center mt-auto">
//           Don&apos;t have an account?{" "}
//           <ExpoLink href="/sign-up">
//             <LinkText className="text-primary-500 underline">Sign up</LinkText>
//           </ExpoLink>
//         </Text>
//       </VStack>
//     </GuestLayout>
//   );
// };

// export default SignIn;
