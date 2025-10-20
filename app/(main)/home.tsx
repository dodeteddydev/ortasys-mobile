import Loading from "@/components/Loading";
import { colors } from "@/constants/colors";
import { useGlobalContext } from "@/context/GlobalProvider";
import HomeHeaderSection from "@/features/home/components/HomeHeaderSection";
import { HomeMenu } from "@/types/homeMenuType";
import { FontAwesome } from "@expo/vector-icons";
import Feather from "@expo/vector-icons/Feather";
import { router } from "expo-router";
import { useEffect } from "react";
import { StatusBar, Text, TouchableOpacity, View } from "react-native";

const Home = () => {
  const { isLoadingProfile, getProfile, dataProfile } = useGlobalContext();

  useEffect(() => {
    getProfile();
  }, []);

  if (isLoadingProfile) return <Loading />;

  return (
    <>
      {/* HEADER SECTION */}
      <HomeHeaderSection data={dataProfile!} />

      {/* MENU SECTION */}
      <View className="flex flex-row flex-wrap p-3">
        {homeMenu.map((item, index) => (
          <View key={index} className="w-1/3 p-2">
            <TouchableOpacity
              className="bg-white rounded-xl p-4 items-center justify-center"
              activeOpacity={0.8}
              onPress={() => router.push(item.path)}
            >
              {item.icon}
              <Text
                className="text-primary"
                numberOfLines={1}
                ellipsizeMode="tail"
              >
                {item.title}
              </Text>
            </TouchableOpacity>
          </View>
        ))}
      </View>

      <StatusBar barStyle="light-content" backgroundColor={colors.primary} />
    </>
  );
};

export default Home;

const homeMenu: HomeMenu[] = [
  {
    title: "Customized",
    path: "/customized/list",
    icon: <Feather name="package" size={24} color={colors.primary} />,
  },
  {
    title: "Booking",
    path: "/booking",
    icon: <FontAwesome name="calendar" size={24} color={colors.primary} />,
  },
];
