import DataNotFound from "@/components/DataNotFound";
import Loading from "@/components/Loading";
import ToastCustom from "@/components/ToastCustom";
import CardCustomizedListItem from "@/features/customized-list/components/CardCustomizedListItem";
import { useGetCustomizedPackage } from "@/features/customized-list/hooks/useGetCustomizedPackage";
import { CustomizedPackageResponse } from "@/features/customized-list/types/customizedPackageResponse";
import { useEffect, useState } from "react";
import { FlatList, Text } from "react-native";
import Toast from "react-native-toast-message";

const ListScreen = () => {
  const [page, setPage] = useState<number>(1);
  const [dataList, setDataList] = useState<CustomizedPackageResponse[]>([]);

  const { data, isFetching, refetch } = useGetCustomizedPackage({
    enabled: true,
    params: {
      limit: 10,
      page: page,
      order: "DESC",
      sortBy: "created_at",
    },
  });

  const onRefresh = () => {
    setPage(1);
    refetch();
  };

  const loadMore = () => {
    if (data?.data?.totalPages! > page) {
      setPage(page + 1);
    }
  };

  useEffect(() => {
    if (!isFetching && data?.data?.data && page === 1) {
      setDataList(data?.data?.data);
    }

    if (!isFetching && data?.data?.data && page > 1) {
      setDataList([...dataList, ...data?.data?.data]);
    }
  }, [data?.data?.data, isFetching]);

  if (isFetching && page === 1) return <Loading />;

  return dataList?.length! > 0 ? (
    <>
      <FlatList
        data={dataList}
        keyExtractor={(_, index) => index.toString()}
        refreshing={isFetching && page === 1}
        onRefresh={onRefresh}
        keyboardShouldPersistTaps="handled"
        contentContainerStyle={{ padding: 12 }}
        renderItem={({ item }) => <CardCustomizedListItem item={item} />}
        onEndReached={loadMore}
        onEndReachedThreshold={0.5}
        ListFooterComponent={
          isFetching && page > 1 ? (
            <Text className="text-center">Loading...</Text>
          ) : null
        }
      />

      <Toast
        position="bottom"
        visibilityTime={2000}
        config={{
          error: (value) => (
            <ToastCustom
              type="error"
              title={value.text1!}
              text={value.text2!}
            />
          ),
        }}
      />
    </>
  ) : (
    <DataNotFound />
  );
};

export default ListScreen;
