import Badge from "@/components/Badge";
import Card from "@/components/Card";
import { colors } from "@/constants/colors";
import ButtonDownloadPDFBooking from "@/features/booking/components/ButtonDownloadPDFBooking";
import HorizontalDataPreview from "@/features/customized/components/HorizontalDataPreview";
import { calculateNights } from "@/utilities/calculateNights";
import { dateFormat } from "@/utilities/dateFormat";
import {
  FontAwesome,
  FontAwesome5,
  Fontisto,
  MaterialIcons,
  Octicons,
} from "@expo/vector-icons";
import { View } from "react-native";
import { ReportResponse } from "../types/reportResponse";
import { currencyFormat } from "@/utilities/currencyFormat";

type CardReportItemProps = {
  item: ReportResponse;
};

const CardReportItem = ({ item }: CardReportItemProps) => {
  return (
    <Card className="mb-3">
      <View className="gap-3">
        <Badge text={item?.status} variant="dynamic" />

        <HorizontalDataPreview
          icon={
            <FontAwesome
              name="calendar"
              size={22}
              color={colors.grayInactive}
            />
          }
          title="Booking Date"
          description={dateFormat(item?.bookingDate, "day-long")}
        />

        <HorizontalDataPreview
          icon={<Fontisto name="hotel" size={18} color={colors.grayInactive} />}
          title="Hotel Name"
          description={item?.hotelName}
        />

        <HorizontalDataPreview
          icon={
            <Octicons name="person" size={24} color={colors.grayInactive} />
          }
          title="Guest Name"
          description={item?.hotelName}
        />

        <HorizontalDataPreview
          icon={
            <FontAwesome
              name="calendar-check-o"
              size={22}
              color={colors.grayInactive}
            />
          }
          title="Check In Date"
          description={dateFormat(item?.checkIn, "day-long")}
        />

        <HorizontalDataPreview
          icon={
            <FontAwesome
              name="calendar-times-o"
              size={22}
              color={colors.grayInactive}
            />
          }
          title="Check Out Date"
          description={dateFormat(item?.checkOut, "day-long")}
        />

        <HorizontalDataPreview
          icon={
            <MaterialIcons name="bed" size={24} color={colors.grayInactive} />
          }
          title="Night"
          description={calculateNights(
            item?.checkIn,
            item?.checkOut
          ).toString()}
        />

        <HorizontalDataPreview
          icon={
            <FontAwesome name="money" size={24} color={colors.grayInactive} />
          }
          title="Amount"
          description={currencyFormat(item?.amount)}
        />

        <ButtonDownloadPDFBooking bookingId={item?.id} />
      </View>
    </Card>
  );
};

export default CardReportItem;
