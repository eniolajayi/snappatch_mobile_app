import React, { useEffect } from "react";
import { Redirect, router } from "expo-router";
import { Button, YStack, XStack, Text, View, Paragraph } from "tamagui";
import { SafeAreaView } from "react-native-safe-area-context";
import { useGlobalContextProvider } from "@/context/global";
import {
  getFromSecureStore,
  removeFromSecureStore,
  StorageKeys,
} from "@/utils/storage";

export default function InitialScreen() {
  const { isAuthenticated, setIsAuthenticated } = useGlobalContextProvider();

  return isAuthenticated ? (
    <>
      <HomepageScreen />
    </>
  ) : (
    <Redirect href={"/auth/signin"} />
  );
}

function HomepageScreen() {
  const { isAuthenticated, setIsAuthenticated } = useGlobalContextProvider();
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
              backgroundColor={"#1C2833"}
              onPress={handleCaptureReport}
            >
              <Text textAlign="center" color={"#fff"}>
                Capture New Report
              </Text>
            </Button>
            <Button
              size="$4"
              width="50%"
              height={200}
              backgroundColor={"#1C2833"}
              onPress={handleViewReports}
            >
              <Text textAlign="center" color={"#fff"}>
                View Reports
              </Text>
            </Button>
          </XStack>
        </View>

        <YStack padding="$3" gap="$3">
          {/* <Button>Help & FAQ</Button> */}

          <Paragraph>
            This is a prototype app. Use the buttons above to capture a new
            report or view existing reports.
          </Paragraph>

          {/* <Button disabled>Settings</Button> */}
          {/* <Button disabled>Manage Account</Button> */}
          <Button
            onPress={() => {
              removeFromSecureStore(StorageKeys.AUTH_TOKEN).then(() => {
                setIsAuthenticated(false);
                router.navigate("/auth/signin");
              });
            }}
          >
            Sign Out
          </Button>
          {/* Button Just to test screens */}
          {/* <Button
						onPress={() => {
							router.push("/auth/signin");
						}}
					>
						Sign In Page
					</Button>
					<Button
						onPress={() => {
							router.push("/auth/register");
						}}
					>
						Register Page
					</Button> */}
        </YStack>
      </YStack>
    </SafeAreaView>
  );
}
