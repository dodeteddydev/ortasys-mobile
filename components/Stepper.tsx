import MaterialIcons from "@expo/vector-icons/MaterialIcons";
import { ReactNode } from "react";
import { Text, TouchableOpacity, View } from "react-native";

type StepperProps = {
  currentStep: string;
  onChangeStep: (step: string) => void;
  steps: { id: string; label: string; content: ReactNode }[];
};

const Stepper = ({ currentStep, onChangeStep, steps }: StepperProps) => {
  const currentIndex = steps.findIndex((step) => step?.id === currentStep);
  const current = steps[currentIndex];

  return (
    <View className="flex-1">
      <View className="z-10 rounded-b-xl bg-white shadow-lg p-2">
        <View className="flex flex-row items-center justify-center">
          {steps?.map((step, index) => {
            const isCompleted = index < currentIndex;
            const isCurrent = index === currentIndex;
            const isClickable = isCompleted || isCurrent;

            return (
              <TouchableOpacity
                key={step?.id + index}
                className="flex-row items-center justify-center max-w-20"
                activeOpacity={index < currentIndex ? 0.8 : 1}
                onPress={() => isClickable && onChangeStep(step?.id)}
              >
                {index > 0 && (
                  <View
                    className={`flex-1 h-[2px] mx-2 ${
                      index <= currentIndex ? "bg-primary" : "bg-gray-200"
                    }`}
                  />
                )}

                <View
                  className={`items-center justify-center border-2 rounded-full w-8 h-8 ${
                    index <= currentIndex ? "border-primary" : "border-gray-200"
                  } ${index < currentIndex && "bg-primary"}`}
                  key={step?.id + index}
                >
                  <Text
                    className={`text-lg font-semibold ${
                      index <= currentIndex ? "text-primary" : "text-gray-200"
                    }`}
                  >
                    {index < currentIndex ? (
                      <MaterialIcons name="check" size={20} color="white" />
                    ) : (
                      index + 1
                    )}
                  </Text>
                </View>
              </TouchableOpacity>
            );
          })}
        </View>

        <Text className="text-center text-lg font-semibold text-primary">
          {current?.label}
        </Text>
      </View>

      <View className="flex-1">{current?.content}</View>
    </View>
  );
};

export default Stepper;
