import { dateFormat } from "@/utilities/dateFormat";
import { Text, View } from "react-native";

type HotelRoomTitleProps = {
  day: number;
  date: string;
};
const HotelRoomTitle = ({ day, date }: HotelRoomTitleProps) => {
  return (
    <View className="flex flex-row items-center gap-2">
      <Text className="text-lg font-bold text-primary">Day {day}</Text>
      <View className="h-6 w-[2.5px] bg-primary" />
      <Text className="text-lg text-gray-400">
        {dateFormat(date, "day-long")}
      </Text>
    </View>
  );
};

export default HotelRoomTitle;
