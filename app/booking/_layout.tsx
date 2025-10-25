import { colors } from "@/constants/colors";
import { MaterialCommunityIcons } from "@expo/vector-icons";
import { router, Stack } from "expo-router";
import { Platform, Text, TouchableOpacity, View } from "react-native";

const BookingLayout = () => {
  return (
    <Stack
      screenOptions={{
        headerStyle: {
          backgroundColor: colors.primary,
        },
        headerTintColor: "white",
      }}
    >
      {/* SEARCH BOOKING ROUTE */}
      <Stack.Screen
        name="search"
        options={{
          title: "Booking",
          headerBackTitle: "Back",
          headerTitleAlign: "center",
          headerLeft: () => (
            <TouchableOpacity activeOpacity={0.8} onPress={() => router.back()}>
              {Platform.OS === "ios" ? (
                <Text className="text-white text-xl">Back</Text>
              ) : (
                <MaterialCommunityIcons
                  name="arrow-left"
                  size={24}
                  color="white"
                />
              )}
            </TouchableOpacity>
          ),
        }}
      />

      {/* CREATE BOOKING ROUTE */}
      <Stack.Screen
        name="create"
        options={{
          title: "Booking",
          headerTitleAlign: "center",
        }}
      />
    </Stack>
  );
};

export default BookingLayout;
