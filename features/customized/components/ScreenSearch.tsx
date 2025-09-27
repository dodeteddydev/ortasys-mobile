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
import StepperButton from "@/components/StepperButton";

type ScreenSearchProps = {
  onSearch: () => void;
};

const ScreenSearch = ({ onSearch }: ScreenSearchProps) => {
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
      country: customized?.search?.country || undefined,
      countryName: customized?.search?.countryName || undefined,
      state: customized?.search?.state || undefined,
      stateName: customized?.search?.stateName || undefined,
      adult: customized?.search?.adult ?? 1,
      child: customized?.search?.child ?? 0,
      totalRoom: customized?.search?.totalRoom ?? 0,
      startStayDate: customized?.search?.startStayDate || undefined,
      endStayDate: customized?.search?.endStayDate || undefined,
    },
  });

  const handleSearch = (data: SearchSchema) => {
    setCustomized({
      search: data,
    });
    onSearch();
  };

  return (
    <View className="flex-1">
      <ScrollView
        keyboardShouldPersistTaps="handled"
        showsVerticalScrollIndicator={false}
      >
        <Card className="m-4">
          <View className="gap-3">
            <Controller
              name="startStayDate"
              control={control}
              render={({ field: { onChange, value } }) => (
                <DateTimePicker
                  label="Check In"
                  placeholder="Select Check In Date"
                  value={dateFormat(value!, "long")}
                  onChangeDate={(date) => {
                    onChange(dateFormat(date));
                    setValue("endStayDate", undefined);
                  }}
                  error={errors.startStayDate?.message}
                />
              )}
            />

            <Controller
              name="endStayDate"
              control={control}
              render={({ field: { onChange, value } }) => (
                <DateTimePicker
                  label="Check Out"
                  placeholder="Select Check Out Date"
                  disabled={!watch("startStayDate")}
                  minimumDate={addDays(new Date(watch("startStayDate")!), 1)}
                  value={dateFormat(value!, "long")}
                  onChangeDate={(date) => onChange(dateFormat(date))}
                  error={errors.endStayDate?.message}
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
              name="totalRoom"
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
                  error={errors.totalRoom?.message}
                />
              )}
            />
          </View>
        </Card>
      </ScrollView>

      <StepperButton>
        <Button
          className="m-6 mb-10 w-full h-14"
          text="Search"
          onPress={handleSubmit(handleSearch)}
        />
      </StepperButton>
    </View>
  );
};

export default ScreenSearch;
