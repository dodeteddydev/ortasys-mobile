import { Text, View } from "react-native";
import { PackageSimpleResponse } from "../types/packageSimpleResponse";
import { currencyFormat } from "@/utilities/currencyFormat";
import NetworkImage from "@/components/NetworkImage";

type ServiceItemProps = {
  data: PackageSimpleResponse;
};

const ServiceItem = ({ data }: ServiceItemProps) => {
  return (
    <View className="border-b border-gray-200 pb-3 mb-3">
      <Text className="text-lg font-bold text-primary">
        {data?.productName}
      </Text>

      <View className="flex flex-row gap-3">
        <NetworkImage path={data?.productImage} />

        <View className="flex-1">
          <Text className="text-primary">{data?.vendorName}</Text>
          <Text className="text-gray-400">{data?.description}</Text>
          <Text className="text-gray-400">
            {currencyFormat(data?.priceAdult)} x Adult
          </Text>
          <Text className="text-gray-400">
            {currencyFormat(data?.priceChild)} x Child
          </Text>
        </View>
      </View>
    </View>
  );
};

export default ServiceItem;
