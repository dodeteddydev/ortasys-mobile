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
    <View>
      <View className="bottom-0 left-0 right-0 z-10 rounded-t-xl bg-white shadow-lg">
        {children}

        {!children && (
          <View className="flex flex-row justify-between px-6 pt-6 pb-16">
            <TouchableOpacity
              activeOpacity={0.8}
              className="flex flex-row items-center"
              onPress={onPressPrevious}
            >
              <SimpleLineIcons
                name="arrow-left"
                size={24}
                color={colors.primary}
              />
              <Text className="text-2xl font-bold text-primary">Previous</Text>
            </TouchableOpacity>

            <TouchableOpacity
              activeOpacity={0.8}
              className="flex flex-row items-center"
              onPress={onPressNext}
            >
              <Text className="text-2xl font-bold text-primary">Next</Text>
              <SimpleLineIcons
                name="arrow-right"
                size={24}
                color={colors.primary}
              />
            </TouchableOpacity>
          </View>
        )}
      </View>
    </View>
  );
};

export default StepperButton;
