import { colors } from "@/constants/colors";
import { router, Stack } from "expo-router";
import { Text, TouchableOpacity, View } from "react-native";

const CustomizedLayout = () => {
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
            <View>
              <TouchableOpacity
                activeOpacity={0.8}
                onPress={() => router.back()}
              >
                <Text className="text-white text-xl">Home</Text>
              </TouchableOpacity>
            </View>
          ),
          headerRight: () => (
            <TouchableOpacity
              activeOpacity={0.8}
              onPress={() => router.push("/customized/create")}
            >
              <Text className="text-white text-xl">Add</Text>
            </TouchableOpacity>
          ),
        }}
      />

      {/* CREATE CUSTOMIZED ROUTE */}
      <Stack.Screen
        name="create"
        options={{
          title: "Create Customized Package",
          headerBackTitle: " ",
        }}
      />
    </Stack>
  );
};

export default CustomizedLayout;
