import Button from "@/components/Button";
import ModalGeneral from "@/components/Modal";
import { colors } from "@/constants/colors";
import { FontAwesome } from "@expo/vector-icons";
import { Text, useWindowDimensions, View } from "react-native";

type ModalBookingSuccessProps = {
  showModal: boolean;
  onPressHome: () => void;
  onCreateNewBooking: () => void;
};

const ModalBookingSuccess = ({
  showModal,
  onPressHome,
  onCreateNewBooking,
}: ModalBookingSuccessProps) => {
  const { width } = useWindowDimensions();

  return (
    <ModalGeneral show={showModal}>
      <View className="items-center" style={{ width: width - 100 }}>
        <Text className="text-lg font-bold text-primary">Thank you!</Text>
        <Text className="text-gray-400">
          Your booking has been successfully created.
        </Text>

        <FontAwesome name="check-circle" size={60} color={colors.primary} />

        <View className="flex flex-row justify-center gap-2 mt-4">
          <Button
            className="bg-white shadow-md border border-primary rounded-lg px-2 py-1"
            classNameText="text-lg text-primary font-semibold"
            text="Back to Home"
            onPress={onPressHome}
          />

          <Button
            className="p-1 px-2"
            classNameText="text-lg font-semibold text-white"
            text="Create New Booking"
            onPress={onCreateNewBooking}
          />
        </View>
      </View>
    </ModalGeneral>
  );
};

export default ModalBookingSuccess;
