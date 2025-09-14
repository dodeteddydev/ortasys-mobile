import Button from "@/components/Button";
import HotelStar from "@/components/HotelStar";
import NetworkImage from "@/components/NetworkImage";
import { colors } from "@/constants/colors";
import { currencyFormat } from "@/utilities/currencyFormat";
import { Feather } from "@expo/vector-icons";
import { useMemo, useState } from "react";
import {
  Dimensions,
  ScrollView,
  Text,
  TouchableOpacity,
  View,
} from "react-native";
import { useCustomizedContext } from "../context/CustomizedProvider";
import { HotelRoomSchema } from "../schemas/hotelRoomSchema";
import { ResponseCustomized } from "../types/customized";
import NoHotelOrServiceSelected from "./NoHotelOrServiceSelected";
import ModalGeneral from "@/components/Modal";
import RenderHtml from "react-native-render-html";

type HotelOrServiceSelectedProps = {
  payload: HotelRoomSchema;
  response: ResponseCustomized;
  onPressAddService?: () => void;
};

const HotelOrServiceSelected = ({
  payload,
  response: { hotel, room, contract },
  onPressAddService,
}: HotelOrServiceSelectedProps) => {
  const { width } = Dimensions.get("window");
  const { customized } = useCustomizedContext();
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

  const tagsStyles = useMemo(
    () => ({
      p: { color: "#9ca3af" },
    }),
    []
  );

  return (
    <View>
      {/* HOTEL SECTION */}
      <View className="flex flex-row items-center gap-2">
        <NetworkImage className="h-20 w-28" path={room?.roomImage} />

        <View className="flex-1">
          <HotelStar star={hotel?.star} />
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
      <View className="flex flex-row justify-end items-center gap-2 mt-3">
        <View className="flex flex-row gap-4 items-center border border-primary rounded-lg px-4 h-10">
          <View className="flex flex-row items-center gap-4">
            <TouchableOpacity activeOpacity={0.8} onPress={handleRemoveNight}>
              <Feather
                name="arrow-left-circle"
                size={22}
                color={colors.primary}
              />
            </TouchableOpacity>
            <Text className="text-gray-400 font-bold">{night}</Text>
            <TouchableOpacity activeOpacity={0.8} onPress={handleAddNight}>
              <Feather
                name="arrow-right-circle"
                size={22}
                color={colors.primary}
              />
            </TouchableOpacity>
          </View>

          <Text className="text-primary font-bold">Night</Text>
        </View>

        <Button
          disabled={disabledCheckRoom}
          className="px-4 h-10"
          classNameText="text-sm text-white font-semibold"
          text="Check Room"
        />
      </View>

      {/* SERVICE SECTION */}
      <View className="border-t border-gray-400 mt-4">
        {payload?.activities?.length! > 0 ? (
          <></>
        ) : (
          <NoHotelOrServiceSelected
            hideAddHotel
            onPressAddService={onPressAddService}
          />
        )}
      </View>

      {/* MODAL DETAIL ROOM */}
      <ModalGeneral
        show={showModal}
        title={`Room ${
          room?.roomDescription && room?.roomDescription.length > 0
            ? `(${room?.roomDescription})`
            : ""
        }`}
      >
        <View className="gap-3" style={{ width: width - 100 }}>
          {/* GALERY */}
          {room?.galleries?.length > 0 ? (
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
            {room?.attributes?.length > 0 ? (
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
                html: contract?.policies?.benefit
                  .replace(/<li>/g, "<p>")
                  .replace(/<\/li>/g, "</p>")
                  .replace(/<\/?ul>/g, ""),
              }}
              tagsStyles={tagsStyles}
            />
          </View>

          <Button
            className="px-4 py-2"
            classNameText="text-lg text-white font-semibold"
            text="Close"
            onPress={() => setShowModal(false)}
          />
        </View>
      </ModalGeneral>
    </View>
  );
};

export default HotelOrServiceSelected;
