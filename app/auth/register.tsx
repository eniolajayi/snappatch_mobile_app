import { registerUser } from "@/api/auth";
import { useMutation } from "@tanstack/react-query";
import { router } from "expo-router";
import { useFormik } from "formik";
import React, { useState } from "react";
import { SafeAreaView } from "react-native-safe-area-context";
import {
	Button,
	Group,
	H2,
	H5,
	Input,
	Label,
	View,
	XStack,
	YStack,
} from "tamagui";

export default function RegisterScreen() {
	const [hidePassword, setHidePassword] = useState(true);
	const initialValues = {
		username: "",
		password: "",
	};

	const form = useFormik({
		initialValues: initialValues,
		// validationSchema: SignInFormSchema,
		onSubmit: (values) => {
			console.log(values);
		},
	});

	const mutation = useMutation({
		mutationFn: registerUser,
		onSuccess: (res) => {
			console.log(res.data);
			if (res.data.ok) {
				console.log("routing to signin page");
				router.navigate("/auth/signin");
			}
		},
		onError: (error) => {
			console.error("Error logging in:", error);
		},
	});

	return (
		<SafeAreaView style={{ flex: 1 }}>
			<YStack paddingHorizontal="$3" paddingVertical="$6">
				<View marginBlockEnd="$6">
					<H2>Snappatch</H2>
				</View>

				<YStack paddingBlockStart="$6" gap="$4">
					<H5>Register</H5>
					<Group>
						<Label>Username / Email address </Label>
						<Input
							size="$4"
							placeholder="Enter your username or email address"
							onChangeText={form.handleChange("username")}
							onBlur={form.handleBlur("username")}
							value={form.values.username}
						/>
					</Group>

					<Group>
						<Label>Password </Label>
						<XStack alignItems="center" justifyContent="space-between" gap="$4">
							<Input
								size="$4"
								placeholder=""
								onChangeText={form.handleChange("password")}
								secureTextEntry={hidePassword}
								onBlur={form.handleBlur("password")}
								value={form.values.password}
								flex={1}
							/>
							<Button
								size="$1"
								color={"#1976D2"}
								onPress={() => {
									setHidePassword(!hidePassword);
								}}
								chromeless
							>
								{hidePassword ? "Show" : "Hide"}
							</Button>
						</XStack>
					</Group>

					<Button
						size={"$5"}
						backgroundColor={"#1976D2"}
						color={"white"}
						onPress={() => {
							mutation.mutate(form.values);
						}}
					>
						{mutation.isLoading ? "Creating . . ." : "Create Account"}
					</Button>
					<Button
						size={"$5"}
						color={"#1976D2"}
						chromeless
						onPress={() => {
							router.navigate("/auth/signin");
						}}
					>
						Log In to your account
					</Button>
				</YStack>
			</YStack>
		</SafeAreaView>
	);
}
