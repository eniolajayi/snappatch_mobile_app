import React from "react";
import { StyleSheet } from "react-native";
import { router } from "expo-router";
import { YStack, Text, View, ListItem, Paragraph } from "tamagui";
import { SafeAreaView } from "react-native-safe-area-context";
import { CustomScreenHeader } from "@/component/CustomScreenHeader";
import { useQuery } from "@tanstack/react-query";
import { fetchCategories } from "@/api/report";
import { LoadingIndicator } from "@/component/LoadingIndicator";
import { FlatList, RefreshControl } from "react-native";
import { useRefreshByUser } from "@/hooks/useRefreshByUser";
import { useRefreshOnFocus } from "@/hooks/useRefreshOnFocus";

import { handleMutationError } from "@/utils/form";
import { useCreateReportStore } from "@/context/store";

export default function SelectCategoryScreen() {
	const setCategory = useCreateReportStore((state) => state.setCategory);
	const { data, isLoading, isError, error, refetch } = useQuery({
		queryKey: ["report-catergories"],
		queryFn: fetchCategories,
		onError: handleMutationError,
	});

	const { isRefetchingByUser, refetchByUser } = useRefreshByUser(refetch);
	useRefreshOnFocus(refetch);

	const categories = data?.data.data ?? [];

	return (
		<SafeAreaView style={{ flex: 1 }}>
			<CustomScreenHeader
				screenTitle="All Categories"
				onBackPress={() => router.navigate("/create-reports")}
			/>
			<YStack
				flex={1}
				backgroundColor="$background"
				justifyContent="space-between"
			>
				<FlatList
					data={categories}
					contentContainerStyle={styles.list}
					renderItem={({ item }) => {
						return (
							<ListItem
								title={item.name}
								backgroundColor={"#fff"}
								paddingBlock={"$4"}
								paddingInline={"$6"}
								subTitle={<Paragraph>{item.description}</Paragraph>}
								onPress={() => {
									setCategory(item);
									router.navigate("/create-reports");
								}}
								pressTheme
							/>
						);
					}}
					ListEmptyComponent={
						<View>
							{isLoading && <LoadingIndicator />}
							{error && (
								<Text color="$red10" fontSize="$4" textAlign="center">
									Failed to load report categories. Please try again later.
								</Text>
							)}
						</View>
					}
					refreshControl={
						<RefreshControl
							refreshing={isRefetchingByUser}
							onRefresh={refetchByUser}
						/>
					}
				/>
			</YStack>
		</SafeAreaView>
	);
}

const styles = StyleSheet.create({
	list: {
		backgroundColor: "#fff",
		marginBlockEnd: 10,
	},
});
