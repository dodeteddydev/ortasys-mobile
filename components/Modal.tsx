import { ReactNode } from "react";
import { Modal, Text, View } from "react-native";

type ModalGeneralProps = {
  show: boolean;
  title?: string;
  children?: ReactNode;
};
const ModalGeneral = ({ show, title, children }: ModalGeneralProps) => {
  return (
    <Modal transparent visible={show} animationType="fade">
      <View className="flex-1 justify-center items-center bg-black/50">
        <View className="bg-white rounded-xl shadow-xl p-3">
          {title && (
            <Text className="text-lg font-bold text-primary">{title}</Text>
          )}

          {children}
        </View>
      </View>
    </Modal>
  );
};

export default ModalGeneral;
