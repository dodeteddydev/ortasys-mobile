import { ReactNode } from "react";
import {
  KeyboardAvoidingView,
  Modal,
  Platform,
  ScrollView,
  Text,
  View,
} from "react-native";

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
        <KeyboardAvoidingView
          behavior={Platform.OS === "ios" ? "padding" : "height"}
        >
          <ScrollView
            contentContainerStyle={{
              flexGrow: 1,
              justifyContent: position === "center" ? "center" : "flex-start",
              alignItems: "center",
            }}
            showsVerticalScrollIndicator={false}
            keyboardShouldPersistTaps="handled"
          >
            <View className="bg-white rounded-xl shadow-xl p-3 my-10">
              {title && (
                <Text className="text-lg font-bold text-primary">{title}</Text>
              )}

              {children}
            </View>
          </ScrollView>
        </KeyboardAvoidingView>
      </View>
    </Modal>
  );
};

export default ModalGeneral;
