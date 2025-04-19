import React from "react";
import { Redirect, router } from "expo-router";
import { Button, YStack, XStack, Text, View } from "tamagui";
import { SafeAreaView } from "react-native-safe-area-context";
import { useGlobalContextProvider } from "@/context/global";

export default function InitialScreen() {
	const { isAuthenticated } = useGlobalContextProvider();
	return isAuthenticated ? (
		<>
			<HomepageScreen />
		</>
	) : (
		<Redirect href={"/auth/signin"} />
	);
}

function HomepageScreen() {
	const handleCaptureReport = () => {
		router.push("/create-reports");
	};

	const handleViewReports = () => {
		router.push("/all-reports");
	};

	return (
		<SafeAreaView style={{ flex: 1 }}>
			<YStack
				flex={1}
				paddingHorizontal="$3"
				paddingVertical="$6"
				gap="$6"
				backgroundColor="$background"
				justifyContent="space-between"
			>
				<View>
					<Text fontSize={"$8"} marginBlockEnd="$6" fontWeight={"$extraBold"}>
						Snappatch
					</Text>
					<XStack
						gap="$4"
						justifyContent="center"
						alignItems="stretch"
						height={"30%"}
						padding="$3"
					>
						<Button
							size="$4"
							width="50%"
							fontWeight={"$extraBold"}
							height={200}
							onPress={handleCaptureReport}
						>
							Capture New Report
						</Button>
						<Button
							size="$4"
							width="50%"
							height={200}
							onPress={handleViewReports}
						>
							View Reports
						</Button>
					</XStack>
				</View>

				<YStack padding="$3" gap="$3">
					<Button>Help & FAQ</Button>
					<Button>Settings</Button>
					<Button>Manage Account</Button>
					<Button>Sign Out</Button>
					{/* Button Just to test screens */}
					<Button
						onPress={() => {
							router.push("/auth/signin");
						}}
					>
						Sign In Page
					</Button>
					<Button
						onPress={() => {
							router.push("/auth");
						}}
					>
						Register Page
					</Button>
				</YStack>
			</YStack>
		</SafeAreaView>
	);
}
