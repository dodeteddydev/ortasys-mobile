import { router, Stack } from "expo-router";
import "../global.css";
import { GlobalProvider } from "@/context/GlobalProvider";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { TouchableOpacity } from "react-native";
import MaterialIcons from "@expo/vector-icons/MaterialIcons";

const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      retry: 3,
      refetchOnWindowFocus: false,
    },
  },
});

const RootLayout = () => {
  return (
    <QueryClientProvider client={queryClient}>
      <GlobalProvider>
        <Stack>
          <Stack.Screen
            name="index"
            options={{
              headerShown: false,
            }}
          />

          <Stack.Screen
            name="(main)"
            options={{
              headerShown: false,
            }}
          />

          <Stack.Screen
            name="change-password"
            options={{
              title: "Change Password",
              headerTitleAlign: "center",
              headerLeft: () => (
                <TouchableOpacity
                  activeOpacity={0.8}
                  onPress={() => router.back()}
                >
                  <MaterialIcons
                    name="arrow-back-ios"
                    size={24}
                    color="black"
                  />
                </TouchableOpacity>
              ),
            }}
          />

          <Stack.Screen
            name="edit-profile"
            options={{
              title: "Edit Profile",
              headerTitleAlign: "center",
              headerLeft: () => (
                <TouchableOpacity
                  activeOpacity={0.8}
                  onPress={() => router.back()}
                >
                  <MaterialIcons
                    name="arrow-back-ios"
                    size={24}
                    color="black"
                  />
                </TouchableOpacity>
              ),
            }}
          />
        </Stack>
      </GlobalProvider>
    </QueryClientProvider>
  );
};

export default RootLayout;
