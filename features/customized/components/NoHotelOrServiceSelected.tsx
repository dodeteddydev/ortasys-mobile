import Button from "@/components/Button";
import { ReactNode } from "react";
import { Text, View } from "react-native";

type NoHotelOrServiceSelectedProps = {
  hideAddHotel?: boolean;
  hideAddService?: boolean;
  onPressAddHotel?: () => void;
  onPressAddService?: () => void;
  text?: ReactNode;
};

const NoHotelOrServiceSelected = ({
  hideAddHotel,
  hideAddService,
  onPressAddHotel,
  onPressAddService,
  text,
}: NoHotelOrServiceSelectedProps) => {
  return (
    <View>
      <View className="flex flex-row justify-center items-center gap-3 py-4">
        {!hideAddHotel && (
          <Button
            className="px-4 py-2"
            classNameText="text-lg text-white font-semibold"
            text="Add Hotel"
            onPress={onPressAddHotel}
          />
        )}

        {!hideAddHotel && !hideAddService && (
          <View className="h-10 w-[2.5px] bg-primary" />
        )}

        {!hideAddService && (
          <Button
            className="px-4 py-2"
            classNameText="text-lg text-white font-semibold"
            text="Add Service"
            onPress={onPressAddService}
          />
        )}
      </View>

      <Text className="text-center text-gray-400 text-lg">{text}</Text>
    </View>
  );
};

export default NoHotelOrServiceSelected;
