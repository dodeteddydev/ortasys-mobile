import { Text, View } from "react-native";

export type BadgeProps = {
  text: string;
  variant?: "danger" | "success" | "warning";
};

const Badge = ({ text, variant }: BadgeProps) => {
  let className = "";
  let classNameText = "text-white";

  switch (variant) {
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
      <Text className={`${classNameText} text-sm`}>{text}</Text>
    </View>
  );
};

export default Badge;
