import React from "react";
import { router } from "expo-router";
import {
  YStack,
  XStack,
  Text,
  View,
  ListItem,
  Avatar,
  ScrollView,
  Paragraph,
  Image,
  H2,
  Button,
  Card,
  H4,
} from "tamagui";
import { SafeAreaView } from "react-native-safe-area-context";
import { CustomScreenHeader } from "@/component/CustomScreenHeader";
import { useQuery } from "@tanstack/react-query";
import { fetchAllReports, type Report } from "@/api/report";
import { LoadingIndicator } from "@/component/LoadingIndicator";
import { format } from "date-fns";
import { FlatList, Pressable, RefreshControl } from "react-native";
import { useRefreshByUser } from "@/hooks/useRefreshByUser";
import { useRefreshOnFocus } from "@/hooks/useRefreshOnFocus";
import { getColorByStatus } from "@/utils/form";

export default function ViewAllReportScreen() {
  const { isLoading, error, data, refetch } = useQuery({
    queryKey: ["reports"],
    queryFn: fetchAllReports,
  });

  const { isRefetchingByUser, refetchByUser } = useRefreshByUser(refetch);
  useRefreshOnFocus(refetch);

  const reports = data?.data.data ?? [];
  console.log(error);

  return (
    <SafeAreaView style={{ flex: 1 }}>
      <CustomScreenHeader
        screenTitle="All Reports"
        onBackPress={() => {
          router.navigate("/");
        }}
      />
      <YStack
        flex={1}
        backgroundColor="$background"
        justifyContent="space-between"
      >
        {reports?.length === 0 && (
          <Text color="$blue10" fontSize="$4" textAlign="center">
            No reports available.
          </Text>
        )}
        {reports?.length !== 0 && (
          <FlatList
            data={reports}
            renderItem={(report) => {
              console.log(report.item);
              return (
                <ReportListItem
                  key={report.item.id}
                  address={report.item.address}
                  id={report.item.id}
                  imageUrl={report.item.imageUrl}
                  description={report.item.description}
                  updated_at={report.item.updated_at}
                  created_at={report.item.created_at}
                  deleted_at={report.item.deleted_at}
                  status={report.item.status}
                />
              );
            }}
            ListEmptyComponent={
              <View>
                {isLoading && <LoadingIndicator />}
                {error && (
                  <Text color="$red10" fontSize="$4" textAlign="center">
                    Failed to load reports. Please try again later.
                  </Text>
                )}
                <Text fontSize="$4" textAlign="center">
                  No reports available
                </Text>
              </View>
            }
            refreshControl={
              <RefreshControl
                refreshing={isRefetchingByUser}
                onRefresh={refetchByUser}
              />
            }
          />
        )}
      </YStack>
    </SafeAreaView>
  );
}

type ReportListItemProps = Omit<Report, "location">;
function ReportListItem(props: ReportListItemProps) {
  console.log(props);
  //   const formattedDate = format(props.created_at, "EEE, MMM d. HH:mm") ?? "-";

  const {
    id,
    imageUrl,
    address,
    status,
    description,
    updated_at,
    created_at,
    deleted_at,
  } = props;

  return (
    <Card
      elevate
      size="$2"
      bordered
      marginBlockEnd="$4"
      onPress={() => {
        console.log(props.id);
        router.push({
          pathname: "/view-report",
          params: { reportId: props.id },
        });
      }}
    >
      <Card.Header padded>
        <H4>Report {`${id}`}</H4>
        <Paragraph theme="alt2">{description}</Paragraph>
      </Card.Header>
      <Card.Footer padded>
        <XStack flex={1} alignItems="center">
          <Paragraph flex={1} textOverflow="ellipses">
            {address}
          </Paragraph>
          <Button borderRadius="$10" backgroundColor={getColorByStatus(status)}>
            {status?.replace(/_/g, " ").toUpperCase()}
          </Button>
        </XStack>
      </Card.Footer>
      <Card.Background>
        <Image
          alignSelf="center"
          opacity={0.3}
          source={{
            width: 300,
            height: 300,
            uri: imageUrl,
          }}
        />
      </Card.Background>
    </Card>
  );

  //   return (
  //     <ListItem
  //       width={"100%"}
  //       marginBlockEnd="$6"
  //       paddingHorizontal="$2"
  //       paddingVertical="$2"
  //       borderRadius={"$2"}
  //       gap="$1"
  //       backgroundColor="$color1"
  //       title={
  //         <XStack
  //           width="100%"
  //           justifyContent="space-between"
  //           paddingHorizontal="$1"
  //           borderStyle="solid"
  //           borderBlockColor={"$color4"}
  //         >
  //           <Text textAlign="right">{""}</Text>
  //           <View paddingHorizontal="$3" paddingVertical="$1" borderRadius="$6">
  //             <Text>{props.status}</Text>
  //           </View>
  //         </XStack>
  //       }
  //       subTitle={
  //         <YStack marginBlockStart="$2">
  //           <Text textOverflow="">
  //             {props.description || "No description provided"}
  //           </Text>

  //           <XStack width={"100%"} overflowX="hidden">
  //             {/* <ListItem icon={FileImage} title="broken_image_bridege.png" /> */}
  //             {/* <ListItem icon={FileImage} title="broken_image_bridege.png" /> */}
  //           </XStack>
  //         </YStack>
  //       }
  //       hoverTheme
  //       pressTheme
  //       onPress={() => {
  //         console.log(props.id);
  //         router.push({
  //           pathname: "/view-report",
  //           params: { reportId: props.id },
  //         });
  //       }}
  //     />
  //   );
}
