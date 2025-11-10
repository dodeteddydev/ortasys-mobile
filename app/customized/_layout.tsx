import { colors } from "@/constants/colors";
import { FontAwesome6, MaterialCommunityIcons } from "@expo/vector-icons";
import { router, Stack } from "expo-router";
import { useState } from "react";
import { Platform, Text, TouchableOpacity, View } from "react-native";

const CustomizedLayout = () => {
  const [isNavigating, setIsNavigating] = useState(false);

  const handlePress = () => {
    if (isNavigating) return;
    setIsNavigating(true);

    router.push("/customized/create");

    setTimeout(() => setIsNavigating(false), 1000);
  };

  return (
    <Stack
      screenOptions={{
        headerStyle: {
          backgroundColor: colors.primary,
        },
        headerTintColor: "white",
      }}
    >
      {/* LIST CUSTOMIZED ROUTE */}
      <Stack.Screen
        name="list"
        options={{
          title: "Customized Package",
          headerBackTitle: "Back",
          headerTitleAlign: "center",
          headerLeft: () => (
            <TouchableOpacity activeOpacity={0.8} onPress={() => router.back()}>
              {Platform.OS === "ios" ? (
                <Text className="text-white text-[20px]">Home</Text>
              ) : (
                <MaterialCommunityIcons
                  name="arrow-left"
                  size={24}
                  color="white"
                />
              )}
            </TouchableOpacity>
          ),
          headerRight: () => (
            <TouchableOpacity activeOpacity={0.8} onPress={handlePress}>
              <View className="flex flex-row items-center gap-1">
                <FontAwesome6 name="add" size={16} color="white" />
                <Text className="text-white text-[20px]">Add</Text>
              </View>
            </TouchableOpacity>
          ),
        }}
      />

      {/* CREATE CUSTOMIZED ROUTE */}
      <Stack.Screen
        name="create"
        options={{
          title: "Create Customized Package",
          headerBackTitle: "Back",
        }}
      />
    </Stack>
  );
};

export default CustomizedLayout;
