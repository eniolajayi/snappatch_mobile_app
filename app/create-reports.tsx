import type React from "react";
import { useState } from "react";
import { router } from "expo-router";
import {
	Button,
	YStack,
	XStack,
	Text,
	View,
	TextArea,
	Group,
	Paragraph,
	Label,
	ScrollView,
} from "tamagui";
import { Trash2 } from "lucide-react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { CustomScreenHeader } from "@/component/CustomScreenHeader";
import * as ImagePicker from "expo-image-picker";
import { ImageBackground } from "react-native";
import { useMutation } from "@tanstack/react-query";
import { createNewReport } from "@/api/report";
import { handleMutationError } from "@/utils/form";
import { Alert } from "react-native";
import { useCreateReportStore } from "@/context/store";
import { toast } from "burnt";

export default function CreateReportScreen() {
	const {
		location,
		category,
		address,
		description,
		image,
		setImage,
		setDescription,
	} = useCreateReportStore((state) => state);

	const pickImage = async () => {
		const result = await ImagePicker.launchImageLibraryAsync({
			mediaTypes: ["images"],
			allowsEditing: true,
			base64: true,
			quality: 1,
		});

		if (!result.canceled) {
			setImage(result.assets[0]);
		}
	};

	const takePhoto = async () => {
		const permission = await ImagePicker.requestCameraPermissionsAsync();
		if (!permission.granted) {
			Alert.alert(
				"Permission required",
				"Camera access is needed to take photos.",
			);
			return;
		}

		const result = await ImagePicker.launchCameraAsync({
			mediaTypes: ["images"],
			allowsEditing: true,
			base64: true,
			quality: 1,
		});

		if (!result.canceled) {
			setImage(result.assets[0]);
		}
	};

	const handleRemoveImage = () => {
		setImage(null);
	};

	const mutation = useMutation({
		mutationFn: createNewReport,
		onSuccess: (res) => {
			console.log(res.data);
			if (res.data.data.id) {
				const id = res.data.data.id;
				router.push({
					pathname: "/view-report",
					params: { reportId: id },
				});
			}
		},
		onError: handleMutationError,
	});

	function handleCreateReport() {
		if (address.length === 0) {
			toast({ title: "Address is required" });
			return;
		}

		if (
			!location ||
			!location.coords ||
			!location.coords.latitude ||
			!location.coords.longitude
		) {
			toast({ title: "Location is required or is missing details" });
			return;
		}

		if (!category || !category.id) {
			toast({ title: "Please select a category" });
			return;
		}

		if (!image || !image.base64) {
			toast({ title: "Please select an image" });
			return;
		}

		const latitude = location.coords.latitude;
		const longitude = location.coords.longitude;
		const base64String = `data:${image.mimeType};base64,${image.base64}`;
		mutation.mutate({
			image: base64String,
			latitude: latitude,
			longitude: longitude,
			description:
				description.length > 0 ? description : "No description provided.",
			address: address,
			categoryId: category.id,
		});
	}

	return (
		<SafeAreaView style={{ flex: 1 }}>
			<CustomScreenHeader
				screenTitle="Submit New Report"
				onBackPress={() => router.navigate("/")}
			/>
			<ScrollView backgroundColor={"$background"}>
				<YStack
					flex={1}
					paddingHorizontal="$3"
					paddingVertical="$6"
					gap="$6"
					backgroundColor="$background"
				>
					<Group borderRadius={"$2"} gap="$2" minHeight={250}>
						<View
							backgroundColor={"#2196F3"}
							maxHeight={280}
							borderRadius={"$2"}
							justifyContent="center"
							alignItems="center"
						>
							<ImageBackground
								source={image ? { uri: image.uri } : { uri: "" }}
								resizeMode="cover"
								style={{ width: "100%", height: "100%" }}
							>
								<XStack
									width={"100%"}
									height={"100%"}
									justifyContent="center"
									alignItems="center"
									gap="$4"
								>
									<Button
										size="$4"
										backgroundColor={image ? "#2196F3" : "$background"}
										color={image ? "white" : ""}
										onPress={pickImage}
									>
										{image ? "Change Image" : "Pick photo"}
									</Button>
									<Button
										size="$4"
										backgroundColor={image ? "#2196F3" : "$background"}
										color={image ? "white" : ""}
										onPress={takePhoto}
									>
										{"Capture  photo"}
									</Button>
								</XStack>
							</ImageBackground>
						</View>
						<XStack>
							{image && (
								<Button
									size={"$2"}
									icon={Trash2}
									themeInverse
									color="#fff"
									onPress={handleRemoveImage}
								>
									Remove Image
								</Button>
							)}
						</XStack>
					</Group>

					<YStack gap="$4">
						<XStack>
							<Button
								size={"$4"}
								onPress={() => router.navigate("/add-location")}
							>
								{location ? "Change Location" : "Add Location"}
							</Button>
						</XStack>
						<Paragraph width={"100%"} paddingInlineStart="$2">
							{location ? (
								<Text>
									Location:{" "}
									{`lat:${location.coords.latitude} * long:${location.coords.longitude}`}
								</Text>
							) : (
								<Text>No Location </Text>
							)}
						</Paragraph>
					</YStack>
					<YStack gap="$4">
						<XStack>
							<Button
								size={"$4"}
								onPress={() => router.navigate("/categories")}
							>
								{category ? "Change Category" : "Select Category"}
							</Button>
						</XStack>
						<Paragraph width={"100%"} paddingInlineStart="$2">
							{category ? category.name : "No category selected"}
						</Paragraph>
					</YStack>
					<Group>
						<Label htmlFor="report-desc">
							Description ({`${description.length}`}/1000)
						</Label>
						<TextArea
							size="$4"
							id="report-desc"
							numberOfLines={10}
							maxLength={1000}
							minHeight={200}
							height={"auto"}
							borderWidth={1}
							placeholder="What is going on in the image"
							paddingBlockStart={0}
							value={description}
							onChangeText={(t) => setDescription(t)}
						/>
					</Group>
					<Button
						size={"$5"}
						backgroundColor={"#1976D2"}
						color={"white"}
						onPress={handleCreateReport}
					>
						{mutation.isLoading ? "Creating . . ." : "Create Report"}
					</Button>
				</YStack>
			</ScrollView>
		</SafeAreaView>
	);
}
