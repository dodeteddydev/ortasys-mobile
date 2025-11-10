import Button from "@/components/Button";
import DateTimePicker from "@/components/DateTimePicker";
import ModalGeneral from "@/components/Modal";
import { TextInputField } from "@/components/TextInputField";
import { dateFormat, normalizeDate } from "@/utilities/dateFormat";
import { MaterialIcons } from "@expo/vector-icons";
import { addDays } from "date-fns";
import { useState } from "react";
import {
  Text,
  TouchableOpacity,
  useWindowDimensions,
  View,
} from "react-native";
import { BookingHotelQueryParams } from "../types/bookingHotelQueryParams";
import { colors } from "@/constants/colors";

type ModalFilterBookingInformationProps = {
  show: boolean;
  params: BookingHotelQueryParams;
  onClose: () => void;
  onApplyFilter: (params: BookingHotelQueryParams) => void;
};

const ModalFilterBookingInformation = ({
  show,
  params,
  onClose,
  onApplyFilter,
}: ModalFilterBookingInformationProps) => {
  const { width } = useWindowDimensions();

  const [tempParams, setTempParams] = useState<BookingHotelQueryParams>(params);

  return (
    <ModalGeneral show={show}>
      <View className="gap-2" style={{ width: width - 100 }}>
        <View className="flex flex-row items-center justify-between">
          <Text className="text-lg font-bold text-primary">Filter</Text>

          <TouchableOpacity activeOpacity={0.8} onPress={onClose}>
            <MaterialIcons name="close" size={24} color={colors.primary} />
          </TouchableOpacity>
        </View>

        <DateTimePicker
          label="Check In"
          placeholder="Check-in"
          value={dateFormat(tempParams?.checkIn!, "long")}
          onChangeDate={(date) => {
            setTempParams({
              ...tempParams,
              checkIn: normalizeDate(date),
              checkOut: undefined,
            });
          }}
        />

        <DateTimePicker
          label="Check Out"
          placeholder="Check-out"
          disabled={!tempParams?.checkIn}
          minimumDate={addDays(new Date(tempParams?.checkIn!), 1)}
          value={dateFormat(tempParams?.checkOut!, "long")}
          onChangeDate={(date) => {
            setTempParams({ ...tempParams, checkOut: normalizeDate(date) });
          }}
        />

        <TextInputField
          label="Adult"
          placeholder="0"
          value={tempParams?.maxAdult ? tempParams?.maxAdult?.toString() : "0"}
          onChangeText={(value) =>
            setTempParams({
              ...tempParams,
              maxAdult: parseInt(value ? value : "0"),
            })
          }
          keyboardType="numeric"
        />

        <TextInputField
          label="Child"
          placeholder="0"
          value={tempParams?.maxChild ? tempParams?.maxChild?.toString() : "0"}
          onChangeText={(value) =>
            setTempParams({
              ...tempParams,
              maxChild: parseInt(value ? value : "0"),
            })
          }
          keyboardType="numeric"
        />

        <Button
          className="px-4 py-2"
          classNameText="text-lg text-white font-semibold"
          text="Apply Filter"
          onPress={() => onApplyFilter(tempParams)}
        />
      </View>
    </ModalGeneral>
  );
};

export default ModalFilterBookingInformation;
