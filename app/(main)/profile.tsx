import { colors } from "@/constants/colors";
import { useGlobalContext } from "@/context/GlobalProvider";
import ProfileButtonItem from "@/features/auth/components/ProfileButtonItem";
import { Octicons } from "@expo/vector-icons";
import MaterialIcons from "@expo/vector-icons/MaterialIcons";
import { router } from "expo-router";
import { Alert, StatusBar, View } from "react-native";

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
        {/* EDIT PROFILE CARD */}
        <ProfileButtonItem
          icon={<Octicons name="person" size={25} color={colors.primary} />}
          title="Edit Profile"
          onPress={() => router.push("/edit-profile")}
        />

        {/* CHANGE PASSWORD CARD */}
        <ProfileButtonItem
          icon={
            <MaterialIcons name="password" size={25} color={colors.primary} />
          }
          title="Change Password"
          onPress={() => router.push("/change-password")}
        />

        {/* LOGOUT CARD */}
        <ProfileButtonItem
          icon={
            <MaterialIcons name="logout" size={25} color={colors.primary} />
          }
          title="Logout"
          onPress={onPressLogout}
        />
      </View>

      <StatusBar barStyle="dark-content" />
    </>
  );
};

export default Profile;
