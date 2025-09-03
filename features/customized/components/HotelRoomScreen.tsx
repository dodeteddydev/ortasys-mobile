import { ScrollView, Text, View } from "react-native";
import { useCustomizedContext } from "../context/CustomizedProvider";
import { useEffect, useState } from "react";
import { calculateNights } from "@/utilities/calculateNights";
import Card from "@/components/Card";
import { dateFormat } from "@/utilities/dateFormat";
import { HotelRoomSchema } from "../schemas/hotelRoomSchema";
import { addDays } from "date-fns";
import HotelRoomTitle from "./HotelRoomTitle";
import HotelRoomNotChoose from "./HotelRoomNotChoose";

const HotelRoomScreen = () => {
  const { customized } = useCustomizedContext();
  const [listHotelRoom, setListHotelRoom] = useState<HotelRoomSchema[]>([]);

  const handleInitialListHotelRoom = () => {
    const night =
      calculateNights(
        customized?.search?.checkIn!,
        customized?.search?.checkOut!
      ) + 1;

    const hotelRooms: HotelRoomSchema[] = Array.from(
      { length: night },
      (_, index) => ({
        day: index + 1,
        date: addDays(
          new Date(customized?.search?.checkIn!),
          index
        ).toISOString(),
        isCheckout: index !== 0,
        activities: [],
      })
    );

    setListHotelRoom(hotelRooms);
  };

  useEffect(() => {
    handleInitialListHotelRoom();
  }, []);

  // console.log(customized);

  console.log(listHotelRoom);

  return (
    <ScrollView
      className="h-full p-4"
      keyboardShouldPersistTaps="handled"
      showsVerticalScrollIndicator={false}
    >
      {listHotelRoom?.map((value, index) => (
        <Card
          key={index}
          className={`${
            listHotelRoom.length - 1 === index ? "mb-10" : "mb-4"
          } p-0`}
          title={<HotelRoomTitle day={value?.day!} date={value?.date!} />}
        >
          <HotelRoomNotChoose
            hideAddHotel={listHotelRoom.length - 1 === index}
          />
        </Card>
      ))}
    </ScrollView>
  );
};

export default HotelRoomScreen;
