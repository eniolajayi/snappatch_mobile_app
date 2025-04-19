import { useFonts } from "expo-font";
import { Stack } from "expo-router";
import * as SplashScreen from "expo-splash-screen";
import { StatusBar } from "expo-status-bar";
import { useEffect } from "react";
import "react-native-reanimated";
import { TamaguiProvider } from "tamagui";
import { type AppStateStatus, Platform } from "react-native";
import {
	focusManager,
	QueryClient,
	QueryClientProvider,
} from "@tanstack/react-query";
import { useOnlineManager } from "@/hooks/useOnlineManager";
import { useAppState } from "@/hooks/useAppState";
import tamaguiConfig from "@/tamagui.config";
import { GlobalContextProvider } from "@/context/global";

SplashScreen.preventAutoHideAsync();

function onAppStateChange(status: AppStateStatus) {
	if (Platform.OS !== "web") {
		focusManager.setFocused(status === "active");
	}
}

const queryClient = new QueryClient({
	defaultOptions: { queries: { retry: 2 } },
});

export default function RootLayout() {
	useOnlineManager();
	useAppState(onAppStateChange);

	const [loaded] = useFonts({
		SpaceMono: require("../assets/fonts/SpaceMono-Regular.ttf"),
	});

	useEffect(() => {
		if (loaded) {
			SplashScreen.hideAsync();
		}
	}, [loaded]);

	if (!loaded) {
		return null;
	}

	return (
		<QueryClientProvider client={queryClient}>
			<GlobalContextProvider>
				<TamaguiProvider config={tamaguiConfig} defaultTheme="light">
					<StatusBar style="auto" />
					<Stack>
						<Stack.Screen name="index" options={{ headerShown: false }} />
						<Stack.Screen name="auth/signin" options={{ headerShown: false }} />
						<Stack.Screen
							name="auth/register"
							options={{ headerShown: false }}
						/>
						<Stack.Screen
							name="create-reports"
							options={{ headerShown: false }}
						/>
						<Stack.Screen name="all-reports" options={{ headerShown: false }} />
					</Stack>
				</TamaguiProvider>
			</GlobalContextProvider>
		</QueryClientProvider>
	);
}
