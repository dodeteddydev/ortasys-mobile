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
import ServiceItem from "./ServiceItem";

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
    const hotelRooms = customized?.hotelRoomCustomized ?? [];

    const isHotelAndServiceAdded = hotelRooms.every(
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
        text2: "Please add at least one hotel or service each day to continue.",
      });
    }
  };

  useEffect(() => {
    if (!customized?.hotelRoomCustomized?.length) {
      handleInitialListHotelRoom();
    }
  }, []);

  return (
    <View className="flex-1">
      <ScrollView
        keyboardShouldPersistTaps="handled"
        showsVerticalScrollIndicator={false}
      >
        {customized?.hotelRoomCustomized?.map((value, idxHotelRoom) => (
          <Card
            key={idxHotelRoom}
            className={`${idxHotelRoom === 0 && "mt-4"} m-2 mx-4`}
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
                onPressDelete={() =>
                  handleDelete(idxHotelRoom, value?.payload?.day!)
                }
              />
            }
          >
            {!value?.response?.partOfDay ? (
              <View className="mb-3 gap-2">
                {value?.payload?.hotelId && (
                  <Badge text="Check In" variant="success" />
                )}
                {customized?.hotelRoomCustomized?.[idxHotelRoom - 1]?.payload
                  ?.hotelId && (
                  <Badge
                    text={`Check Out : End of Stay Day ${
                      customized?.hotelRoomCustomized?.[idxHotelRoom - 1]
                        ?.response?.partOfDay
                        ? customized?.hotelRoomCustomized?.[idxHotelRoom - 1]
                            ?.response?.partOfDay
                        : idxHotelRoom
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
              <>
                {value?.payload?.hotelId ? (
                  <HotelOrServiceSelected
                    index={idxHotelRoom}
                    payload={value?.payload}
                    response={value?.response!}
                  />
                ) : (
                  customized?.hotelRoomCustomized?.length! - 1 !==
                    idxHotelRoom && (
                    <NoHotelOrServiceSelected
                      hideAddService
                      text="No hotel selected for this night"
                      onPressAddHotel={() =>
                        setModalBottomSheet({
                          datePicked: value?.payload?.date ?? null,
                          day: value?.payload?.day ?? null,
                          type: "hotel",
                          show: true,
                        })
                      }
                    />
                  )
                )}

                {value?.response?.activities?.length! > 0 && (
                  <View className="border-b border-gray-200 my-3" />
                )}

                {value?.response?.activities?.map((activity, idxActivity) => (
                  <ServiceItem
                    key={idxActivity}
                    idxHotelRoom={idxHotelRoom}
                    idxActivity={idxActivity}
                    data={activity}
                  />
                ))}
                <NoHotelOrServiceSelected
                  hideAddHotel
                  text="Add other service for this night"
                  onPressAddService={() =>
                    setModalBottomSheet({
                      datePicked: value?.payload?.date ?? null,
                      day: value?.payload?.day ?? null,
                      type: "service",
                      show: true,
                    })
                  }
                />
              </>
            ) : (
              <NoHotelOrServiceSelected
                hideAddHotel={
                  customized?.hotelRoomCustomized?.length! - 1 === idxHotelRoom
                }
                text={
                  customized?.hotelRoomCustomized?.length! - 1 === idxHotelRoom
                    ? "No service selected for this night"
                    : "No hotel or service selected for this night"
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
          <AddServiceBottomScheetContent
            datePicked={modalBottomSheet.datePicked}
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
