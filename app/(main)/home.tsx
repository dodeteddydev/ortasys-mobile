import Loading from "@/components/Loading";
import { colors } from "@/constants/colors";
import { useGlobalContext } from "@/context/GlobalProvider";
import HomeHeaderSection from "@/features/home/components/HomeHeaderSection";
import React, { useEffect } from "react";
import { StatusBar } from "react-native";

const Home = () => {
  const { isLoadingProfile, getProfile, dataProfile } = useGlobalContext();

  useEffect(() => {
    getProfile();
  }, []);

  if (isLoadingProfile) return <Loading />;

  return (
    <>
      <HomeHeaderSection data={dataProfile!} />

      <StatusBar barStyle="light-content" backgroundColor={colors.primary} />
    </>
  );
};

export default Home;
