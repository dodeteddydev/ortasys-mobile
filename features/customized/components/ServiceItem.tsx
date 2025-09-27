import { Text, View } from "react-native";
import { PackageSimpleResponse } from "../types/packageSimpleResponse";
import { currencyFormat } from "@/utilities/currencyFormat";
import NetworkImage from "@/components/NetworkImage";
import { TextInputField } from "@/components/TextInputField";
import DateTimePicker from "@/components/DateTimePicker";
import { useCustomizedContext } from "../context/CustomizedProvider";
import { dateFormat } from "@/utilities/dateFormat";

type ServiceItemProps = {
  idxHotelRoom: number;
  idxActivity: number;
  data: PackageSimpleResponse;
};

const ServiceItem = ({ idxHotelRoom, idxActivity, data }: ServiceItemProps) => {
  const { customized, setCustomized } = useCustomizedContext();

  const handleChangeAdult = (adultValue: number) => {
    setCustomized({
      ...customized,
      hotelRoomCustomized: customized?.hotelRoomCustomized?.map(
        (valueHotelRoom, i) =>
          i === idxHotelRoom
            ? {
                ...valueHotelRoom,
                payload: {
                  ...valueHotelRoom?.payload,
                  activities: valueHotelRoom?.payload?.activities?.map(
                    (valueActivity, i) =>
                      i === idxActivity
                        ? {
                            ...valueActivity,
                            rate:
                              adultValue! * data?.priceAdult +
                              valueActivity?.child! * data?.priceChild,
                            adult: Number(adultValue || 0),
                          }
                        : valueActivity
                  ),
                },
              }
            : valueHotelRoom
      ),
    });
  };

  const handleChangeChild = (childValue: number) => {
    setCustomized({
      ...customized,
      hotelRoomCustomized: customized?.hotelRoomCustomized?.map(
        (valueHotelRoom, i) =>
          i === idxHotelRoom
            ? {
                ...valueHotelRoom,
                payload: {
                  ...valueHotelRoom?.payload,
                  activities: valueHotelRoom?.payload?.activities?.map(
                    (valueActivity, i) =>
                      i === idxActivity
                        ? {
                            ...valueActivity,
                            rate:
                              valueActivity?.adult! * data?.priceAdult +
                              childValue! * data?.priceChild,
                            child: Number(childValue || 0),
                          }
                        : valueActivity
                  ),
                },
              }
            : valueHotelRoom
      ),
    });
  };

  const handleChangeDateTime = (dateTime: string) => {
    setCustomized({
      ...customized,
      hotelRoomCustomized: customized?.hotelRoomCustomized?.map(
        (valueHotelRoom, i) =>
          i === idxHotelRoom
            ? {
                ...valueHotelRoom,
                payload: {
                  ...valueHotelRoom?.payload,
                  activities: valueHotelRoom?.payload?.activities?.map(
                    (valueActivity, i) =>
                      i === idxActivity
                        ? { ...valueActivity, date: dateTime }
                        : valueActivity
                  ),
                },
              }
            : valueHotelRoom
      ),
    });
  };

  return (
    <View className="border-b border-gray-200 pb-3 mb-3">
      <Text className="text-lg font-bold text-primary">
        {data?.productName}
      </Text>

      <View className="flex flex-row gap-3">
        <NetworkImage path={data?.productImage} />

        <View className="flex-1">
          <Text className="text-primary">{data?.vendorName}</Text>
          <Text className="text-gray-400">{data?.description}</Text>
          <Text className="text-gray-400">
            {currencyFormat(data?.priceAdult)} x Adult
          </Text>
          <Text className="text-gray-400">
            {currencyFormat(data?.priceChild)} x Child
          </Text>
        </View>
      </View>

      <View className="flex flex-row gap-3">
        <View className="flex-1">
          <TextInputField
            label="Adult"
            value={customized?.hotelRoomCustomized?.[
              idxHotelRoom
            ]?.payload?.activities?.[idxActivity]?.adult?.toString()}
            onChangeText={(value) => handleChangeAdult(parseInt(value))}
            keyboardType="number-pad"
          />
        </View>
        <View className="flex-1">
          <TextInputField
            label="Child"
            value={customized?.hotelRoomCustomized?.[
              idxHotelRoom
            ]?.payload?.activities?.[idxActivity]?.child?.toString()}
            onChangeText={(value) => handleChangeChild(parseInt(value))}
            keyboardType="number-pad"
          />
        </View>
        <View className="flex-1">
          <DateTimePicker
            label="Time"
            isTime
            value={dateFormat(
              customized?.hotelRoomCustomized?.[idxHotelRoom]?.payload
                ?.activities?.[idxActivity]?.date!,
              "time"
            )}
            onChangeDate={handleChangeDateTime}
          />
        </View>
      </View>
    </View>
  );
};

export default ServiceItem;
