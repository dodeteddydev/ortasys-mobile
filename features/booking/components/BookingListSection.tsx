import DataNotFound from "@/components/DataNotFound";
import Error from "@/components/Error";
import Loading from "@/components/Loading";
import { router } from "expo-router";
import { FlatList } from "react-native";
import { useGetBookingList } from "../hooks/useGetBookingList";
import { BookingListQueryParams } from "../types/bookingListQueryParams";
import CardBookingListItem from "./CardBookingListItem";
import { BookingHotelQueryParams } from "../types/bookingHotelQueryParams";

type BookingListSectionProps = {
  params?: BookingListQueryParams;
};

const BookingListSection = ({ params }: BookingListSectionProps) => {
  const { data, isFetching, refetch, isError, error } = useGetBookingList({
    enabled: !!params,
    params: params,
  });

  const onRefresh = () => {
    refetch();
  };

  if (isFetching) return <Loading />;

  if (isError) return <Error statusCode={error.response?.status ?? ""} />;

  return data?.data && data?.data?.length! > 0 ? (
    <FlatList
      data={data?.data}
      keyExtractor={(_, index) => index.toString()}
      refreshing={isFetching}
      onRefresh={onRefresh}
      keyboardShouldPersistTaps="handled"
      contentContainerStyle={{ padding: 12 }}
      renderItem={({ item }) => (
        <CardBookingListItem
          params={params}
          data={item}
          onBookNow={() =>
            router.push({
              pathname: "/booking/create",
              params: {
                checkIn: params?.checkIn,
                checkOut: params?.checkOut,
                maxAdult: params?.maxAdult || 0,
                maxChild: params?.maxChild || 0,
                hotelId: item?.id,
              } as BookingHotelQueryParams,
            })
          }
        />
      )}
    />
  ) : (
    <DataNotFound />
  );
};

export default BookingListSection;
