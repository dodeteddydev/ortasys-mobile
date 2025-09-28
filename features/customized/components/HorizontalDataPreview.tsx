import { Text, View } from "react-native";

type HorizontalDataPreviewProps = {
  icon: React.ReactNode;
  title: string;
  description: string;
};

const HorizontalDataPreview = ({
  icon,
  title,
  description,
}: HorizontalDataPreviewProps) => {
  return (
    <View className="flex flex-row items-center justify-between">
      <View className="flex flex-row items-center gap-2">
        <View className="w-8 h-8 items-center justify-center">{icon}</View>

        <Text className="text-primary font-medium">{title}</Text>
      </View>

      <Text>{description}</Text>
    </View>
  );
};

export default HorizontalDataPreview;
