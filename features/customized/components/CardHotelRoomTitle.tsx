import { colors } from "@/constants/colors";
import { dateFormat } from "@/utilities/dateFormat";
import { MaterialIcons } from "@expo/vector-icons";
import { Text, TouchableOpacity, View } from "react-native";
import { HotelRoomSchema } from "../schemas/hotelRoomSchema";
import { ResponseCustomized } from "../types/customized";

type CardHotelRoomTitleProps = {
  payload: HotelRoomSchema;
  response: ResponseCustomized;
  onPressEdit: () => void;
  onPressDelete: () => void;
};
const CardHotelRoomTitle = ({
  payload,
  response,
  onPressEdit,
  onPressDelete,
}: CardHotelRoomTitleProps) => {
  return (
    <View className="w-full">
      <View className="flex flex-row items-center gap-2">
        <Text className="text-lg font-bold text-primary">
          Day {payload?.day}
        </Text>
        <View className="h-6 w-[2.5px] bg-primary" />
        <Text className="text-lg text-gray-400">
          {dateFormat(payload?.date!, "day-long")}
        </Text>
      </View>

      {!!payload?.hotelId && !response?.partOfDay && (
        <View className="mb-3 gap-3 flex flex-row items-center justify-end">
          <TouchableOpacity activeOpacity={0.8} onPress={onPressEdit}>
            <MaterialIcons name="edit" size={24} color={colors.primary} />
          </TouchableOpacity>

          <TouchableOpacity activeOpacity={0.8} onPress={onPressDelete}>
            <MaterialIcons name="delete" size={24} color="#ef4444" />
          </TouchableOpacity>
        </View>
      )}
    </View>
  );
};

export default CardHotelRoomTitle;
