import HeaderLeft from "@/components/HeaderLeft";
import { colors } from "@/constants/colors";
import { GlobalProvider } from "@/context/GlobalProvider";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { router, Stack } from "expo-router";
import "../global.css";

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
        <Stack
          screenOptions={{
            headerStyle: {
              backgroundColor: colors.primary,
            },
            headerTintColor: "white",
          }}
        >
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
              headerLeft: () => <HeaderLeft onPress={() => router.back()} />,
            }}
          />

          <Stack.Screen
            name="edit-profile"
            options={{
              title: "Edit Profile",
              headerLeft: () => <HeaderLeft onPress={() => router.back()} />,
            }}
          />
        </Stack>
      </GlobalProvider>
    </QueryClientProvider>
  );
};

export default RootLayout;
