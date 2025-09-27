import DatePicker, {
  DateTimePickerEvent,
} from "@react-native-community/datetimepicker";
import { useEffect, useState } from "react";
import { Button, Platform, TouchableWithoutFeedback, View } from "react-native";
import ModalGeneral from "./Modal";
import { TextInputField } from "./TextInputField";

interface DateTimePickerProps {
  label?: string;
  placeholder?: string;
  value?: string;
  onChangeDate?: (e: string) => void;
  error?: string;
  disabled?: boolean;
  minimumDate?: Date;
  isTime?: boolean;
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
            mode={props.isTime ? "time" : "date"}
            display="spinner"
            minimumDate={props.minimumDate}
            value={tempDate}
            onChange={onChange}
            textColor="black"
          />
          <View className="flex-row justify-end p-4 gap-3">
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
          mode={props.isTime ? "time" : "date"}
          display="spinner"
          minimumDate={props.minimumDate}
          value={tempDate}
          onChange={onChange}
          textColor="black"
        />
      )}
    </View>
  );
};

export default DateTimePicker;
