import Button from "@/components/Button";
import HotelStar from "@/components/HotelStar";
import ModalGeneral from "@/components/Modal";
import NetworkImage from "@/components/NetworkImage";
import { ErrorResponse } from "@/types/responseType";
import { currencyFormat } from "@/utilities/currencyFormat";
import { addDays } from "date-fns";
import { useEffect, useState } from "react";
import { ScrollView, Text, useWindowDimensions, View } from "react-native";
import RenderHtml from "react-native-render-html";
import Toast from "react-native-toast-message";
import { useCustomizedContext } from "../context/CustomizedProvider";
import { HotelRoomSchema } from "../schemas/hotelRoomSchema";
import { RoomAvailableService } from "../services/roomAvailableService";
import { HotelRoomCustomized, ResponseCustomized } from "../types/customized";
import { RoomAvailableResponse } from "../types/roomAvailableResponse";
import ButtonCounter from "./ButtonCounter";
import TextWithShowMore from "@/components/TextWithShowMore";

type HotelOrServiceSelectedProps = {
  index: number;
  payload: HotelRoomSchema;
  response: ResponseCustomized;
};

const HotelOrServiceSelected = ({
  index,
  payload,
  response: { partOfDay, hotel, room, contract },
}: HotelOrServiceSelectedProps) => {
  const { width } = useWindowDimensions();
  const { customized, setCustomized } = useCustomizedContext();
  const [night, setNight] = useState<number>(1);

  const handleAddNight = () => {
    night <=
    (customized.hotelRoomCustomized?.length ?? 0) - (payload?.day ?? 0) - 1
      ? setNight(night + 1)
      : null;
  };

  const handleRemoveNight = () => {
    night > 1 ? setNight(night - 1) : null;
  };

  const disabledCheckRoom: boolean =
    night < 2 ||
    (customized.hotelRoomCustomized?.length ?? 0) - 1 === (payload?.day ?? 0);

  const [showModal, setShowModal] = useState<boolean>(false);

  const handleSetCustomized = (value: RoomAvailableResponse) => {
    const availableRoom: HotelRoomCustomized[] = Object.entries(value)
      .map(([key, value]) => ({
        key,
        value,
      }))
      .map(({ key, value }, index) => ({
        payload: {
          ...payload,
          date: key,
          day: payload?.day! + index + 1,
          contractRateId: value?.contractRateId,
          rate: value?.rate,
          base: value?.base,
          hotelRoomConfigurationId: value?.hotelRoomConfigurationId,
          markupAgent: value?.markupAgent,
          markupHotel: value?.markupHotel,
        },
        response: {
          ...{ hotel, room, contract },
          partOfDay: payload?.day,
          hotel: hotel!,
          room: room!,
          contract: { ...contract!, value },
          activities: [],
        },
      }));

    const merged = new Map();

    [
      ...(customized.hotelRoomCustomized?.map((item) =>
        item.response?.partOfDay === payload?.day
          ? {
              payload: {
                day: item.payload.day,
                date: item.payload.date,
                isCheckout: payload?.isCheckout,
                checkIn: payload?.checkIn,
                activities: [],
              },
              response: null,
            }
          : item
      ) ?? []),
      ...availableRoom,
    ].forEach((item) => {
      merged.set(item.payload.day, item);
    });

    const newHotelRoomCustomized = Array.from(merged.values()).sort(
      (a, b) => a.id - b.id
    );

    setCustomized({
      ...customized,
      hotelRoomCustomized: newHotelRoomCustomized,
    });
  };

  const [loadingCheckRoom, setLoadingCheckRoom] = useState<boolean>(false);
  const handleCheckRoom = () => {
    setLoadingCheckRoom(true);
    RoomAvailableService.get(payload?.hotelRoomId!, {
      date: addDays(new Date(payload?.date!), 1).toISOString(),
      night: night - 1,
      adult: customized?.search?.adult ?? 0,
      child: customized?.search?.child ?? 0,
      contractRateId: payload?.contractRateId,
    })
      .then((res) => {
        handleSetCustomized(res.data);
      })
      .catch((e: ErrorResponse) =>
        Toast.show({
          type: "error",
          text1: "Something went wrong",
          text2: e.response?.data.message,
        })
      )
      .finally(() => {
        setLoadingCheckRoom(false);
      });
  };

  useEffect(() => {
    setNight(1);
  }, [customized.hotelRoomCustomized?.[index]?.payload?.contractRateId]);

  return (
    <View>
      {/* HOTEL SECTION */}
      <View className="flex flex-row items-center gap-2">
        <NetworkImage className="h-20 w-28" path={room?.roomImage!} />

        <View className="flex-1">
          <HotelStar star={hotel?.star!} />
          <Text className="text-primary font-semibold">
            {room?.roomTypeDescription}
          </Text>
          <Text className="text-gray-400 text-sm">{hotel?.hotelName}</Text>
          <View className="flex flex-row">
            <Text className="text-gray-400 text-sm">
              Child {hotel?.childAgeMin} - {hotel?.childAgeMax} year
            </Text>
          </View>
        </View>

        <View>
          <Text className="text-primary text-lg font-bold">
            {currencyFormat(contract?.rate ?? 0)}
          </Text>
          <Button
            className="bg-transparent border border-primary rounded-lg"
            classNameText="text-[10px] text-primary font-semibold px-2 py-1"
            text="Show Detail Room"
            onPress={() => setShowModal(true)}
          />
        </View>
      </View>

      {/* CHECK ROOM SECTION */}
      {!partOfDay &&
        (!customized?.hotelRoomCustomized?.[index + 2]?.response?.partOfDay ||
          customized?.hotelRoomCustomized?.[index + 1]?.response?.partOfDay ===
            payload?.day) && (
          <View className="flex flex-row justify-end items-center gap-2 mt-3">
            <ButtonCounter
              value={night}
              label="Night"
              onPressArrowLeft={handleRemoveNight}
              onPressArrowRight={handleAddNight}
            />

            <Button
              loading={loadingCheckRoom}
              disabled={disabledCheckRoom}
              className="px-4 h-10"
              classNameText="text-sm text-white font-semibold"
              text="Check Room"
              onPress={handleCheckRoom}
            />
          </View>
        )}

      {/* MODAL DETAIL ROOM */}
      <ModalGeneral
        show={showModal}
        title={`Room ${
          room?.roomTypeDescription && room?.roomTypeDescription.length > 0
            ? `(${room?.roomTypeDescription})`
            : ""
        }`}
      >
        <View className="gap-3" style={{ width: width - 100 }}>
          {/* ROOM DESCRIPTION */}
          <TextWithShowMore text={room?.roomDescription ?? ""} />

          {/* GALERY */}
          {room?.galleries?.length! > 0 ? (
            <ScrollView
              horizontal
              showsHorizontalScrollIndicator={false}
              contentContainerStyle={{ gap: 8 }}
            >
              {room?.galleries?.map((attribute, index) => (
                <NetworkImage key={index} className="h-20 w-28" path="" />
              ))}
            </ScrollView>
          ) : (
            <Text className="text-gray-400">No Gallery for this room</Text>
          )}

          {/* AMENITIES */}
          <View>
            <Text className="text-lg font-bold">Amenities</Text>
            {room?.attributes?.length! > 0 ? (
              <ScrollView
                horizontal
                showsHorizontalScrollIndicator={false}
                contentContainerStyle={{ gap: 8 }}
              >
                {room?.attributes?.map((attribute) => (
                  <View
                    key={attribute?.attributeId}
                    className="bg-gray-200 px-3 py-2 rounded-full items-center justify-center"
                  >
                    <Text className="text-gray-500 text-sm">
                      {attribute?.attributeName}
                    </Text>
                  </View>
                ))}
              </ScrollView>
            ) : (
              <Text className="text-gray-400">No Amenities</Text>
            )}
          </View>

          {/* BENEFIT */}
          <View>
            <Text className="text-lg font-bold">Benefit</Text>
            <RenderHtml
              contentWidth={width}
              source={{
                html: contract?.policies?.benefit!,
              }}
            />
          </View>

          <Button
            className="bg-white shadow-md border border-primary rounded-lg px-4 py-2"
            classNameText="text-lg text-primary font-semibold"
            text="Close"
            onPress={() => setShowModal(false)}
          />
        </View>
      </ModalGeneral>
    </View>
  );
};

export default HotelOrServiceSelected;
