import { colors } from "@/constants/colors";
import SimpleLineIcons from "@expo/vector-icons/SimpleLineIcons";
import { ReactNode } from "react";
import { Text, TouchableOpacity, View } from "react-native";

type StepperButtonProps = {
  onPressPrevious?: () => void;
  onPressNext?: () => void;
  children?: ReactNode;
};

const StepperButton = ({
  onPressPrevious,
  onPressNext,
  children,
}: StepperButtonProps) => {
  return (
    <View className="z-10 rounded-t-xl bg-white shadow-lg">
      <View className="flex flex-col items-center px-4">{children}</View>

      {!children && (
        <View className="flex flex-row justify-between px-6 pt-6 pb-16">
          <TouchableOpacity
            activeOpacity={0.8}
            className="flex flex-row items-center gap-2"
            onPress={onPressPrevious}
          >
            <SimpleLineIcons
              name="arrow-left"
              size={16}
              color={colors.primary}
            />
            <Text className="text-lg font-bold text-primary">Previous</Text>
          </TouchableOpacity>

          <TouchableOpacity
            activeOpacity={0.8}
            className="flex flex-row items-center gap-2"
            onPress={onPressNext}
          >
            <Text className="text-lg font-bold text-primary">Next</Text>
            <SimpleLineIcons
              name="arrow-right"
              size={16}
              color={colors.primary}
            />
          </TouchableOpacity>
        </View>
      )}
    </View>
  );
};

export default StepperButton;
