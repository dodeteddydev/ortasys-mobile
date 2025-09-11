import { Keyboard, Text, TouchableOpacity } from "react-native";

type ButtonProps = {
  text?: string;
  loading?: boolean;
  onPress?: () => void;
  className?: string;
  classNameText?: string;
};

const Button = ({
  text,
  loading,
  onPress,
  className,
  classNameText,
}: ButtonProps) => {
  return (
    <TouchableOpacity
      onPress={() => {
        onPress && onPress();
        Keyboard.dismiss();
      }}
      disabled={loading}
      activeOpacity={0.8}
      className={`bg-primary items-center justify-center rounded-lg ${
        loading && "opacity-70"
      } ${className}`}
    >
      <Text
        className={`${classNameText ?? "text-xl text-white font-semibold"}`}
      >
        {loading ? "Loading..." : text}
      </Text>
    </TouchableOpacity>
  );
};

export default Button;
