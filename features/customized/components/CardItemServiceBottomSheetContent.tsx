import NetworkImage from "@/components/NetworkImage";
import { Text, View } from "react-native";
import { PackageSimpleResponse } from "../types/packageSimpleResponse";
import { currencyFormat } from "@/utilities/currencyFormat";
import Button from "@/components/Button";

type CardItemServiceBottomSheetContentProps = {
  dataPackage: PackageSimpleResponse;
};

const CardItemServiceBottomSheetContent = ({
  dataPackage,
}: CardItemServiceBottomSheetContentProps) => {
  return (
    <View className="mb-4 px-4 pb-4 bg-white rounded-lg shadow-lg">
      <Text className="text-lg font-bold text-primary">
        {dataPackage?.productName}
      </Text>

      <View className="flex flex-row items-center gap-3">
        <NetworkImage path={dataPackage?.productImage} />

        <View className="flex-1">
          <Text className="text-primary">{dataPackage?.vendorName}</Text>
          <Text className="text-gray-400">{dataPackage?.description}</Text>
          <Text className="text-gray-400">
            {currencyFormat(dataPackage?.priceAdult)} x Adult
          </Text>
          <Text className="text-gray-400">
            {currencyFormat(dataPackage?.priceChild)} x Child
          </Text>
        </View>

        <Button
          className="px-4 py-2"
          classNameText="text-lg font-semibold text-white"
          text="Select"
          onPress={() => {}}
        />
      </View>
    </View>
  );
};

export default CardItemServiceBottomSheetContent;
