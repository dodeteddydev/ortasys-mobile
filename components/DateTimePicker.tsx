import DatePicker, {
  DateTimePickerEvent,
} from "@react-native-community/datetimepicker";
import { useEffect, useState } from "react";
import {
  Button,
  Modal,
  Platform,
  TouchableWithoutFeedback,
  View,
} from "react-native";
import { TextInputField } from "./TextInputField";
import ModalGeneral from "./Modal";

interface DateTimePickerProps {
  label?: string;
  placeholder?: string;
  value?: string;
  onChangeDate?: (e: string) => void;
  error?: string;
  disabled?: boolean;
  minimumDate?: Date;
}

const DateTimePicker = ({ ...props }: DateTimePickerProps) => {
  const [showDateTimePicker, setShowDateTimePicker] = useState<boolean>(false);
  const [tempDate, setTempDate] = useState<Date>(new Date());

  const onChange = (event: DateTimePickerEvent, selectedDate?: Date) => {
    if (Platform.OS === "android") {
      if (event.type === "dismissed") {
        setShowDateTimePicker(false);
        return;
      }
      if (selectedDate && event.type === "set") {
        setShowDateTimePicker(false);
        setTempDate(selectedDate);
        props.onChangeDate?.(selectedDate.toISOString());
      }
    } else {
      if (selectedDate) {
        setTempDate(selectedDate);
      }
    }
  };

  const handleIosDateChange = () => {
    setShowDateTimePicker(false);
    props.onChangeDate?.(tempDate.toISOString());
  };

  useEffect(() => {
    if (props.value) return;

    if (props.minimumDate && Platform.OS === "ios") {
      setTempDate(props.minimumDate);
    }
  }, [props.minimumDate]);

  return (
    <View>
      <TouchableWithoutFeedback
        onPress={() => (props.disabled ? null : setShowDateTimePicker(true))}
      >
        <View>
          <TextInputField editable={false} pointerEvents="none" {...props} />
        </View>
      </TouchableWithoutFeedback>

      {showDateTimePicker && Platform.OS === "ios" && (
        <ModalGeneral show={showDateTimePicker}>
          <DatePicker
            mode="date"
            display="spinner"
            minimumDate={props.minimumDate}
            value={tempDate}
            onChange={onChange}
          />
          <View className="flex-row justify-center pb-2 gap-3">
            <Button
              onPress={() => setShowDateTimePicker(false)}
              color="red"
              title="CANCEL"
            />
            <Button title="OK" onPress={handleIosDateChange} />
          </View>
        </ModalGeneral>
      )}

      {showDateTimePicker && Platform.OS === "android" && (
        <DatePicker
          mode="date"
          display="spinner"
          minimumDate={props.minimumDate}
          value={tempDate}
          onChange={onChange}
          textColor="red"
        />
      )}
    </View>
  );
};

export default DateTimePicker;
