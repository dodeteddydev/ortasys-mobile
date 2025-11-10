import ModalGeneral from "@/components/Modal";
import { colors } from "@/constants/colors";
import { currencyFormat } from "@/utilities/currencyFormat";
import { Feather, MaterialIcons } from "@expo/vector-icons";
import {
  ScrollView,
  Text,
  TouchableOpacity,
  useWindowDimensions,
  View,
} from "react-native";
import { BookingHotelRoomResponse } from "../types/bookingHotelRoomResponse";

type ModalPriceProps = {
  show: boolean;
  data?: BookingHotelRoomResponse;
  onClose: () => void;
  onChangePrice: (rate: number) => void;
};

const ModalMorePrice = ({
  show,
  data,
  onClose,
  onChangePrice,
}: ModalPriceProps) => {
  const { width } = useWindowDimensions();

  return (
    <ModalGeneral show={show}>
      <View className="gap-2" style={{ width: width - 100, maxHeight: 300 }}>
        <View className="flex flex-row items-center justify-between">
          <Text
            numberOfLines={1}
            ellipsizeMode="tail"
            className="text-lg font-bold text-primary max-w-[80%]"
          >
            Other Price For {data?.roomTypeDescription || "This Room"}
          </Text>

          <TouchableOpacity activeOpacity={0.8} onPress={onClose}>
            <MaterialIcons name="close" size={24} color={colors.primary} />
          </TouchableOpacity>
        </View>

        {data && data?.rates && data?.rates?.length > 1 ? (
          <ScrollView>
            {data?.rates?.map((value, index) => (
              <View
                key={index}
                className={
                  data?.rates.length === index + 1 ? "" : "pb-3 border-b"
                }
              >
                <Text className="text-gray-400">{value?.code}</Text>

                <View className="flex flex-row items-center gap-2">
                  <Text className="text-lg font-bold text-primary">
                    {currencyFormat(value?.rate)}
                  </Text>
                  <Text className="flex-1 text-sm text-gray-400">/ night</Text>
                  <TouchableOpacity
                    activeOpacity={0.8}
                    className="bg-primary rounded-md p-2"
                    onPress={() => onChangePrice(value?.rate)}
                  >
                    <Feather name="check" size={24} color="white" />
                  </TouchableOpacity>
                </View>

                <View className="flex flex-row items-center gap-2 pe-3">
                  <Feather name="alert-octagon" size={15} color="#ef4444" />
                  <Text className="uppercase overflow-auto text-sm text-red-500">
                    VALID FOR{" "}
                    {value?.markets?.map((market) => market).join(", ")} MARKET
                    ONLY
                  </Text>
                </View>
              </View>
            ))}
          </ScrollView>
        ) : (
          <Text className="text-center text-gray-400 my-6">
            No other price available
          </Text>
        )}
      </View>
    </ModalGeneral>
  );
};

export default ModalMorePrice;
