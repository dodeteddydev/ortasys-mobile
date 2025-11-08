import { View, Text } from "react-native";
import { useBookingContext } from "../context/BookingProvider";

const ScreenPaymentAndSumary = () => {
  const { booking, setBooking } = useBookingContext();

  console.log(booking);

  return (
    <View>
      <Text>ScreenPaymentAndSumary</Text>
    </View>
  );
};

export default ScreenPaymentAndSumary;
