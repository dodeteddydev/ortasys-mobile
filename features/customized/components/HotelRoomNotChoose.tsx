import { View, Text, TouchableOpacity } from "react-native";

type HotelRoomNotChooseProps = {
  hideAddHotel?: boolean;
};

const HotelRoomNotChoose = ({ hideAddHotel }: HotelRoomNotChooseProps) => {
  return (
    <View>
      <View className="flex flex-row justify-center items-center gap-3 py-4">
        {!hideAddHotel && (
          <>
            <TouchableOpacity activeOpacity={0.8}>
              <Text className="text-lg font-bold text-white bg-primary rounded-lg px-4 py-2">
                Add Hotel
              </Text>
            </TouchableOpacity>
            <View className="h-10 w-[2.5px] bg-primary" />
          </>
        )}
        <TouchableOpacity activeOpacity={0.8}>
          <Text className="text-lg font-bold text-white bg-primary rounded-lg px-4 py-2">
            Add Service
          </Text>
        </TouchableOpacity>
      </View>

      <Text className="text-center text-gray-400 text-lg">
        {hideAddHotel
          ? "No service selected for this night"
          : "No hotel or service selected for this night"}
      </Text>
    </View>
  );
};

export default HotelRoomNotChoose;
