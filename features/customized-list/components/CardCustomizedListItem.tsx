import Badge from "@/components/Badge";
import Card from "@/components/Card";
import { colors } from "@/constants/colors";
import HorizontalDataPreview from "@/features/customized-create/components/HorizontalDataPreview";
import { calculateNights } from "@/utilities/calculateNights";
import { dateFormat } from "@/utilities/dateFormat";
import { MaterialIcons, Octicons } from "@expo/vector-icons";
import { View } from "react-native";
import { CustomizedPackageResponse } from "../types/customizedPackageResponse";
import DownloadPDFBookingInformation from "./DownloadPDFBookingInformation";

type CardCustomizedListItemProps = {
  item: CustomizedPackageResponse;
};

const CardCustomizedListItem = ({ item }: CardCustomizedListItemProps) => {
  return (
    <Card className="mb-3">
      <View className="gap-3">
        <Badge text={item?.status} variant="dynamic" />

        <HorizontalDataPreview
          icon={
            <MaterialIcons
              name="calendar-today"
              size={22}
              color={colors.grayInactive}
            />
          }
          title="Start Stay Date"
          description={dateFormat(item?.startStayDate, "day-long")}
        />

        <HorizontalDataPreview
          icon={
            <MaterialIcons
              name="calendar-today"
              size={22}
              color={colors.grayInactive}
            />
          }
          title="End Stay Date"
          description={dateFormat(item?.endStayDate, "day-long")}
        />

        <HorizontalDataPreview
          icon={
            <MaterialIcons name="bed" size={24} color={colors.grayInactive} />
          }
          title="Night"
          description={calculateNights(
            item?.startStayDate,
            item?.endStayDate
          ).toString()}
        />

        <HorizontalDataPreview
          icon={
            <Octicons name="person" size={24} color={colors.grayInactive} />
          }
          title="Adult"
          description={item?.adult?.toString() ?? "0"}
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
          description={item?.child?.toString() ?? "0"}
        />

        <DownloadPDFBookingInformation bookingId={item?.id} />
      </View>
    </Card>
  );
};

export default CardCustomizedListItem;
