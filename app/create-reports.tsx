import React, { memo, useEffect, useState } from "react";
import { router } from "expo-router";
import {
	Button,
	YStack,
	XStack,
	Separator,
	Spacer,
	Text,
	View,
	TextArea,
	Image,
	Group,
	Paragraph,
	Sheet,
	Input,
	Label,
	H2,
	H4,
	H5,
} from "tamagui";
import { Trash2 } from "lucide-react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { CustomScreenHeader } from "@/component/CustomScreenHeader";
import * as ImagePicker from "expo-image-picker";
import { ImageBackground } from "react-native";
import * as Location from "expo-location";
import { create } from "zustand";

type LocationState = {
	location: Location.LocationObject | null;
	setLocation: (location: Location.LocationObject | null) => void;
};

const useLocationStore = create<LocationState>((set) => ({
	location: null,
	setLocation: (location) => set({ location }),
}));

export default function CreateReportScreen() {
	const [image, setImage] = useState<string | null>(null);
	const [modalPosition, setModalPosition] = React.useState(0);
	const [modalOpen, setModalOpen] = React.useState(false);
	const location = useLocationStore((state) => state.location);

	const pickImage = async () => {
		// No permissions request is necessary for launching the image library
		const result = await ImagePicker.launchImageLibraryAsync({
			mediaTypes: ["images"],
			allowsEditing: true,
			quality: 1,
		});

		console.log("Selected Image", result);

		if (!result.canceled) {
			setImage(result.assets[0].uri);
		}
	};

	const handleRemoveImage = () => {
		setImage(null);
	};

	return (
		<SafeAreaView style={{ flex: 1 }}>
			<CustomScreenHeader
				screenTitle="Submit New Report"
				onBackPress={() => router.back()}
			/>
			<YStack
				flex={1}
				paddingHorizontal="$3"
				paddingVertical="$6"
				gap="$6"
				backgroundColor="$background"
			>
				<Group borderRadius={"$2"} minHeight={250}>
					<View
						backgroundColor={"#2196F3"}
						maxHeight={250}
						borderRadius={"$2"}
						justifyContent="center"
						alignItems="center"
					>
						<ImageBackground
							source={image ? { uri: image } : { uri: "" }}
							resizeMode="cover"
							style={{ width: "100%", height: "100%" }}
						>
							<View
								width={"100%"}
								height={"100%"}
								justifyContent="center"
								alignItems="center"
							>
								<Button
									size="$4"
									backgroundColor={image ? "#2196F3" : ""}
									color={image ? "white" : ""}
									onPress={pickImage}
								>
									{image ? "Change Image" : "Pick Image"}
								</Button>
							</View>
						</ImageBackground>
					</View>
					<XStack>
						{image && (
							<Button
								size={"$2"}
								icon={Trash2}
								themeInverse
								onPress={handleRemoveImage}
							>
								Remove Image
							</Button>
						)}
					</XStack>
				</Group>

				<YStack gap="$4">
					<XStack>
						<Button size={"$4"} onPress={() => setModalOpen(true)}>
							Add Location
						</Button>
					</XStack>
					<Paragraph width={"100%"}>
						{location ? (
							<Text>Location: {JSON.stringify(location)}</Text>
						) : (
							<Text>No Location </Text>
						)}
					</Paragraph>
				</YStack>
				<Group>
					<Label htmlFor="report-desc">Description</Label>
					<TextArea
						size="$4"
						id="report-desc"
						// numberOfLines={10}
						borderWidth={1}
						placeholder="What is going on in the image"
						paddingBlockStart={0}
					/>
				</Group>
				<Button size={"$5"} backgroundColor={"#1976D2"} color={"white"}>
					Add Report
				</Button>
			</YStack>
			<AddLocationSheet
				position={modalPosition}
				setOpen={setModalOpen}
				open={modalOpen}
				setPosition={setModalPosition}
			/>
		</SafeAreaView>
	);
}

type AddLocationSheetProps = {
	position: number;
	setPosition: React.Dispatch<React.SetStateAction<number>>;
	open: boolean;
	setOpen: React.Dispatch<React.SetStateAction<boolean>>;
};

function AddLocationSheet({
	position,
	setOpen,
	setPosition,
	open,
}: AddLocationSheetProps) {
	return (
		<Sheet
			forceRemoveScrollEnabled={open}
			modal={true}
			open={open}
			onOpenChange={setOpen}
			snapPoints={[85, 50, 25]}
			snapPointsMode={"percent"}
			dismissOnSnapToBottom
			position={position}
			onPositionChange={setPosition}
			zIndex={100_000}
			animation="medium"
		>
			<Sheet.Overlay
				animation="lazy"
				backgroundColor="$shadow6"
				enterStyle={{ opacity: 0 }}
				exitStyle={{ opacity: 0 }}
			/>
			<Sheet.Handle />
			<Sheet.Frame
				padding="$4"
				// justifyContent="center"
				// alignItems="center"
				gap="$5"
			>
				<AddLocationSheetContent setOpen={setOpen} />
			</Sheet.Frame>
		</Sheet>
	);
}

type AddLocationSheetContentProps = {
	setOpen: React.Dispatch<React.SetStateAction<boolean>>;
};

function AddLocationSheetContent(props: AddLocationSheetContentProps) {
	const { setOpen } = props;
	const setLocation = useLocationStore((state) => state.setLocation);
	const [errorMsg, setErrorMsg] = useState<string | null>(null);

	const handleAddLocation = async () => {
		const { status } = await Location.requestForegroundPermissionsAsync();
		if (status !== "granted") {
			setErrorMsg("Permission to access location was denied");
			return;
		}

		const location = await Location.getCurrentPositionAsync({});
		setLocation(location);
		setOpen(false);
	};

	return (
		<YStack gap="$4">
			<H5>Add Location</H5>

			<YStack gap="$4" marginBlockEnd="$4">
				<View backgroundColor={"#BBDEFB"} borderRadius={"$4"} minHeight={175}>
					{/* Setup Map View */}
					<Text>Map Placeholder</Text>
				</View>
				<Button
					size={"$5"}
					backgroundColor={"#1976D2"}
					color={"white"}
					onPress={handleAddLocation}
				>
					Use my current location
				</Button>
			</YStack>
			{/* Setup postcode lookup with postcode.io */}
			<YStack>
				<Label htmlFor="post-code">Post Code</Label>
				<Input size="$4" id="post-code" placeholder="XXX.XXX" />
			</YStack>

			<Button
				size="$5"
				color={"white"}
				onPress={() => setOpen(false)}
				backgroundColor={"#1976D2"}
			>
				Save
			</Button>
		</YStack>
	);
}
