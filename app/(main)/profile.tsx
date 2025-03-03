import { useGlobalContext } from "@/context/GlobalProvider";
import ProfileButtonItem from "@/features/auth/components/ProfileButtonItem";
import FontAwesome6 from "@expo/vector-icons/FontAwesome6";
import MaterialIcons from "@expo/vector-icons/MaterialIcons";
import { router } from "expo-router";
import React from "react";
import { Alert, AlertButton, StatusBar, View } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";

const Profile = () => {
  const { logout } = useGlobalContext();

  const onPressLogout = () => {
    Alert.alert(
      "Are you sure?",
      "You will need to log in again to access your account.",
      [
        { text: "Cancel", style: "cancel" },
        { text: "Yes", onPress: logout },
      ]
    );
  };

  return (
    <>
      <View className="p-4 gap-3">
        <ProfileButtonItem
          icon={<FontAwesome6 name="user" size={25} color="black" />}
          title="Edit Profile"
          onPress={() => router.push("/edit-profile")}
        />

        <ProfileButtonItem
          icon={<MaterialIcons name="password" size={25} color="black" />}
          title="Change Password"
          onPress={() => router.push("/change-password")}
        />

        <ProfileButtonItem
          icon={<MaterialIcons name="logout" size={25} color="black" />}
          title="Logout"
          onPress={onPressLogout}
        />
      </View>

      <StatusBar barStyle="dark-content" />
    </>
  );
};

export default Profile;
