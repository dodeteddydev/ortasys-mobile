import { useGetImage } from "@/hooks/useGetImage";
import { Image } from "expo-image";
import { useEffect, useState } from "react";
import { ImageSourcePropType, View } from "react-native";
import loading from "@/assets/images/vectors/loading.png";
import error from "@/assets/images/vectors/error.png";

type NetworkImageProps = {
  className?: string;
  path: string;
};

const NetworkImage = ({ className, path }: NetworkImageProps) => {
  const [source, setSource] = useState<ImageSourcePropType | { uri: string }>(
    loading
  );
  const { isLoading, data } = useGetImage(!!path, path);

  useEffect(() => {
    if (data?.data) {
      setSource({ uri: data?.data });
    } else {
      setSource(error);
    }
  }, [data]);

  return (
    <View className={`h-24 w-24 bg-gray-200 rounded-lg shadow-sm ${className}`}>
      <Image
        style={{
          width: "100%",
          height: "100%",
          borderRadius: 6,
        }}
        source={isLoading ? loading : source}
        contentFit="contain"
        transition={1000}
      />
    </View>
  );
};

export default NetworkImage;
