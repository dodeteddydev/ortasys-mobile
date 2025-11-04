import { ScrollView, Text, View } from "react-native";
import { BookingHotelRoomResponse } from "../types/bookingHotelRoomResponse";
import NetworkImage from "@/components/NetworkImage";
import TextWithShowMore from "@/components/TextWithShowMore";
import { Feather, MaterialIcons } from "@expo/vector-icons";
import Card from "@/components/Card";
import { colors } from "@/constants/colors";

type BookingInformationHotelRoomItemProps = {
  data: BookingHotelRoomResponse;
};

const BookingInformationHotelRoomItem = ({
  data,
}: BookingInformationHotelRoomItemProps) => {
  return (
    <Card className="mb-3">
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
    </Card>
  );
};

export default BookingInformationHotelRoomItem;
