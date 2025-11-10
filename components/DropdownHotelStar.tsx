import DropdownInputField from "@/components/DropdownInputField";
import { SelectOptions } from "@/types/selectOptionsType";
import HotelStar from "./HotelStar";
import { View } from "react-native";

type DropdownHotelStarProps = {
  enabled?: boolean;
  value?: string;
  onChange: (value: SelectOptions) => void;
  error?: string;
};

const DropdownHotelStar = ({
  enabled = true,
  value,
  onChange,
  error,
}: DropdownHotelStarProps) => {
  const data = Array.from({ length: 5 }, (_, index) => ({
    label: (index + 1).toString(),
    value: index + 1,
  }));

  const dataDropdown: SelectOptions[] = data;

  return (
    <DropdownInputField
      withSearch={false}
      disabled={!enabled}
      label="Star"
      placeholder="Select star"
      data={dataDropdown}
      value={parseInt(value!)}
      onChange={onChange}
      error={error}
      renderItem={(item) => (
        <View className="m-3">
          <HotelStar star={item.value} />
        </View>
      )}
    />
  );
};

export default DropdownHotelStar;
