import { View, Text, Image } from "react-native";
import loading from "@/assets/images/vectors/loading.png";

const Loading = () => {
  return (
    <View className="flex flex-col flex-1 justify-center items-center">
      <Image className="h-36 w-36" source={loading} resizeMode="contain" />
      <Text className="text-2xl font-semibold">Loading...</Text>
    </View>
  );
};

export default Loading;
