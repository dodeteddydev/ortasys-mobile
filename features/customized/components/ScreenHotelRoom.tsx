import Badge from "@/components/Badge";
import Card from "@/components/Card";
import ModalBottomSheet from "@/components/ModalBottomSheet";
import StepperButton from "@/components/StepperButton";
import ToastCustom from "@/components/ToastCustom";
import { colors } from "@/constants/colors";
import { calculateNights } from "@/utilities/calculateNights";
import { FontAwesome } from "@expo/vector-icons";
import { addDays } from "date-fns";
import { useEffect, useState } from "react";
import { ScrollView, Text, View } from "react-native";
import Toast from "react-native-toast-message";
import { useCustomizedContext } from "../context/CustomizedProvider";
import { HotelRoomCustomized } from "../types/customized";
import AddHotelBottomScheetContent from "./AddHotelBottomSheetContent";
import AddServiceBottomScheetContent from "./AddServiceBottomScheetContent";
import CardHotelRoomTitle from "./CardHotelRoomTitle";
import HotelOrServiceSelected from "./HotelOrServiceSelected";
import NoHotelOrServiceSelected from "./NoHotelOrServiceSelected";

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
    day: number | null;
    type: "hotel" | "service" | "idle";
    show: boolean;
  }>({
    datePicked: null,
    day: null,
    type: "idle",
    show: false,
  });

  const handleInitialListHotelRoom = () => {
    const night =
      calculateNights(
        customized?.search?.startStayDate!,
        customized?.search?.endStayDate!
      ) + 1;

    const hotelRoomCustomized: HotelRoomCustomized[] = Array.from(
      { length: night },
      (_, index) => ({
        payload: {
          day: index + 1,
          date: addDays(
            new Date(customized?.search?.startStayDate!),
            index
          ).toISOString(),
          isCheckout: index === night - 1,
          checkIn: index !== night - 1,
          activities: [],
        },
        response: null,
      })
    );

    setCustomized({
      ...customized,
      hotelRoomCustomized: hotelRoomCustomized,
    });
  };

  const handleDelete = (index: number, day: number) => {
    setCustomized({
      ...customized,
      hotelRoomCustomized: customized?.hotelRoomCustomized?.map((value, i) =>
        i === index || value?.response?.partOfDay === day
          ? {
              payload: {
                day: value?.payload?.day,
                date: value?.payload?.date,
                isCheckout: value?.payload?.isCheckout,
                checkIn: value?.payload?.checkIn,
                activities: [],
              },
              response: null,
            }
          : value
      ),
    });
  };

  const onSubmit = () => {
    console.log(JSON.stringify(customized?.hotelRoomCustomized));

    const isHotelAndServiceAdded = customized?.hotelRoomCustomized?.every(
      (hotelRoom) =>
        !!hotelRoom?.payload?.hotelId ||
        !!hotelRoom?.payload?.activities?.[0]?.packageElementId
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
        {customized?.hotelRoomCustomized?.map((value, index) => (
          <Card
            key={index}
            className={`${index === 0 && "mt-4"} m-2 mx-4`}
            title={
              <CardHotelRoomTitle
                payload={value?.payload}
                response={value?.response!}
                onPressEdit={() =>
                  setModalBottomSheet({
                    datePicked: value?.payload?.date ?? null,
                    day: value?.payload?.day ?? null,
                    type: "hotel",
                    show: true,
                  })
                }
                onPressDelete={() => handleDelete(index, value?.payload?.day!)}
              />
            }
          >
            {!value?.response?.partOfDay ? (
              <View className="mb-3 gap-2">
                {value?.payload?.hotelId && (
                  <Badge text="Check In" variant="success" />
                )}
                {customized?.hotelRoomCustomized?.[index - 1]?.payload
                  ?.hotelId && (
                  <Badge
                    text={`Check Out : End of Stay Day ${
                      customized?.hotelRoomCustomized?.[index - 1]?.response
                        ?.partOfDay
                        ? customized?.hotelRoomCustomized?.[index - 1]?.response
                            ?.partOfDay
                        : index
                    }`}
                    variant="danger"
                  />
                )}
              </View>
            ) : (
              <View className="flex flex-row items-center mb-3 gap-2">
                <FontAwesome
                  name="lock"
                  size={20}
                  color={colors.grayInactive}
                />
                <Text className="text-primary text-lg font-bold">
                  Part of a consecutive stay day {value?.response?.partOfDay}
                </Text>
              </View>
            )}

            {value?.payload?.hotelId ||
            value?.payload?.activities?.[0]?.packageElementId ? (
              <HotelOrServiceSelected
                index={index}
                payload={value?.payload}
                response={value?.response!}
                onPressAddService={() =>
                  setModalBottomSheet({
                    datePicked: value?.payload?.date ?? null,
                    day: value?.payload?.day ?? null,
                    type: "service",
                    show: true,
                  })
                }
              />
            ) : (
              <NoHotelOrServiceSelected
                hideAddHotel={
                  customized?.hotelRoomCustomized?.length! - 1 === index
                }
                onPressAddHotel={() =>
                  setModalBottomSheet({
                    datePicked: value?.payload?.date ?? null,
                    day: value?.payload?.day ?? null,
                    type: "hotel",
                    show: true,
                  })
                }
                onPressAddService={() =>
                  setModalBottomSheet({
                    datePicked: value?.payload?.date ?? null,
                    day: value?.payload?.day ?? null,
                    type: "service",
                    show: true,
                  })
                }
              />
            )}
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
          setModalBottomSheet({
            datePicked: null,
            day: null,
            type: "idle",
            show: false,
          })
        }
      >
        {modalBottomSheet.type === "hotel" && (
          <AddHotelBottomScheetContent
            datePicked={modalBottomSheet.datePicked}
            day={modalBottomSheet.day}
            onCloseModalBottomSheet={() =>
              setModalBottomSheet({
                datePicked: null,
                day: null,
                type: "idle",
                show: false,
              })
            }
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
