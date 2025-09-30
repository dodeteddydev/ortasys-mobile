import { ErrorResponse } from "@/types/responseType";
import { AntDesign } from "@expo/vector-icons";
import * as Print from "expo-print";
import * as Sharing from "expo-sharing";
import React, { useState } from "react";
import { Text, TouchableOpacity } from "react-native";
import Toast from "react-native-toast-message";
import { BookingDetailService } from "../services/bookingDetailService";
import { BookingDetailResponse } from "../types/BookingDetailResponse";
import { htmlPDFFormat } from "../utilities/htmlPDFFormat";

type DownloadPDFBookingInformationProps = {
  bookingId: number;
};

const DownloadPDFBookingInformation = ({
  bookingId,
}: DownloadPDFBookingInformationProps) => {
  const [isLoading, setIsLoading] = useState<boolean>(false);

  const getBookingDetail = () => {
    setIsLoading(true);
    BookingDetailService.get(bookingId)
      .then(async (response) => {
        try {
          await generatePdf(response.data);
        } catch (error: any) {
          Toast.show({
            type: "error",
            text1: "Failed to download PDF",
            text2: error?.response?.data.message || "Something went wrong",
          });
        }
      })
      .catch((error: ErrorResponse) => {
        Toast.show({
          type: "error",
          text1: "Failed to download PDF",
          text2: error?.response?.data.message || "Something went wrong",
        });
      })
      .finally(() => {
        setIsLoading(false);
      });
  };

  const generatePdf = async (data: BookingDetailResponse) => {
    const html = htmlPDFFormat(data);

    const { uri } = await Print.printToFileAsync({ html });

    if (await Sharing.isAvailableAsync()) {
      await Sharing.shareAsync(uri);
    } else {
      alert("Sharing not available on this device");
    }
  };

  return (
    <TouchableOpacity
      className="flex flex-row items-center justify-center gap-2 bg-primary py-3 px-4 rounded-lg"
      activeOpacity={0.8}
      onPress={getBookingDetail}
      disabled={isLoading}
    >
      <AntDesign name="pdffile1" size={24} color="white" />
      <Text className="text-white">
        {isLoading ? "Loading..." : "Download PDF"}
      </Text>
    </TouchableOpacity>
  );
};

export default DownloadPDFBookingInformation;
