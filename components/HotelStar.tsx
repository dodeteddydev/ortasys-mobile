import { FontAwesome } from "@expo/vector-icons";
import { View } from "react-native";

type HotelStarProps = {
  star: number;
};

const HotelStar = ({ star }: HotelStarProps) => {
  return (
    <View className="flex flex-row">
      {Array.from({ length: 5 }, (_, index) => (
        <FontAwesome
          key={index}
          name={index < star ? "star" : "star-o"}
          size={18}
          color={index < star ? "#eab308" : "#9ca3af"}
        />
      ))}
    </View>
  );
};

export default HotelStar;
