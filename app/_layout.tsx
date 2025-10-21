import { colors } from "@/constants/colors";
import { GlobalProvider } from "@/context/GlobalProvider";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { Stack } from "expo-router";
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
          {/* LOGIN ROUTE */}
          <Stack.Screen
            name="index"
            options={{
              headerShown: false,
            }}
          />

          {/* (MAIN) ROUTE */}
          <Stack.Screen
            name="(main)"
            options={{
              headerShown: false,
            }}
          />

          {/* CUSTOMIZED ROUTE */}
          <Stack.Screen
            name="customized"
            options={{
              headerShown: false,
            }}
          />

          {/* BOOKING ROUTE */}
          <Stack.Screen
            name="booking"
            options={{
              headerShown: false,
            }}
          />

          {/* CHANGE PASSWORD ROUTE */}
          <Stack.Screen
            name="change-password"
            options={{
              title: "Change Password",
              headerBackTitle: "Back",
            }}
          />

          {/* EDIT PROFILE ROUTE */}
          <Stack.Screen
            name="edit-profile"
            options={{
              title: "Edit Profile",
              headerBackTitle: "Back",
            }}
          />
        </Stack>
      </GlobalProvider>
    </QueryClientProvider>
  );
};

export default RootLayout;
