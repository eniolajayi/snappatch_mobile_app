import { CustomScreenHeader } from "@/component/CustomScreenHeader";
import { router } from "expo-router";
import { SafeAreaView } from "react-native-safe-area-context";
import { YStack, Text, Paragraph } from "tamagui";

export default function ReportDetailsScreen() {
    return (
        <SafeAreaView style={{ flex: 1 }}>
            <CustomScreenHeader
                screenTitle="Report Details"
                onBackPress={() => {
                    router.back();
                }}
            />
            <YStack
                flex={1}
                paddingHorizontal="$3"
                paddingVertical="$6"
                gap="$6"
                backgroundColor="$background"
                justifyContent="space-between"
            >
                <Text fontSize={"$8"} marginBlockEnd="$6" fontWeight={"$extraBold"}>
                    Report Details
                </Text>
                <Paragraph fontSize="$4" color="$gray10">
                    Report details go here
                </Paragraph>
            </YStack>
        </SafeAreaView>)
}