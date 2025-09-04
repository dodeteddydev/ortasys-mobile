import Card from "@/components/Card";
import ModalBottomSheet from "@/components/ModalBottomSheet";
import StepperButton from "@/components/StepperButton";
import { calculateNights } from "@/utilities/calculateNights";
import { addDays } from "date-fns";
import { useEffect, useState } from "react";
import { ScrollView, View } from "react-native";
import { useCustomizedContext } from "../context/CustomizedProvider";
import { HotelRoomSchema } from "../schemas/hotelRoomSchema";
import HotelRoomNotChoose from "./HotelRoomNotChoose";
import HotelRoomTitle from "./HotelRoomTitle";
import Toast from "react-native-toast-message";
import ToastCustom from "@/components/ToastCustom";

type HotelRoomScreenProps = {
  onPressPrevious: () => void;
  onPressNext: () => void;
};

const HotelRoomScreen = ({
  onPressPrevious,
  onPressNext,
}: HotelRoomScreenProps) => {
  const { customized } = useCustomizedContext();
  const [listHotelRoom, setListHotelRoom] = useState<HotelRoomSchema[]>([]);
  const [showModal, setShowModal] = useState(false);

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

  const onSubmit = () => {
    const isHotelAndServiceAdded = listHotelRoom.some(
      (hotelRoom) =>
        !!hotelRoom.hotelId || !!hotelRoom?.activities?.[0]?.packageElementId
    );

    if (isHotelAndServiceAdded) {
      onPressNext();
    } else {
      Toast.show({
        type: "error",
        text1: "Almost there 👋",
        text2: "Add a hotel or activity to continue.",
      });
    }
  };

  useEffect(() => {
    handleInitialListHotelRoom();
  }, []);

  console.log(listHotelRoom);

  return (
    <View className="flex-1">
      <ScrollView
        keyboardShouldPersistTaps="handled"
        showsVerticalScrollIndicator={false}
      >
        {listHotelRoom?.map((value, index) => (
          <Card
            key={index}
            className={`${index === 0 && "mt-4"} ${
              index === listHotelRoom.length - 1 && "mb-4"
            } m-2 mx-4`}
            title={<HotelRoomTitle day={value?.day!} date={value?.date!} />}
          >
            <HotelRoomNotChoose
              hideAddHotel={listHotelRoom.length - 1 === index}
              onPressAddHotel={() => setShowModal(true)}
              onPressAddService={() => setShowModal(true)}
            />
          </Card>
        ))}
      </ScrollView>

      <StepperButton onPressPrevious={onPressPrevious} onPressNext={onSubmit} />

      <ModalBottomSheet
        className="h-[70%]"
        title="Modal"
        show={showModal}
        onClose={() => setShowModal(false)}
      />

      <Toast
        position="bottom"
        bottomOffset={150}
        visibilityTime={3000}
        config={{
          error: (value) => (
            <ToastCustom
              type="error"
              title={value.text1!}
              text={value.text2!}
            />
          ),
        }}
      />
    </View>
  );
};

export default HotelRoomScreen;
