import Button from "@/components/Button";
import Card from "@/components/Card";
import DateTimePicker from "@/components/DateTimePicker";
import { TextInputField } from "@/components/TextInputField";
import DropdownCountry from "@/features/country/components/DropdownCountry";
import DropdownState from "@/features/state/components/DropdownState";
import { dateFormat } from "@/utilities/dateFormat";
import { zodResolver } from "@hookform/resolvers/zod";
import { addDays } from "date-fns";
import { Controller, useForm } from "react-hook-form";
import { ScrollView, View } from "react-native";
import { useCustomizedContext } from "../context/CustomizedProvider";
import { searchSchema, SearchSchema } from "../schemas/searchShema";

type SearchSceenProps = {
  onSearchCompleted: () => void;
};

const SearchScreen = ({ onSearchCompleted }: SearchSceenProps) => {
  const { customized, setCustomized } = useCustomizedContext();

  const {
    control,
    handleSubmit,
    watch,
    setValue,
    formState: { errors },
  } = useForm<SearchSchema>({
    resolver: zodResolver(searchSchema),
    defaultValues: {
      country: customized?.country || undefined,
      countryName: customized?.countryName || undefined,
      state: customized?.state || undefined,
      stateName: customized?.stateName || undefined,
      adult: customized?.adult ?? 1,
      child: customized?.child ?? 0,
      room: customized?.room ?? 1,
      checkIn: customized?.checkIn || undefined,
      checkOut: customized?.checkOut || undefined,
    },
  });

  const onSearch = (data: SearchSchema) => {
    setCustomized({
      ...data,
    });
    onSearchCompleted();
  };

  return (
    <ScrollView
      className="h-full p-4"
      keyboardShouldPersistTaps="handled"
      showsVerticalScrollIndicator={false}
    >
      <Card>
        <View className="gap-3">
          <Controller
            name="checkIn"
            control={control}
            render={({ field: { onChange, value } }) => (
              <DateTimePicker
                label="Check In"
                placeholder="Select Check In Date"
                value={dateFormat(value!, "long")}
                onChangeDate={(date) => {
                  onChange(dateFormat(date));
                  setValue("checkOut", undefined);
                }}
                error={errors.checkIn?.message}
              />
            )}
          />

          <Controller
            name="checkOut"
            control={control}
            render={({ field: { onChange, value } }) => (
              <DateTimePicker
                label="Check Out"
                placeholder="Select Check Out Date"
                disabled={!watch("checkIn")}
                minimumDate={addDays(new Date(watch("checkIn")!), 1)}
                value={dateFormat(value!, "long")}
                onChangeDate={(date) => onChange(dateFormat(date))}
                error={errors.checkOut?.message}
              />
            )}
          />

          <Controller
            name="country"
            control={control}
            render={({ field: { onChange, value } }) => (
              <DropdownCountry
                value={value}
                onChange={(country) => {
                  setValue("state", undefined);
                  setValue("stateName", undefined);
                  setValue("countryName", country.label);
                  onChange(country.value);
                }}
                error={errors.country?.message}
              />
            )}
          />

          <Controller
            name="state"
            control={control}
            render={({ field: { onChange, value } }) => (
              <DropdownState
                countryCode={watch("country")!}
                value={value}
                onChange={(state) => {
                  setValue("stateName", state.label);
                  onChange(state.value);
                }}
                error={errors.state?.message}
              />
            )}
          />

          <Controller
            name="adult"
            control={control}
            render={({ field: { onChange, value } }) => (
              <TextInputField
                label="Adult"
                placeholder="0"
                value={value ? value.toString() : "0"}
                onChangeText={(value) =>
                  onChange(parseInt(value ? value : "0"))
                }
                keyboardType="numeric"
                error={errors.adult?.message}
              />
            )}
          />

          <Controller
            name="child"
            control={control}
            render={({ field: { onChange, value } }) => (
              <TextInputField
                label="Child"
                placeholder="0"
                value={value ? value.toString() : "0"}
                onChangeText={(value) =>
                  onChange(parseInt(value ? value : "0"))
                }
                keyboardType="numeric"
                error={errors.child?.message}
              />
            )}
          />

          <Controller
            name="room"
            control={control}
            render={({ field: { onChange, value } }) => (
              <TextInputField
                label="Room"
                placeholder="0"
                value={value ? value.toString() : "0"}
                onChangeText={(value) =>
                  onChange(parseInt(value ? value : "0"))
                }
                keyboardType="numeric"
                error={errors.room?.message}
              />
            )}
          />
        </View>
      </Card>

      <Button
        className="mt-3 mb-10"
        text="Search"
        onPress={handleSubmit(onSearch)}
      />
    </ScrollView>
  );
};

export default SearchScreen;
