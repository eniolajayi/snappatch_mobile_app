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
		<View paddingBlockStart="$4" backgroundColor={"$color1"}>
			<XStack gap="$4" alignContent="center">
				{/* Add back button */}
				<Button size="$3" chromeless onPress={onBackPress}>
					Back
				</Button>
				<Text fontSize={"$8"} marginBlockEnd="$6" fontWeight={"$extraBold"}>
					{screenTitle}
				</Text>
				{/* <Button size="$3" chromeless>
					Go Back
				</Button> */}
			</XStack>
		</View>
	);
}
