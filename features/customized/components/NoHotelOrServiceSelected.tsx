import Button from "@/components/Button";
import { Text, View } from "react-native";

type NoHotelOrServiceSelectedProps = {
  hideAddHotel?: boolean;
  onPressAddHotel?: () => void;
  onPressAddService?: () => void;
};

const NoHotelOrServiceSelected = ({
  hideAddHotel,
  onPressAddHotel,
  onPressAddService,
}: NoHotelOrServiceSelectedProps) => {
  return (
    <View>
      <View className="flex flex-row justify-center items-center gap-3 py-4">
        {!hideAddHotel && (
          <>
            <Button
              className="px-4 py-2"
              classNameText="text-[14px]"
              text="Add Hotel"
              onPress={onPressAddHotel}
            />
            <View className="h-10 w-[2.5px] bg-primary" />
          </>
        )}

        <Button
          className="px-4 py-2"
          classNameText="text-[14px]"
          text="Add Service"
          onPress={onPressAddService}
        />
      </View>

      <Text className="text-center text-gray-400 text-lg">
        {hideAddHotel
          ? "No service selected for this night"
          : "No hotel or service selected for this night"}
      </Text>
    </View>
  );
};

export default NoHotelOrServiceSelected;
