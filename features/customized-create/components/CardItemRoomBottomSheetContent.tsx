import Button from "@/components/Button";
import { calculateNights } from "@/utilities/calculateNights";
import { currencyFormat } from "@/utilities/currencyFormat";
import { Feather } from "@expo/vector-icons";
import { Text, useWindowDimensions, View } from "react-native";
import RenderHtml from "react-native-render-html";
import { useCustomizedContext } from "../context/CustomizedProvider";
import { useGetContract } from "../hooks/useGetContract";
import { ContractResponse } from "../types/contractResponse";
import { HotelSimpleResponse } from "../types/hotelSimpleResponse";
import { RoomSimpleResponse } from "../types/roomSimpleResponse";
import TextWithShowMore from "@/components/TextWithShowMore";

type CardItemRoomBottomSheetContentProps = {
  isOpenRate: boolean;
  datePicked: string | null;
  day: number | null;
  dataHotelAndRoom: { hotel: HotelSimpleResponse; room: RoomSimpleResponse };
  onPressRate: () => void;
  onCloseModalBottomSheet: () => void;
};

const CardItemRoomBottomSheetContent = ({
  isOpenRate,
  datePicked,
  day,
  dataHotelAndRoom,
  onPressRate,
  onCloseModalBottomSheet,
}: CardItemRoomBottomSheetContentProps) => {
  const { width } = useWindowDimensions();
  const { customized, setCustomized } = useCustomizedContext();
  const { data, isFetching, isError, error } = useGetContract({
    enabled: isOpenRate && !!datePicked,
    roomId: dataHotelAndRoom?.room?.id,
    params: {
      date: datePicked!,
      night: calculateNights(
        customized?.search?.startStayDate!,
        customized?.search?.endStayDate!
      ),
      adult: customized?.search?.adult,
      child: customized?.search?.child,
      startStayDate: customized?.search?.startStayDate,
    },
  });

  const handleAddRoom = (data: ContractResponse) => {
    const newHotelRoomCustomized = customized?.hotelRoomCustomized?.map(
      (hotelRoom) => {
        if (hotelRoom.payload.date === datePicked) {
          return {
            ...hotelRoom,
            payload: {
              ...hotelRoom?.payload,
              contractRateId: data?.contractRateId,
              rate: data?.rate,
              base: data?.base,
              hotelId: dataHotelAndRoom?.hotel?.hotelId,
              hotelRoomId: dataHotelAndRoom?.room?.id,
              hotelRoomConfigurationId: data?.hotelRoomConfigurationId,
              markupAgent: data?.markupAgent,
              markupHotel: data?.markupHotel,
              activities: [...(hotelRoom?.payload?.activities || [])],
            },
            response: {
              ...hotelRoom?.response,
              hotel: dataHotelAndRoom?.hotel,
              room: dataHotelAndRoom?.room,
              contract: data,
              activities: [...(hotelRoom?.response?.activities || [])],
            },
          };
        } else if (hotelRoom?.response?.partOfDay === day) {
          return {
            payload: {
              day: hotelRoom?.payload?.day,
              date: hotelRoom?.payload?.date,
              isCheckout: hotelRoom?.payload?.isCheckout,
              checkIn: hotelRoom?.payload?.checkIn,
              activities: [],
            },
            response: null,
          };
        }

        return hotelRoom;
      }
    );

    setCustomized({
      ...customized,
      hotelRoomCustomized: newHotelRoomCustomized,
    });
    onCloseModalBottomSheet();
  };

  return (
    <View className="px-4 py-2 border-b border-gray-200">
      <View className="flex flex-row justify-between items-center mb-3">
        <View>
          <Text className="text-primary font-bold text-lg">
            {dataHotelAndRoom?.room?.roomTypeDescription}
          </Text>
          {dataHotelAndRoom?.room?.roomDescription && (
            <View className="max-w-[85%]">
              <TextWithShowMore
                text={dataHotelAndRoom?.room?.roomDescription}
              />
            </View>
          )}
        </View>

        <Button
          loading={isFetching && isOpenRate}
          className="px-4 py-2"
          classNameText="text-sm font-semibold text-white"
          text="Rate"
          onPress={onPressRate}
        />
      </View>

      {isOpenRate && !isFetching && (
        <>
          {isError ? (
            <Text className="text-red-500 text-sm text-center">
              {error?.message}
            </Text>
          ) : data?.data?.length! > 0 ? (
            <>
              {data?.data?.map((item, index) => (
                <View
                  key={index}
                  className="gap-1 border border-primary rounded-lg p-2 mb-2"
                >
                  <Text className="font-medium">
                    {currencyFormat(item?.rate)}
                  </Text>

                  <RenderHtml
                    contentWidth={width}
                    source={{
                      html: item?.policies?.benefit,
                    }}
                  />

                  <View className="flex flex-row items-center gap-2 pe-3">
                    <Feather name="alert-octagon" size={15} color="#ef4444" />
                    <Text className="uppercase overflow-auto text-sm text-red-500">
                      VALID FOR{" "}
                      {item?.markets
                        ?.map((market) => market?.marketName)
                        .join(", ")}{" "}
                      MARKET ONLY
                    </Text>
                  </View>

                  <Button
                    className="px-4 py-2"
                    classNameText="text-sm font-semibold text-white"
                    text="Apply"
                    onPress={() => handleAddRoom(item)}
                  />
                </View>
              ))}
            </>
          ) : (
            <Text className="text-sm text-gray-400 text-center">
              No rate available
            </Text>
          )}
        </>
      )}
    </View>
  );
};

export default CardItemRoomBottomSheetContent;
