import { ReactNode, useEffect, useRef } from "react";
import {
  Animated,
  Dimensions,
  Modal,
  Text,
  TouchableOpacity,
  View,
} from "react-native";
import AntDesign from "@expo/vector-icons/AntDesign";
import { colors } from "@/constants/colors";

const screenHeight = Dimensions.get("window").height;

type ModalBottomSheetProps = {
  show: boolean;
  title?: string;
  className?: string;
  children?: ReactNode;
  onClose?: () => void;
};
const ModalBottomSheet = ({
  show,
  title,
  className,
  children,
  onClose,
}: ModalBottomSheetProps) => {
  const slideAnim = useRef(new Animated.Value(screenHeight)).current;

  useEffect(() => {
    if (show) {
      Animated.timing(slideAnim, {
        toValue: 0,
        duration: 300,
        useNativeDriver: true,
      }).start();
    } else {
      Animated.timing(slideAnim, {
        toValue: screenHeight,
        duration: 300,
        useNativeDriver: true,
      }).start();
    }
  }, [show]);

  return (
    <Modal transparent visible={show} animationType="fade">
      <View className="flex-1 justify-end bg-black/50">
        <Animated.View
          style={{
            transform: [{ translateY: slideAnim }],
          }}
          className={`min-h-[20%] bg-white rounded-t-3xl shadow-xl p-3 ${className}`}
        >
          <View className="flex flex-row items-center">
            <View className="flex-1">
              {title && (
                <Text className="text-lg font-bold text-primary">{title}</Text>
              )}
            </View>

            <TouchableOpacity activeOpacity={0.8} onPress={onClose}>
              <AntDesign name="close" size={32} color={colors.primary} />
            </TouchableOpacity>
          </View>

          {children}
        </Animated.View>
      </View>
    </Modal>
  );
};

export default ModalBottomSheet;
