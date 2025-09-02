import { Text, View } from "react-native";

type CardProps = {
  title?: string;
  children?: React.ReactNode;
};

const Card = ({ title, children }: CardProps) => {
  return (
    <View className="bg-white rounded-xl shadow-sm">
      {title && (
        <Text className="text-lg font-bold text-primary p-2">{title}</Text>
      )}
      <View className={title ? "px-4 pb-4" : "p-4"}>{children}</View>
    </View>
  );
};

export default Card;
