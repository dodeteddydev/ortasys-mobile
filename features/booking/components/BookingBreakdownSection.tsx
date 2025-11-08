import Card from "@/components/Card";
import { colors } from "@/constants/colors";
import HorizontalDataPreview from "@/features/customized/components/HorizontalDataPreview";
import { calculateNights } from "@/utilities/calculateNights";
import { dateFormat } from "@/utilities/dateFormat";
import {
  FontAwesome,
  MaterialCommunityIcons,
  MaterialIcons,
  Octicons,
} from "@expo/vector-icons";
import { View } from "react-native";
import { BookingHotelQueryParams } from "../types/bookingHotelQueryParams";
import { Text } from "react-native";

type BookingBreakdownSectionProps = {
  queryParams: BookingHotelQueryParams;
};

const BookingBreakdownSection = ({
  queryParams,
}: BookingBreakdownSectionProps) => {
  return (
    <>
      <View className="mx-5 my-2">
        <Text className="text-lg font-bold text-primary">
          Booking Breakdown
        </Text>
        <Text className="text-sm text-gray-400">
          Here's breakdown of your booking information.
        </Text>
      </View>

      <Card className="mx-4 my-2">
        <View className="gap-3">
          <HorizontalDataPreview
            icon={
              <FontAwesome
                name="calendar-check-o"
                size={22}
                color={colors.grayInactive}
              />
            }
            title="Check In"
            description={dateFormat(queryParams?.checkIn!, "day-long")}
          />

          <HorizontalDataPreview
            icon={
              <FontAwesome
                name="calendar-times-o"
                size={22}
                color={colors.grayInactive}
              />
            }
            title="Check Out"
            description={dateFormat(queryParams?.checkOut!, "day-long")}
          />

          <HorizontalDataPreview
            icon={
              <Octicons name="person" size={24} color={colors.grayInactive} />
            }
            title="Adult"
            description={queryParams?.maxAdult?.toString() ?? "0"}
          />

          <HorizontalDataPreview
            icon={
              <MaterialIcons
                name="child-care"
                size={24}
                color={colors.grayInactive}
              />
            }
            title="Child"
            description={queryParams?.maxChild?.toString() ?? "0"}
          />

          <HorizontalDataPreview
            icon={
              <MaterialIcons name="bed" size={24} color={colors.grayInactive} />
            }
            title="Total Night"
            description={calculateNights(
              queryParams?.checkIn!,
              queryParams?.checkOut!
            ).toString()}
          />

          <HorizontalDataPreview
            icon={
              <MaterialCommunityIcons
                name="door"
                size={24}
                color={colors.grayInactive}
              />
            }
            title="Total Room"
            description={calculateNights(
              queryParams?.checkIn!,
              queryParams?.checkOut!
            ).toString()}
          />
        </View>
      </Card>
    </>
  );
};

export default BookingBreakdownSection;
