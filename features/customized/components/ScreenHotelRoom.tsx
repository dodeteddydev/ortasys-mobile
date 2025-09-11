import Card from "@/components/Card";
import ModalBottomSheet from "@/components/ModalBottomSheet";
import StepperButton from "@/components/StepperButton";
import ToastCustom from "@/components/ToastCustom";
import { calculateNights } from "@/utilities/calculateNights";
import { addDays } from "date-fns";
import { useEffect, useState } from "react";
import { ScrollView, View } from "react-native";
import Toast from "react-native-toast-message";
import { useCustomizedContext } from "../context/CustomizedProvider";
import { HotelRoomSchema } from "../schemas/hotelRoomSchema";
import AddHotelBottomScheetContent from "./AddHotelBottomSheetContent";
import AddServiceBottomScheetContent from "./AddServiceBottomScheetContent";
import NoHotelOrServiceSelected from "./NoHotelOrServiceSelected";
import CardHotelRoomTitle from "./CardHotelRoomTitle";

type ScreenHotelRoomProps = {
  onPressPrevious: () => void;
  onPressNext: () => void;
};

const ScreenHotelRoom = ({
  onPressPrevious,
  onPressNext,
}: ScreenHotelRoomProps) => {
  const { customized, setCustomized } = useCustomizedContext();
  const [modalBottomSheet, setModalBottomSheet] = useState<{
    datePicked: string | null;
    type: "hotel" | "service" | "idle";
    show: boolean;
  }>({
    datePicked: null,
    type: "idle",
    show: false,
  });

  const handleInitialListHotelRoom = () => {
    const night =
      calculateNights(
        customized?.search?.startStayDate!,
        customized?.search?.endStayDate!
      ) + 1;

    const hotelRooms: HotelRoomSchema[] = Array.from(
      { length: night },
      (_, index) => ({
        day: index + 1,
        date: addDays(
          new Date(customized?.search?.startStayDate!),
          index
        ).toISOString(),
        isCheckout: index !== 0,
        activities: [],
      })
    );

    setCustomized({
      ...customized,
      hotelRoom: hotelRooms,
    });
  };

  const onSubmit = () => {
    const isHotelAndServiceAdded = customized?.hotelRoom?.some(
      (hotelRoom) =>
        !!hotelRoom.hotelId || !!hotelRoom?.activities?.[0]?.packageElementId
    );

    if (isHotelAndServiceAdded) {
      onPressNext();
    } else {
      Toast.show({
        type: "error",
        text1: "Almost there 👋",
        text2: "Add a hotel or service to continue.",
      });
    }
  };

  useEffect(() => {
    handleInitialListHotelRoom();
  }, []);

  return (
    <View className="flex-1">
      <ScrollView
        keyboardShouldPersistTaps="handled"
        showsVerticalScrollIndicator={false}
      >
        {customized?.hotelRoom?.map((value, index) => (
          <Card
            key={index}
            className={`${index === 0 && "mt-4"} ${
              index === customized?.hotelRoom?.length! - 1 && "mb-4"
            } m-2 mx-4`}
            title={<CardHotelRoomTitle day={value?.day!} date={value?.date!} />}
          >
            <NoHotelOrServiceSelected
              hideAddHotel={customized?.hotelRoom?.length! - 1 === index}
              onPressAddHotel={() =>
                setModalBottomSheet({
                  datePicked: value.date ?? null,
                  type: "hotel",
                  show: true,
                })
              }
              onPressAddService={() =>
                setModalBottomSheet({
                  datePicked: value.date ?? null,
                  type: "service",
                  show: true,
                })
              }
            />
          </Card>
        ))}
      </ScrollView>

      <StepperButton onPressPrevious={onPressPrevious} onPressNext={onSubmit} />

      <ModalBottomSheet
        className="h-[70%]"
        title={`Find ${
          modalBottomSheet.type === "hotel" ? "hotels" : "products"
        } in ${customized?.search?.stateName}, ${
          customized?.search?.countryName
        }`}
        show={modalBottomSheet.show}
        onClose={() =>
          setModalBottomSheet({ datePicked: null, type: "idle", show: false })
        }
      >
        {modalBottomSheet.type === "hotel" && (
          <AddHotelBottomScheetContent
            datePicked={modalBottomSheet.datePicked}
          />
        )}
        {modalBottomSheet.type === "service" && (
          <AddServiceBottomScheetContent />
        )}
      </ModalBottomSheet>

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

export default ScreenHotelRoom;
