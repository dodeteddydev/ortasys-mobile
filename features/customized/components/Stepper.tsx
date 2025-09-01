import MaterialIcons from "@expo/vector-icons/MaterialIcons";
import React, { ReactNode } from "react";
import { Text, TouchableOpacity, View } from "react-native";

type StepperProps = {
  currentStep: string;
  onChange: (step: string) => void;
  steps: { id: string; label: string; content: ReactNode }[];
};

const Stepper = ({ currentStep, onChange, steps }: StepperProps) => {
  const currentIndex = steps.findIndex((s) => s?.id === currentStep);

  return (
    <View className="flex-1">
      <View className="position-absolute top-0 left-0 right-0 z-30 rounded-b-xl bg-white shadow-lg p-2">
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
                onPress={() => isClickable && onChange(step?.id)}
              >
                {index > 0 && (
                  <View
                    className={`flex-1 h-[2px] mx-2 ${
                      index <= currentIndex ? "bg-primary" : "bg-gray-200"
                    }`}
                  />
                )}

                <View
                  className="items-center justify-center"
                  key={step?.id + index}
                >
                  <Text
                    className={`text-lg font-semibold border-2 rounded-full w-8 h-8 text-center ${
                      index <= currentIndex
                        ? "text-primary border-primary"
                        : "text-gray-200 border-gray-200"
                    } ${index < currentIndex && "bg-primary"}`}
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
          {steps?.find((step) => step?.id === currentStep)?.label}
        </Text>
      </View>

      {steps?.find((step) => step?.id === currentStep)?.content}
    </View>
  );
};

export default Stepper;
