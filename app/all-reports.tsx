import React from "react";
import { router } from "expo-router";
// import { FileImage } from "@tamagui/lucide-icons";
import {
	YStack,
	XStack,
	Text,
	View,
	ListItem,
	Avatar,
	ScrollView,
} from "tamagui";
import { SafeAreaView } from "react-native-safe-area-context";
import { CustomScreenHeader } from "@/component/CustomScreenHeader";

export default function ViewAllReportScreen() {
	return (
		<SafeAreaView style={{ flex: 1 }}>
			<YStack
				flex={1}
				paddingHorizontal="$3"
				paddingBlockStart="$6"
				backgroundColor="$background"
				justifyContent="space-between"
			>
				<CustomScreenHeader
					screenTitle="All Reports"
					onBackPress={() => {
						router.back();
					}}
				/>
				<View>{/* Search Bar */}</View>
				<ScrollView
					minHeight={250}
					width="100%"
					backgroundColor="$background"
					borderRadius="$4"
				>
					<ReportListItem />
					<ReportListItem />
					<ReportListItem />
					<ReportListItem />
					<ReportListItem />
					<ReportListItem />
					<ReportListItem />
					<ReportListItem />
				</ScrollView>
			</YStack>
		</SafeAreaView>
	);
}

function ReportListItem() {
	return (
		<ListItem
			width={"100%"}
			marginBlockEnd="$6"
			paddingHorizontal="$2"
			paddingVertical="$2"
			borderRadius={"$2"}
			gap="$1"
			backgroundColor="$color1"
			icon={
				<Avatar circular size="$4">
					<Avatar.Image
						accessibilityLabel="Cam"
						src="https://images.unsplash.com/photo-1548142813-c348350df52b?&w=150&h=150&dpr=2&q=80"
					/>
					<Avatar.Fallback backgroundColor="$blue10" />
				</Avatar>
			}
			title={
				<XStack
					width="100%"
					justifyContent="space-between"
					paddingHorizontal="$1"
					borderStyle="solid"
					borderBlockColor={"$color4"}
				>
					<View
						paddingHorizontal="$3"
						paddingVertical="$1"
						backgroundColor="$yellow3"
						borderRadius="$6"
					>
						<Text>reviewing</Text>
					</View>
					<Text textAlign="right">Sun, Mar2. 09:23</Text>
				</XStack>
			}
			subTitle={
				<YStack marginBlockStart="$2">
					<Text textOverflow="">
						Large crack observed on the main support beam of the bridge. Visible
						corrosion and potential structural instability. Immediate inspection
						recommended.
					</Text>

					<XStack width={"100%"} overflowX="hidden">
						{/* <ListItem icon={FileImage} title="broken_image_bridege.png" /> */}
						{/* <ListItem icon={FileImage} title="broken_image_bridege.png" /> */}
					</XStack>
				</YStack>
			}
			hoverTheme
			pressTheme
		/>
	);
}
