import { ScrollView, Text, View } from "react-native";
import { useCustomizedContext } from "../context/CustomizedProvider";
import { useEffect, useState } from "react";
import { calculateNights } from "@/utilities/calculateNights";
import Card from "@/components/Card";
import { dateFormat } from "@/utilities/dateFormat";
import { HotelRoomSchema } from "../schemas/hotelRoomSchema";
import { addDays } from "date-fns";

const PackageScreen = () => {
  const { customized } = useCustomizedContext();
  const [listPackage, setListPackage] = useState<HotelRoomSchema[]>([]);

  const handleInitialPackages = () => {
    const night =
      calculateNights(
        customized?.search?.checkIn!,
        customized?.search?.checkOut!
      ) + 1;

    const packages: HotelRoomSchema[] = Array.from(
      { length: night },
      (_, index) => ({
        day: index + 1,
        date: addDays(
          new Date(customized?.search?.checkIn!),
          index
        ).toISOString(),
        isCheckout: index !== 0,
        activities: [],
      })
    );

    setListPackage(packages);
  };

  useEffect(() => {
    handleInitialPackages();
  }, []);

  // console.log(customized);

  console.log(listPackage);

  return (
    <ScrollView
      className="h-full p-4"
      keyboardShouldPersistTaps="handled"
      showsVerticalScrollIndicator={false}
    >
      {listPackage?.map((value, index) => (
        <Card
          key={index}
          className={`${
            listPackage.length - 1 === index ? "mb-10" : "mb-4"
          } p-0`}
          title={
            <View className="flex flex-row items-center gap-2">
              <Text className="text-lg font-bold text-primary">
                Day {value?.day}
              </Text>
              <View className="h-6 w-[2.5px] bg-primary" />
              <Text className="text-lg text-gray-400">
                {dateFormat(value?.date!, "day-long")}
              </Text>
            </View>
          }
        >
          <View></View>
        </Card>
      ))}
    </ScrollView>
  );
};

export default PackageScreen;
