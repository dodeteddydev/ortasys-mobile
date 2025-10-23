import React, { useState } from "react";
import { Text, TouchableOpacity, TouchableWithoutFeedback } from "react-native";

type TextWithShowMoreProps = {
  text: string;
  maxLength?: number;
  classNameText?: string;
  classNameTextAction?: string;
};

const TextWithShowMore: React.FC<TextWithShowMoreProps> = ({
  text,
  maxLength = 100,
  classNameText,
  classNameTextAction,
}) => {
  const [expanded, setExpanded] = useState(false);

  const isLong = text.length > maxLength;
  const displayedText = expanded
    ? text
    : text.slice(0, maxLength) + (isLong ? "..." : "");

  const handleToggle = () => setExpanded((prev) => !prev);

  return (
    <Text className={classNameText || "text-sm text-gray-400"}>
      {displayedText}
      {isLong && (
        <TouchableWithoutFeedback onPress={handleToggle}>
          <Text className={classNameTextAction || "text-sm text-primary"}>
            {expanded ? " Show less" : " Show more"}
          </Text>
        </TouchableWithoutFeedback>
      )}
    </Text>
  );
};

export default TextWithShowMore;
