import BookingFilterSection from "@/features/booking/components/BookingFilterSection";
import BookingListSection from "@/features/booking/components/BookingListSection";
import { BookingListQueryParams } from "@/features/booking/types/bookingListQueryParams";
import { useState } from "react";
import { View } from "react-native";

const BookingSearch = () => {
  const [params, setParams] = useState<BookingListQueryParams>();

  return (
    <View className="flex-1">
      <BookingFilterSection onSearch={(params) => setParams(params)} />

      <BookingListSection params={params} />
    </View>
  );
};

export default BookingSearch;
