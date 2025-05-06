import React, { useState } from "react";
import { KeyboardAvoidingView, Platform, StyleSheet } from "react-native";
import { router } from "expo-router";
import {
	YStack,
	View,
	Button,
	Label,
	Input,
	ScrollView,
	Paragraph,
	ListItem,
} from "tamagui";
import { SafeAreaView } from "react-native-safe-area-context";
import { CustomScreenHeader } from "@/component/CustomScreenHeader";
import * as Location from "expo-location";
import { useCreateReportStore } from "@/context/store";
import MapView from "react-native-maps";
import { useMutation, useQuery } from "@tanstack/react-query";
import {
	getNearestPostCode,
	getPostCodeDetails,
	type GetPostcodeResponse,
	type NearestPostcodeResult,
	type PostCodeResult,
	verifyPostCode,
} from "@/api/location";
import { handleMutationError } from "@/utils/form";
import type { AxiosResponse } from "axios";

export default function AddLocationScreen() {
	const { setLocation, location, setAddress, address } = useCreateReportStore(
		(state) => state,
	);
	const [errorMsg, setErrorMsg] = useState<string | null>(null);
	const [loading, setLoading] = useState(false);
	const [postcode, setPostcode] = useState("");
	const [nearestPostcodes, setNearestPostcodes] =
		useState<NearestPostcodeResult[]>();

	const nearestPostcodeQuery = useMutation({
		mutationFn: getNearestPostCode,
		onError: handleMutationError,
	});

	const postcodeQuery = useMutation({
		mutationFn: getPostCodeDetails,
		onError: handleMutationError,
	});

	const verifyPostcodeQuery = useMutation({
		mutationFn: verifyPostCode,
		onError: handleMutationError,
	});

	const handleAddLocation = async () => {
		setLoading(true);
		const { status } = await Location.requestForegroundPermissionsAsync();
		if (status !== "granted") {
			setErrorMsg("Permission to access location was denied");
			return;
		}

		const result = await Location.getCurrentPositionAsync({});
		setLocation(result);
		nearestPostcodeQuery.mutate(
			{
				lat: result.coords.latitude,
				long: result.coords.longitude,
			},
			{
				onSuccess: (res) => {
					const data = res.data.result;
					setNearestPostcodes(data);
				},
			},
		);

		setLoading(false);
	};

	function handlePostcodeSelect(item: NearestPostcodeResult) {
		setPostcode(item.postcode);
		setAddress(`${item.admin_district}, ${item.country}, ${item.postcode}`);
		setNearestPostcodes(undefined);
	}

	function handleGetPostcodeDetails(res: AxiosResponse<GetPostcodeResponse>) {
		const data = res.data.result;
		setLocation({
			coords: {
				latitude: data.latitude,
				longitude: data.longitude,
				altitude: null,
				accuracy: null,
				altitudeAccuracy: null,
				heading: null,
				speed: null,
			},
			timestamp: 0,
		});

		setAddress(`${data.admin_district}, ${data.country}, ${data.postcode}`);
	}

	return (
		<SafeAreaView style={{ flex: 1 }}>
			<CustomScreenHeader
				screenTitle="Add Location"
				onBackPress={() => router.navigate("/create-reports")}
			/>
			<ScrollView flex={1} backgroundColor={"$background"}>
				<YStack
					flex={1}
					backgroundColor="$background"
					justifyContent="space-around"
					paddingInline="$3"
					paddingBlock="$3"
				>
					<YStack gap="$4" marginBlockEnd="$4">
						<View
							backgroundColor={"#BBDEFB"}
							borderRadius={"$4"}
							maxHeight={250}
						>
							{/* Map not showing */}
							<MapView
								onMapReady={() => console.log("map ready")}
								style={styles.map}
								zoomEnabled={true}
								// initialRegion={{
								// 	latitude: 37.78825,
								// 	longitude: -122.4324,
								// 	latitudeDelta: 0.0922,
								// 	longitudeDelta: 0.0421,
								// }}
								showsUserLocation={true}
							/>
						</View>
						<Button
							size={"$5"}
							backgroundColor={"#1976D2"}
							color={"white"}
							onPress={handleAddLocation}
						>
							{loading ? "Fetching ..." : "Use my current location"}
						</Button>
					</YStack>
					{nearestPostcodes?.length && nearestPostcodes && (
						<YStack>
							<Paragraph>
								Select a post code, you can change the address after.
							</Paragraph>
							{nearestPostcodes.map((item) => {
								return (
									<ListItem
										key={item.distance}
										title={item.postcode}
										onPress={() => handlePostcodeSelect(item)}
									/>
								);
							})}
						</YStack>
					)}
					<YStack marginBlockEnd="$4">
						<Label htmlFor="post-code">Postcode</Label>
						<Input
							size="$4"
							id="post-code"
							placeholder="XXX.XXX"
							value={postcode}
							onChangeText={(t) => setPostcode(t)}
							onEndEditing={() => {
								verifyPostcodeQuery.mutate(postcode, {
									onSuccess: () => {
										postcodeQuery.mutate(postcode, {
											onSuccess: handleGetPostcodeDetails,
										});
									},
								});
							}}
						/>
						{verifyPostcodeQuery.isLoading ||
							(postcodeQuery.isLoading && <Paragraph>Loading . . .</Paragraph>)}
						{verifyPostcodeQuery.error && (
							<Paragraph color="$red10">Invalid postcode</Paragraph>
						)}
						{postcodeQuery.error && (
							<Paragraph color="$red10">
								Failed to get postcode details
							</Paragraph>
						)}
					</YStack>

					<YStack gap="$2" marginBlockEnd="$4">
						<Label htmlFor="address">Address</Label>
						<KeyboardAvoidingView
							behavior={Platform.OS === "ios" ? "padding" : "height"}
						>
							<Input
								size="$4"
								id="address"
								value={address}
								onChangeText={(t) => {
									setAddress(t);
								}}
								placeholder=""
							/>
						</KeyboardAvoidingView>
					</YStack>

					<Button
						size="$5"
						color={"white"}
						onPress={() => {
							router.navigate("/create-reports");
						}}
						backgroundColor={"#1976D2"}
					>
						Done
					</Button>
				</YStack>
			</ScrollView>
		</SafeAreaView>
	);
}

const styles = StyleSheet.create({
	container: {
		flex: 1,
	},
	map: {
		width: "100%",
		height: "100%",
		borderRadius: 30,
	},
});
