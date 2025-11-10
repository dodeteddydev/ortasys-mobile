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
import { Text, View } from "react-native";
import { BookingRequest } from "../types/bookingRequest";

type PaymentDetailSectionProps = {
  data?: BookingRequest;
};

const PaymentDetailSection = ({ data }: PaymentDetailSectionProps) => {
  const totalRoom = data?.bookingRooms?.reduce((prev, curr) => {
    return prev + curr?.totalRoom;
  }, 0);

  return (
    <>
      <View className="mx-5 my-2">
        <Text className="text-lg font-bold text-primary">Payment Details</Text>
        <Text className="text-sm text-gray-400">
          Please review your payment information before proceeding.
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
            description={dateFormat(data?.checkIn!, "day-long")}
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
            description={dateFormat(data?.checkOut!, "day-long")}
          />

          <HorizontalDataPreview
            icon={
              <Octicons name="person" size={24} color={colors.grayInactive} />
            }
            title="Adult"
            description={data?.adult?.toString() ?? "0"}
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
            description={data?.child?.toString() ?? "0"}
          />

          <HorizontalDataPreview
            icon={
              <MaterialIcons name="bed" size={24} color={colors.grayInactive} />
            }
            title="Total Night"
            description={calculateNights(
              data?.checkIn!,
              data?.checkOut!
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
            description={totalRoom?.toString() || "0"}
          />
        </View>
      </Card>
    </>
  );
};

export default PaymentDetailSection;
