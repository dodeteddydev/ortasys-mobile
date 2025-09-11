import Button from "@/components/Button";
import { Text, View } from "react-native";
import { useCustomizedContext } from "../context/CustomizedProvider";
import { RoomSimpleResponse } from "../types/roomSimpleResponse";
import { useGetContract } from "../hooks/useGetContract";
import { calculateNights } from "@/utilities/calculateNights";
import { currencyFormat } from "@/utilities/currencyFormat";

type CardItemRoomBottomSheetContentProps = {
  isOpenRate: boolean;
  datePicked: string | null;
  dataRoom: RoomSimpleResponse;
  onPressRate: () => void;
};

const CardItemRoomBottomSheetContent = ({
  isOpenRate,
  datePicked,
  dataRoom,
  onPressRate,
}: CardItemRoomBottomSheetContentProps) => {
  const { customized } = useCustomizedContext();
  const { data, isPending, isError, error } = useGetContract({
    enabled: isOpenRate && !!datePicked,
    roomId: dataRoom.id,
    params: {
      date: datePicked!,
      night: calculateNights(
        customized?.search?.startStayDate!,
        customized?.search?.endStayDate!
      ),
      adult: customized?.search?.adult,
      child: customized?.search?.child,
      startStayDate: new Date(customized?.search?.startStayDate!).toISOString(),
    },
  });

  return (
    <View className="px-4">
      <View className="flex flex-row justify-between items-center">
        <View>
          <Text className="text-primary font-bold text-lg">
            {dataRoom?.roomTypeDescription}
          </Text>
          {dataRoom?.roomDescription && (
            <Text className="text-sm text-gray-400">
              {dataRoom?.roomDescription}
            </Text>
          )}
        </View>

        <Button
          loading={isPending && isOpenRate}
          className="px-4 py-2"
          classNameText="text-sm font-semibold text-white"
          text="Rate"
          onPress={onPressRate}
        />
      </View>

      {isOpenRate && !isPending && (
        <>
          {isError ? (
            <Text className="text-red-500 text-sm text-center">
              {error?.message}
            </Text>
          ) : data?.data?.length! > 0 ? (
            <>
              {data?.data?.map((item, index) => (
                <View key={index}>
                  <Text className="text-lg text-gray-400">
                    {currencyFormat(item?.base)}
                  </Text>
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
