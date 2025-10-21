import { ReactNode } from "react";
import { Modal, Text, View } from "react-native";

type ModalGeneralProps = {
  show: boolean;
  title?: string;
  children?: ReactNode;
  position?: "center" | "bottom" | "top";
};
const ModalGeneral = ({
  show,
  title,
  children,
  position = "center",
}: ModalGeneralProps) => {
  return (
    <Modal transparent visible={show} animationType="fade">
      <View className={`flex-1 justify-${position} items-center bg-black/50`}>
        <View className="bg-white rounded-xl shadow-xl p-3 my-10">
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
