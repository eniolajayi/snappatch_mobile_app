import { getReport } from "@/api/report";
import { CustomScreenHeader } from "@/component/CustomScreenHeader";
import { LoadingIndicator } from "@/component/LoadingIndicator";
import { useRefreshByUser } from "@/hooks/useRefreshByUser";
import { getColorByStatus, handleMutationError } from "@/utils/form";
import { useMutation, useQuery } from "@tanstack/react-query";
import { format } from "date-fns";
import { router, useLocalSearchParams } from "expo-router";
import { RefreshControl, type GestureResponderEvent } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import {
  Button,
  Image,
  Paragraph,
  ScrollView,
  View,
  XStack,
  Text,
  YStack,
  H6,
} from "tamagui";

export default function ViewReportScreen() {
  const params = useLocalSearchParams<{ reportId: string }>();

  function handleEditReport(event: GestureResponderEvent): void {
    throw new Error("Function not implemented.");
  }

  function handleDeleteReport(event: GestureResponderEvent): void {
    throw new Error("Function not implemented.");
  }

  const { data, isError, error, isLoading, refetch } = useQuery({
    queryKey: ["single-report", params.reportId],
    queryFn: () => getReport(params.reportId),
    onError: handleMutationError,
  });

  const { isRefetchingByUser, refetchByUser } = useRefreshByUser(refetch);

  if (isLoading) return <LoadingIndicator />;
  if (error) return <Paragraph>Could not fetch report details</Paragraph>;
  if (!data) return null;

  const details = data.data.data;

  const createdAt =
    typeof details.createdAt !== "undefined"
      ? format(details.createdAt, "EEE, MMM d. HH:mm")
      : "-";

  const statusColor = getColorByStatus(details.status);

  return (
    <SafeAreaView style={{ flex: 1 }}>
      <CustomScreenHeader
        screenTitle={`Report ${params.reportId}`}
        onBackPress={() => {
          router.navigate("/all-reports");
        }}
      />
      <ScrollView
        backgroundColor="$background"
        refreshControl={
          <RefreshControl
            refreshing={isRefetchingByUser}
            onRefresh={refetchByUser}
          />
        }
      >
        <YStack
          flex={1}
          paddingHorizontal="$3"
          paddingBlockStart="$6"
          backgroundColor="$background"
          justifyContent="space-between"
          marginBlockEnd="$16"
        >
          <View minHeight={310}>
            <Image
              width={"100%"}
              height={300}
              source={{
                uri: details.imageUrl,
              }}
            />
          </View>
          <YStack>
            <XStack marginBlock="$4" justifyContent="space-between">
              <Paragraph
                paddingInline="$2"
                width={100}
                textAlign="center"
                borderRadius={500}
                backgroundColor={statusColor}
              >
                {details.status?.replace(/_/g, " ")}
              </Paragraph>
              <Text>{createdAt}</Text>
            </XStack>
            <YStack>
              <Paragraph size={"$3"}>{details.category.name}</Paragraph>
              <Paragraph>{details.address}</Paragraph>
            </YStack>
            <Paragraph marginBlockEnd="$4">
              {details.description || "No description available"}
            </Paragraph>
            {/* <XStack justifyContent="space-between" padding="$4">
              <Button size="$4" onPress={handleEditReport}>
                Edit Report
              </Button>
              <Button size="$4" onPress={handleDeleteReport} variant="outlined">
                Delete Report
              </Button>
            </XStack> */}
          </YStack>
        </YStack>
      </ScrollView>
    </SafeAreaView>
  );
}
