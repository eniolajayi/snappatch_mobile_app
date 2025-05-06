import React from "react";
import { XStack, View, Button, Text } from "tamagui";

type CustomScreenHeaderProps = {
	screenTitle: string;
	onBackPress: () => void;
};

export function CustomScreenHeader({
	screenTitle,
	onBackPress,
}: CustomScreenHeaderProps) {
	return (
		<View paddingBlock="$2">
			<XStack gap="$4" paddingBlock="$2" alignItems="center">
				<Button chromeless onPress={onBackPress}>
					Back
				</Button>
				<Text fontSize={"$8"} fontWeight={"$extraBold"}>
					{screenTitle}
				</Text>
			</XStack>
		</View>
	);
}
