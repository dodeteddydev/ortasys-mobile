import AntDesign from "@expo/vector-icons/AntDesign";
import { View } from "react-native";

type HotelStarProps = {
  star: number;
};

const HotelStar = ({ star }: HotelStarProps) => {
  return (
    <View className="flex flex-row">
      {Array.from({ length: 5 }, (_, index) => (
        <AntDesign
          key={index}
          name={index < star ? "star" : "staro"}
          size={18}
          color={index < star ? "#eab308" : "#9ca3af"}
        />
      ))}
    </View>
  );
};

export default HotelStar;
