import Button from "@/components/Button";
import Error from "@/components/Error";
import Loading from "@/components/Loading";
import StepperButton from "@/components/StepperButton";
import ToastCustom from "@/components/ToastCustom";
import { calculateNights } from "@/utilities/calculateNights";
import { zodResolver } from "@hookform/resolvers/zod";
import { useCallback, useEffect, useRef, useState } from "react";
import { useForm } from "react-hook-form";
import { RefreshControl, ScrollView, View } from "react-native";
import Toast from "react-native-toast-message";
import { useBookingContext } from "../context/BookingProvider";
import { useGetBookingHotel } from "../hooks/useGetBookingHotel";
import {
  guestInformationSchema,
  GuestInformationSchema,
} from "../schemas/guestInformationSchema";
import { BookingHotelQueryParams } from "../types/bookingHotelQueryParams";
import BookingBreakdownSection from "./BookingBreakdownSection";
import FormGuestInformation from "./FormGuestInformation";
import HotelSection from "./HotelSection";
import ModalFilterBookingInformation from "./ModalFilterBookingInformation";
import ModalMorePrice from "./ModalMorePrice";
import RoomSection from "./RoomSection";

type ScreenBookingInformationProps = {
  params: BookingHotelQueryParams;
  onNextStep: () => void;
};

const ScreenBookingInformation = ({
  params,
  onNextStep,
}: ScreenBookingInformationProps) => {
  const { booking, setBooking } = useBookingContext();
  const scrollViewRef = useRef<ScrollView>(null);
  const formRef = useRef<View>(null);

  const [queryParams, setQueryParams] =
    useState<BookingHotelQueryParams>(params);
  const [showModalFilter, setShowModalFilter] = useState<boolean>(false);
  const [showModalPrice, setShowModalPrice] = useState<{
    show: boolean;
    hotelId?: number;
  }>({ show: false });
  const [refreshing, setRefreshing] = useState<boolean>(false);

  const { data, isLoading, isError, error, refetch } = useGetBookingHotel({
    enabled: !!queryParams?.hotelId,
    hotelId: queryParams?.hotelId!,
    params: queryParams,
  });

  const {
    control,
    handleSubmit,
    reset,
    watch,
    setValue,
    formState: { errors },
  } = useForm<GuestInformationSchema>({
    resolver: zodResolver(guestInformationSchema),
    defaultValues: {
      guestFirstName: "",
      guestLastName: "",
      guestEmail: "",
      guestPhone: "",
      guestCountry: "",
      guestZipcode: "",
      specialRequest: "",
      bookingRoom: [],
    },
  });

  const bookingRoom = watch("bookingRoom");

  const onRefresh = useCallback(async () => {
    setRefreshing(true);
    await refetch();
    setRefreshing(false);
  }, [refetch]);

  const handleChangeTotalRoom = (value: number, hotelId: number) => {
    const newBookingRoom = bookingRoom?.map((room) => {
      if (room?.hotelId === hotelId) {
        return {
          ...room,
          totalRoom: value,
        };
      }
      return room;
    });

    setValue("bookingRoom", newBookingRoom);
  };

  const handleChangePriceRate = (rate: number) => {
    const newBookingRoom = bookingRoom?.map((room) => {
      if (room?.hotelId === showModalPrice?.hotelId) {
        return {
          ...room,
          pricePerNight: rate,
        };
      }
      return room;
    });

    setValue("bookingRoom", newBookingRoom);

    setShowModalPrice({ show: false, hotelId: undefined });
  };

  const handleNavigateToPayment = (data: GuestInformationSchema) => {
    setBooking({
      checkIn: queryParams?.checkIn || "",
      checkOut: queryParams?.checkOut || "",
      person:
        (Number(queryParams?.maxAdult) ?? 0) +
        (Number(queryParams?.maxChild) ?? 0),
      hotelId: queryParams?.hotelId || 0,
      marketId: null,
      child: queryParams?.maxChild || 0,
      night: calculateNights(queryParams?.checkIn!, queryParams?.checkOut!),
      adult: queryParams?.maxAdult || 0,
      guestFirstName: data?.guestFirstName || "",
      guestLastName: data?.guestLastName || "",
      guestEmail: data?.guestEmail || "",
      guestPhone: data?.guestPhone || "",
      specialRequest: data?.specialRequest || "",
      bookingRooms: data?.bookingRoom ?? [],
      guestCountry: data?.guestCountry || "",
      guestZipcode: data?.guestZipcode || "",
    });

    onNextStep();
  };

  const handleError = () => {
    requestAnimationFrame(() => {
      if (formRef.current && scrollViewRef.current) {
        formRef.current.measure((_, __, ___, ____, ______, pageY) => {
          scrollViewRef.current?.scrollTo({ y: pageY - 100, animated: true });
        });
      }
    });
  };

  const handleNextStep = () => {
    const isAddRoomAtLeastOne = bookingRoom?.some(
      (value) => value?.totalRoom > 0
    );

    if (isAddRoomAtLeastOne) {
      handleSubmit(handleNavigateToPayment, handleError)();
    } else {
      Toast.show({
        type: "error",
        text1: "Almost there 👋",
        text2: "Please add at least one room to continue.",
      });
    }
  };

  const handleInitialValue = () => {
    const rooms = data?.data.map((value) => ({
      hotelId: value?.id,
      hotelRoomId: value?.hotelRoomId,
      totalRoom: 0,
      pricePerNight: value?.price,
      extraBedRate: value?.extraBedRate,
      totalExtraBed: 0,
      contractRateId: value?.contractRateId,
      rateId: value?.rateId,
    }));

    reset({
      guestFirstName: booking?.guestFirstName || "",
      guestLastName: booking?.guestLastName || "",
      guestEmail: booking?.guestEmail || "",
      guestPhone: booking?.guestPhone || "",
      guestCountry: booking?.guestCountry || "",
      guestZipcode: booking?.guestZipcode || "",
      specialRequest: booking?.specialRequest || "",
      bookingRoom: booking ? booking?.bookingRooms : rooms,
    });
  };

  useEffect(() => {
    if (!data?.data) return;
    handleInitialValue();
  }, [data, queryParams.checkIn, queryParams.checkOut, reset, booking]);

  return isLoading ? (
    <Loading />
  ) : isError ? (
    <Error statusCode={error?.response?.status ?? ""} />
  ) : (
    <>
      <View className="flex-1">
        <ScrollView
          ref={scrollViewRef}
          refreshControl={
            <RefreshControl refreshing={refreshing} onRefresh={onRefresh} />
          }
        >
          <HotelSection data={data?.data[0]!} />

          <RoomSection
            data={data?.data ?? []}
            bookingRoom={bookingRoom ?? []}
            onShowModalFilter={() => setShowModalFilter(true)}
            onChangeTotalRoom={handleChangeTotalRoom}
            onShowModalPrice={(hotelId) =>
              setShowModalPrice({ show: true, hotelId })
            }
          />

          <BookingBreakdownSection queryParams={queryParams} />

          <View ref={formRef}>
            <FormGuestInformation control={control} errors={errors} />
          </View>
        </ScrollView>

        <StepperButton>
          <Button
            className="m-6 mb-10 w-full h-14"
            text="Next Step"
            onPress={handleNextStep}
          />
        </StepperButton>
      </View>

      <ModalFilterBookingInformation
        show={showModalFilter}
        params={params}
        onClose={() => setShowModalFilter(false)}
        onApplyFilter={(params) => {
          setQueryParams(params);
          setShowModalFilter(false);
        }}
      />

      <ModalMorePrice
        data={data?.data?.find((value) => value.id === showModalPrice?.hotelId)}
        show={showModalPrice?.show}
        onClose={() => setShowModalPrice({ show: false, hotelId: undefined })}
        onChangePrice={handleChangePriceRate}
      />

      <Toast
        position="bottom"
        bottomOffset={110}
        visibilityTime={3000}
        config={{
          error: (value) => (
            <ToastCustom
              type="error"
              title={value?.text1!}
              text={value?.text2!}
            />
          ),
        }}
      />
    </>
  );
};

export default ScreenBookingInformation;
