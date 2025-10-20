import { BookingStatusEnum } from "@/constants/bookingStatusEnum";
import { Text, View } from "react-native";

export type BadgeProps = {
  text: string | number;
  variant?: "danger" | "success" | "warning" | "dynamic";
};

const Badge = ({ text, variant }: BadgeProps) => {
  let className = "";
  let classNameText = "text-white";

  switch (variant) {
    case "dynamic":
      className =
        BookingStatusEnum.Pending === text
          ? "bg-yellow-100"
          : BookingStatusEnum.Booked === text
          ? "bg-blue-100"
          : BookingStatusEnum.Paid === text
          ? "bg-green-100"
          : BookingStatusEnum.Canceled === text
          ? "bg-red-100"
          : BookingStatusEnum.Confirmed === text
          ? "bg-emerald-100"
          : BookingStatusEnum.Updated === text
          ? "bg-purple-100"
          : "bg-gray-100";

      classNameText =
        BookingStatusEnum.Pending === text
          ? "text-yellow-600"
          : BookingStatusEnum.Booked === text
          ? "text-blue-600"
          : BookingStatusEnum.Paid === text
          ? "text-green-600"
          : BookingStatusEnum.Canceled === text
          ? "text-red-600"
          : BookingStatusEnum.Confirmed === text
          ? "text-emerald-600"
          : BookingStatusEnum.Updated === text
          ? "text-purple-600"
          : "text-gray-600";

      break;
    case "success":
      className = "bg-green-500";
      break;

    case "warning":
      className = "bg-yellow-500";
      classNameText = "text-black";
      break;

    default:
      className = "bg-red-500";
      break;
  }
  return (
    <View
      className={`${className} items-center justify-center rounded-full p-1`}
    >
      <Text className={`${classNameText} text-sm`}>
        {typeof text === "number"
          ? BookingStatusEnum.Pending === text
            ? "pending"
            : BookingStatusEnum.Booked === text
            ? "booked"
            : BookingStatusEnum.Paid === text
            ? "paid"
            : BookingStatusEnum.Canceled === text
            ? "canceled"
            : BookingStatusEnum.Confirmed === text
            ? "confirmed"
            : BookingStatusEnum.Updated === text
            ? "updated"
            : "processing"
          : text}
      </Text>
    </View>
  );
};

export default Badge;
