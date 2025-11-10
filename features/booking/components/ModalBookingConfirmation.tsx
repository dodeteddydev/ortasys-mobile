import Button from "@/components/Button";
import ModalGeneral from "@/components/Modal";
import { Text, useWindowDimensions, View } from "react-native";

type ModalBookingConfirmationProps = {
  showModal: boolean;
  onCancel: () => void;
  onConfirmation: () => void;
};

const ModalBookingConfirmation = ({
  showModal,
  onCancel,
  onConfirmation,
}: ModalBookingConfirmationProps) => {
  const { width } = useWindowDimensions();

  return (
    <ModalGeneral show={showModal}>
      <View className="items-center" style={{ width: width - 100 }}>
        <Text className="text-lg font-bold text-primary">Are you sure?</Text>
        <Text className="text-gray-400">
          Booking can’t be canceled after payment.
        </Text>

        <View className="flex flex-row justify-center gap-2 mt-4">
          <Button
            className="bg-white shadow-md border border-primary rounded-lg px-2 py-1"
            classNameText="text-lg text-primary font-semibold"
            text="Cancel"
            onPress={onCancel}
          />

          <Button
            className="p-1 px-2"
            classNameText="text-lg font-semibold text-white"
            text="Confirm"
            onPress={onConfirmation}
          />
        </View>
      </View>
    </ModalGeneral>
  );
};

export default ModalBookingConfirmation;
