import Error from "@/components/Error";
import Loading from "@/components/Loading";
import { useGlobalContext } from "@/context/GlobalProvider";
import BackgroundLayout from "@/features/home/components/BackgroundLayout";
import ItemHotel from "@/features/home/components/ItemHotel";
import SearchSection from "@/features/home/components/SearchSection";
import { useGetListHotel } from "@/features/home/hooks/useGetListHotel";
import { ListHotelParams } from "@/features/home/types/lisHotelParamsType";
import { ProfileService } from "@/features/profile/services/profileService";
import { ProfileResponse } from "@/features/profile/types/profileResponseType";
import { ErrorResponse } from "@/types/responseType";
import { AxiosError } from "axios";
import React, { useEffect, useState } from "react";
import {
  Alert,
  Dimensions,
  FlatList,
  Platform,
  RefreshControl,
  StatusBar,
  Text,
  View,
} from "react-native";

const Main = () => {
  const { logout } = useGlobalContext();
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [refreshing, setRefreshing] = useState<boolean>(false);
  const dateNow = new Date();
  dateNow.setDate(dateNow.getDate() + 1);

  const checkUserRole = (response: ProfileResponse) => {
    if (response.role !== "agent")
      return Alert.alert("Access Denied", "Only agents can access this app.", [
        { text: "Logout", onPress: logout },
      ]);
  };

  const checkError = (e: AxiosError<ErrorResponse>) => {
    if (e.response?.status === 401)
      return Alert.alert("Session Expired", "Please login again", [
        { text: "OK", onPress: logout },
      ]);
  };

  const onRefresh = () => {
    setRefreshing(true);
    setRefreshing(false);
  };

  useEffect(() => {
    setIsLoading(true);
    ProfileService.get()
      .then((response) => checkUserRole(response.data))
      .catch((e: AxiosError<ErrorResponse>) => checkError(e))
      .finally(() => setIsLoading(false));
  }, []);

  const [params, setParams] = useState<ListHotelParams>({
    destination: "56263",
    check_in: "2025-12-01",
    check_out: "2025-12-31",
  });

  const {
    data,
    isLoading: isLoadingListHotel,
    isError,
    error,
  } = useGetListHotel({
    params: {
      destination: params?.destination ?? "56263",
      check_in: params?.check_in ?? "2025-12-01",
      check_out: params?.check_out ?? "2025-12-31",
      min_price: params?.min_price ?? undefined,
      max_price: params?.max_price ?? undefined,
    },
  });

  if (isLoading || isLoadingListHotel) return <Loading />;

  if (isError)
    return (
      <Error statusCode={error.response?.status ?? "Internet Connection"} />
    );

  const { height } = Dimensions.get("window");
  return (
    <BackgroundLayout>
      <View className={`absolute w-full ${Platform.OS === "ios" && "mt-10"}`}>
        <View
          style={{
            height: Platform.OS === "ios" ? height * 0.34 : height * 0.36,
          }}
          className="gap-2 px-6 pt-6"
        >
          <Text className="text-white text-[15px]">Hello, Teddy!</Text>
          <Text className="text-white text-[16px] font-semibold">
            Find the best hotel deals now 👋🏻
          </Text>
          <SearchSection />
        </View>

        <FlatList
          style={{
            marginLeft: 20,
            marginRight: 20,
            paddingTop: 20,
            borderTopStartRadius: 15,
            borderTopEndRadius: 15,
            height: Platform.OS === "ios" ? height * 0.53 : height * 0.56,
          }}
          contentContainerStyle={{
            paddingBottom: Platform.OS === "android" ? 20 : undefined,
          }}
          keyExtractor={(item, index) => `${item}-${index}`}
          data={data?.data}
          renderItem={({ item }) => {
            return <ItemHotel data={item} onPress={() => {}} />;
          }}
          showsVerticalScrollIndicator={false}
          refreshControl={
            <RefreshControl
              tintColor={"#000"}
              refreshing={refreshing}
              onRefresh={onRefresh}
            />
          }
        />

        <StatusBar barStyle="dark-content" />
      </View>
    </BackgroundLayout>
  );
};

export default Main;
