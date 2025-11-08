import Button from "@/components/Button";
import Card from "@/components/Card";
import NetworkImage from "@/components/NetworkImage";
import TextWithShowMore from "@/components/TextWithShowMore";
import { colors } from "@/constants/colors";
import { currencyFormat } from "@/utilities/currencyFormat";
import { Feather, MaterialIcons } from "@expo/vector-icons";
import { ScrollView, Text, TouchableOpacity, View } from "react-native";
import { BookingHotelRoomResponse } from "../types/bookingHotelRoomResponse";
import { BookingRoom } from "../types/bookingRequest";

type RoomItemProps = {
  data: BookingHotelRoomResponse;
  bookingRoom: BookingRoom;
  onChangeTotalRoom: (value: number) => void;
  onShowMorePrice: () => void;
};

const RoomItem = ({
  data,
  bookingRoom,
  onChangeTotalRoom,
  onShowMorePrice,
}: RoomItemProps) => {
  return (
    <Card className="mx-4 my-2 mb-3">
      <View className="gap-4">
        <View className="flex flex-row gap-3">
          <NetworkImage path={data?.roomImage} />
          <View className="flex-1">
            <Text className="text-lg font-bold text-primary">
              {data?.roomTypeDescription}
            </Text>
            <View className="flex flex-row gap-2 items-center">
              <View className="flex flex-row gap-2 items-center">
                <Feather name="users" size={18} color={colors.grayInactive} />
                <Text className="text-sm text-gray-400">{data?.maxPerson}</Text>
              </View>
              <View className="flex flex-row gap-2 items-center">
                <Feather name="user" size={18} color={colors.grayInactive} />
                <Text className="text-sm text-gray-400">{data?.maxAdult}</Text>
              </View>
              <View className="flex flex-row gap-2 items-center">
                <MaterialIcons
                  name="child-care"
                  size={18}
                  color={colors.grayInactive}
                />
                <Text className="text-sm text-gray-400">
                  {data?.maxChildren}
                </Text>
              </View>
            </View>

            <TextWithShowMore text={data?.roomDescription} />
          </View>
        </View>

        <View>
          <Text className="text-lg font-bold">Amenities</Text>
          <ScrollView horizontal contentContainerStyle={{ gap: 8 }}>
            {data?.attributes?.length! > 0 ? (
              <View className="flex flex-row flex-wrap gap-2">
                {data?.attributes?.map((attribute) => (
                  <View
                    key={attribute?.attributeId}
                    className="bg-gray-200 px-3 py-2 rounded-full self-start"
                  >
                    <Text className="text-gray-500 text-sm">
                      {attribute?.attributeName}
                    </Text>
                  </View>
                ))}
              </View>
            ) : (
              <Text className="text-gray-400">No Amenities</Text>
            )}
          </ScrollView>
        </View>

        {data?.galleries?.length! > 0 ? (
          <ScrollView
            horizontal
            showsHorizontalScrollIndicator={false}
            contentContainerStyle={{ gap: 8 }}
          >
            {data?.galleries?.map((attribute, index) => (
              <NetworkImage key={index} className="h-20 w-28" path="" />
            ))}
          </ScrollView>
        ) : (
          <Text className="text-gray-400">No Gallery for this room</Text>
        )}

        <View className="flex flex-row items-center gap-2 pe-3">
          <Feather name="alert-octagon" size={15} color="#ef4444" />
          <Text className="uppercase overflow-auto text-sm text-red-500">
            VALID FOR {data?.markets?.map((market) => market).join(", ")} MARKET
            ONLY
          </Text>
        </View>
      </View>

      <View className="flex items-center mt-3 gap-2">
        <Text className="text-gray-400">Only 2 left</Text>

        <View className="flex flex-row items-center gap-2">
          <Text className="text-lg font-bold text-primary">
            {currencyFormat(bookingRoom?.pricePerNight)}
          </Text>
          <Text className="text-sm text-gray-400">/ night</Text>
        </View>

        <View className="flex flex-row items-center gap-3">
          <TouchableOpacity
            activeOpacity={0.8}
            className="bg-primary p-1 rounded-md"
            onPress={
              bookingRoom?.totalRoom > 0
                ? () => onChangeTotalRoom(bookingRoom?.totalRoom - 1)
                : undefined
            }
          >
            <Feather name="minus" size={20} color="white" />
          </TouchableOpacity>
          <Text className="text-lg font-bold text-primary">
            {bookingRoom?.totalRoom}
          </Text>
          <TouchableOpacity
            activeOpacity={0.8}
            className="bg-primary p-1 rounded-md"
            onPress={
              bookingRoom?.totalRoom < 2
                ? () => onChangeTotalRoom(bookingRoom?.totalRoom + 1)
                : undefined
            }
          >
            <Feather name="plus" size={20} color="white" />
          </TouchableOpacity>
        </View>

        <Button
          className="bg-transparent border border-primary rounded-lg"
          classNameText="text-[10px] text-primary font-semibold px-2 py-1"
          text="Show More Price"
          onPress={onShowMorePrice}
        />
      </View>
    </Card>
  );
};

export default RoomItem;
