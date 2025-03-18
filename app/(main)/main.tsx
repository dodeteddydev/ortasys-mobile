import DataNotFound from "@/components/DataNotFound";
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
  FlatList,
  RefreshControl,
  StatusBar,
  Text,
  View,
} from "react-native";

const Main = () => {
  const { logout } = useGlobalContext();
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [refreshing, setRefreshing] = useState<boolean>(false);

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
    setParams({ check_out: "2025-8-31" });
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
    destination: undefined,
    check_in: undefined,
    check_out: undefined,
  });

  const {
    data,
    isLoading: isLoadingListHotel,
    isError,
    error,
  } = useGetListHotel({
    params: params,
  });

  if (isLoading) return <Loading />;

  if (isError)
    return (
      <Error statusCode={error.response?.status ?? "Internet Connection"} />
    );

  return (
    <BackgroundLayout>
      <View className="flex flex-col flex-1">
        <View className="px-6 pt-6">
          <Text className="text-white text-[15px]">Hello, Teddy!</Text>
          <Text className="text-white text-[16px] font-semibold">
            Find the best hotel deals now 👋🏻
          </Text>
          <SearchSection
            onSearch={(search) => setParams(search)}
            onReset={() =>
              setParams({
                destination: undefined,
                check_in: undefined,
                check_out: undefined,
              })
            }
          />
        </View>

        {isLoadingListHotel ? (
          <Loading />
        ) : (
          <View className="flex-1 mb-20">
            {data?.data?.length! < 1 ? (
              <DataNotFound />
            ) : (
              <FlatList
                keyExtractor={(item, index) => `${item}-${index}`}
                data={data?.data}
                contentContainerStyle={{ margin: 18 }}
                renderItem={(val) => {
                  return <ItemHotel data={val.item} onPress={() => {}} />;
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
            )}
          </View>
        )}
      </View>

      <StatusBar barStyle="light-content" backgroundColor="black" />
    </BackgroundLayout>
  );
};

export default Main;
