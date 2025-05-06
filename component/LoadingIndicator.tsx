import * as React from "react";
import { ActivityIndicator } from "react-native";
import { Spinner, View } from "tamagui";

export function LoadingIndicator() {
	return (
		<View flex={1} justifyContent="center" alignItems="center">
			<Spinner size="large" color="$orange10" />
		</View>
	);
}
