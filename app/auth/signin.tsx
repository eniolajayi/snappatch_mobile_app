import { loginUser } from "@/api/auth";
import { useMutation } from "@tanstack/react-query";
import { router } from "expo-router";
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
import { type FormikProps, useFormik } from "formik";
import { useState } from "react";
import { saveToSecureStore, StorageKeys } from "@/utils/storage";
import { useGlobalContextProvider } from "@/context/global";
import { handleMutationError } from "@/utils/form";

export default function SignInScreen() {
	const [hidePassword, setHidePassword] = useState(true);
	const { isAuthenticated, setIsAuthenticated } = useGlobalContextProvider();
	const initialValues = {
		username: "",
		password: "",
	};

	type SignInFormValues = typeof initialValues;

	// const SignInFormSchema = schema(
	// 	z.object({
	// 		phone: z.string().length(13, "Should be 13 digits"),
	// 		email: z
	// 			.string()
	// 			.email({ message: "Please enter a valid email address." })
	// 			.optional(),
	// 		otp: z.string().length(6),
	// 	}),
	// );

	const form = useFormik({
		initialValues: initialValues,
		// validationSchema: SignInFormSchema,
		onSubmit: (values) => {
			console.log(values);
		},
	});

	const mutation = useMutation({
		mutationFn: loginUser,
		onSuccess: (res) => {
			console.log(res.data);
			if (res.data.token) {
				const token = res.data.token;
				saveToSecureStore(StorageKeys.AUTH_TOKEN, token)
					.then(() => {
						setIsAuthenticated(true);
						console.log("routing to home page");
						router.navigate("/");
					})
					.catch(console.error);
			}
		},
		onError: handleMutationError,
	});

	return (
		<SafeAreaView style={{ flex: 1 }}>
			<YStack paddingHorizontal="$3" paddingVertical="$6">
				<View marginBlockEnd="$6">
					<H2>Snappatch</H2>
				</View>

				<YStack paddingBlockStart="$6" gap="$4">
					<H5>Login</H5>
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
						{mutation.isLoading ? "Logging in . . ." : "Log In"}
					</Button>
					<Button
						size={"$5"}
						color={"#1976D2"}
						chromeless
						onPress={() => {
							router.navigate("/auth/register");
						}}
					>
						Create an account
					</Button>
				</YStack>
			</YStack>
		</SafeAreaView>
	);
}
