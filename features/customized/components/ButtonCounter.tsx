import { colors } from "@/constants/colors";
import { Feather } from "@expo/vector-icons";
import { Text, TouchableOpacity, View } from "react-native";

type ButtonCounterProps = {
  value: number;
  label: string;
  onPressArrowLeft: () => void;
  onPressArrowRight: () => void;
};

const ButtonCounter = ({
  value,
  label,
  onPressArrowRight,
  onPressArrowLeft,
}: ButtonCounterProps) => {
  return (
    <View className="flex flex-row gap-4 items-center border border-primary rounded-lg px-4 h-10">
      <View className="flex flex-row items-center gap-4">
        <TouchableOpacity activeOpacity={0.8} onPress={onPressArrowLeft}>
          <Feather name="arrow-left-circle" size={22} color={colors.primary} />
        </TouchableOpacity>
        <Text className="text-gray-400 font-bold">{value}</Text>
        <TouchableOpacity activeOpacity={0.8} onPress={onPressArrowRight}>
          <Feather name="arrow-right-circle" size={22} color={colors.primary} />
        </TouchableOpacity>
      </View>

      <Text className="text-primary font-bold">{label}</Text>
    </View>
  );
};

export default ButtonCounter;
