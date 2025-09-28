import { Text, TouchableOpacity, View } from "react-native";
import { PackageSimpleResponse } from "../types/packageSimpleResponse";
import { currencyFormat } from "@/utilities/currencyFormat";
import NetworkImage from "@/components/NetworkImage";
import { TextInputField } from "@/components/TextInputField";
import DateTimePicker from "@/components/DateTimePicker";
import { useCustomizedContext } from "../context/CustomizedProvider";
import {
  convertDateToUtcFormatButLocalTime,
  dateFormat,
} from "@/utilities/dateFormat";
import { MaterialIcons } from "@expo/vector-icons";

type ServiceItemProps = {
  idxHotelRoom: number;
  idxActivity: number;
  data: PackageSimpleResponse;
};

const ServiceItem = ({ idxHotelRoom, idxActivity, data }: ServiceItemProps) => {
  const { customized, setCustomized } = useCustomizedContext();

  const handleDeleteService = () => {
    setCustomized({
      ...customized,
      hotelRoomCustomized: customized?.hotelRoomCustomized?.map(
        (valueHotelRoom, indexHotelRoom) =>
          idxHotelRoom === indexHotelRoom
            ? {
                ...valueHotelRoom,
                payload: {
                  ...valueHotelRoom?.payload,
                  activities: valueHotelRoom?.payload?.activities?.filter(
                    (_, indexActivity) => idxActivity !== indexActivity
                  ),
                },
                response: {
                  ...valueHotelRoom?.response,
                  activities: valueHotelRoom?.response?.activities?.filter(
                    (_, indexActivity) => idxActivity !== indexActivity
                  ),
                },
              }
            : valueHotelRoom
      ),
    });
  };

  const handleChangeTotalItem = (totalItem: number) => {
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
                            totalItem: Number(totalItem || 0),
                          }
                        : valueActivity
                  ),
                },
              }
            : valueHotelRoom
      ),
    });
  };

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
                        ? {
                            ...valueActivity,
                            date: convertDateToUtcFormatButLocalTime(
                              new Date(dateTime)
                            ),
                          }
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
      <View className="flex flex-row items-center justify-between">
        <Text className="text-lg font-bold text-primary">
          {data?.productName}
        </Text>

        <TouchableOpacity activeOpacity={0.8} onPress={handleDeleteService}>
          <MaterialIcons name="delete" size={24} color="#ef4444" />
        </TouchableOpacity>
      </View>

      <View className="flex flex-row gap-3">
        <NetworkImage path={data?.productImage} />

        <View className="flex-1">
          <Text className="text-primary">{data?.vendorName}</Text>
          <Text className="text-gray-400">{data?.description}</Text>
          {data?.packageCategory?.isPricePerItem ? (
            <View className="flex flex-row items-center gap-3">
              <Text className="text-gray-400">
                {currencyFormat(data?.pricePerItem)} x
              </Text>

              <TextInputField
                minHeight={35}
                classNameContainer="w-20"
                value={
                  customized?.hotelRoomCustomized?.[
                    idxHotelRoom
                  ]?.payload?.activities?.[
                    idxActivity
                  ]?.totalItem?.toString() ?? "0"
                }
                onChangeText={(value) => handleChangeTotalItem(parseInt(value))}
                keyboardType="number-pad"
              />
            </View>
          ) : (
            <>
              <Text className="text-gray-400">
                {currencyFormat(data?.priceAdult)} x Adult
              </Text>
              <Text className="text-gray-400">
                {currencyFormat(data?.priceChild)} x Child
              </Text>
            </>
          )}
        </View>
      </View>

      <View className="flex flex-row gap-3">
        <View className="flex-1">
          <TextInputField
            minHeight={35}
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
            minHeight={35}
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
            minHeight={35}
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
