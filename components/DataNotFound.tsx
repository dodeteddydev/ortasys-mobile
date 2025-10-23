import { View, Text, Image } from "react-native";
import data from "@/assets/images/vectors/data.png";

const DataNotFound = () => {
  return (
    <View className="flex flex-col flex-1 justify-center items-center">
      <Image className="h-36 w-36" source={data} resizeMode="contain" />
      <Text className="text-2xl font-semibold">Oops!...</Text>
      <Text className="text-xl">Data Not Found</Text>
    </View>
  );
};

export default DataNotFound;
