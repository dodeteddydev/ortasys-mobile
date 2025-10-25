import DataNotFound from "@/components/DataNotFound";
import Error from "@/components/Error";
import Loading from "@/components/Loading";
import CardCustomizedListItem from "@/features/customized/components/CardCustomizedListItem";
import { useGetCustomizedPackage } from "@/features/customized/hooks/useGetCustomizedPackage";
import { CustomizedPackageResponse } from "@/features/customized/types/customizedPackageResponse";
import { useEffect, useState } from "react";
import { FlatList, Text } from "react-native";

const CustomizedList = () => {
  const [page, setPage] = useState<number>(1);
  const [dataList, setDataList] = useState<CustomizedPackageResponse[]>([]);

  const { data, isFetching, refetch, isError, error } = useGetCustomizedPackage(
    {
      enabled: true,
      params: {
        limit: 10,
        page: page,
        order: "DESC",
        sortBy: "created_at",
      },
    }
  );

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

  if (isError) return <Error statusCode={error.response?.status!} />;

  return dataList?.length! > 0 ? (
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
  ) : (
    <DataNotFound />
  );
};

export default CustomizedList;
