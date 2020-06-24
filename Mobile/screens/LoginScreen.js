import React, { useState } from 'react';
import {
	StyleSheet,
	View,
	Text,
	TextInput,
	Keyboard,
	TouchableWithoutFeedback,
	Alert,
	AsyncStorage
} from 'react-native';
import Button from '../components/Button';

export default ({ navigation }) => {
	const [ emailInput, setEmailInput ] = useState('');
	const [ passwordInput, setPasswordInput ] = useState('');

	const loginButtonHandler = async () => {
		Alert.alert('Login Clicked!', 'Will redirect to home screen by changing auth state.', [
			{
				text: 'Okay Sure',
				style: 'default',
				onPress: () => setIsAuth(true)
			}
		]);

		// UNCOMMENT BELOW WHEN SERVER SETUP

		// // POST /register fetch -> backend should verify that this user exists with this email and password.
		// const response = await fetch('http://localhost:3001/login', {
		// 	method: 'post',
		// 	headers: {
		// 		'content-type': 'application/json'
		// 	},
		// 	body: JSON.stringify({
		// 		email: emailInput,
		// 		password: passwordInput
		// 	})
		// });

		// const data = await response.json();
		// /**
		//  * is expect data to be a JS object with
		//  * {
		//  * 	success: boolean,
		//  * 	errorMessage: string,
		//  * 	token: JWTTOKEN -> should be a string
		//  * }
		//  */

		// // Failed to login, clear input and alert the user.
		// if (!data.success) {
		// 	setEmailInput('');
		// 	setPasswordInput('');

		// 	Alert.alert('Failed To Login!', 'Sorry, it seems that the login was not successful. Please try again.', [
		// 		{
		// 			text: 'Okay Sure',
		// 			style: 'default'
		// 		}
		// 	]);

		// 	return;
		// }

		// // Set the JWT Token into AsyncStorage to persist authenticated state.
		// await AsyncStorage.setItem('token', data.token);

		// // Set isAuth to true in order to render the normal Home Screen.
		// return setIsAuth(true);
	};

	return (
		<TouchableWithoutFeedback onPress={() => Keyboard.dismiss()}>
			<View style={styles.screen}>
				<View style={styles.header}>
					<Text style={styles.headerText}>Login To Your Account!</Text>
				</View>

				<View style={styles.formContainer}>
					<View style={styles.inputContainer}>
						<Text style={styles.inputLabel}>Email:</Text>
						<TextInput
							style={{ ...styles.baseInput, ...styles.emailInput }}
							onChangeText={(input) => setEmailInput(input)}
							value={emailInput}
							placeholder="email"
						/>
					</View>

					<View style={styles.inputContainer}>
						<Text style={styles.inputLabel}>Password:</Text>
						<TextInput
							style={{ ...styles.baseInput, ...styles.passwordInput }}
							onChangeText={(input) => setPasswordInput(input)}
							value={passwordInput}
							placeholder="password"
						/>
					</View>
				</View>

				<View style={styles.buttonsContainer}>
					<Button buttonPressHandler={() => navigation.goBack()}>Go Back</Button>
					<Button buttonPressHandler={loginButtonHandler}>Login</Button>
				</View>
			</View>
		</TouchableWithoutFeedback>
	);
};

const styles = StyleSheet.create({
	screen: {
		flex: 1,
		width: '100%',
		justifyContent: 'space-between',
		alignItems: 'center',
		backgroundColor: 'beige'
	},
	header: {
		backgroundColor: 'palevioletred',
		height: 100,
		width: '100%',
		alignItems: 'center',
		justifyContent: 'center'
	},
	headerText: {
		fontSize: 22,
		fontWeight: '700',
		color: 'white'
	},
	formContainer: {
		borderRadius: 50,
		height: 200,
		width: '90%',
		alignItems: 'center',
		justifyContent: 'space-around',
		backgroundColor: 'paleturquoise',
		padding: 20
	},
	inputContainer: {
		width: '100%',
		flexDirection: 'row',
		alignItems: 'center',
		justifyContent: 'space-between'
	},
	baseInput: {
		backgroundColor: 'white',
		width: '70%',
		padding: 10,
		borderRadius: 10
	},
	inputLabel: {
		fontSize: 16,
		fontWeight: '700'
	},
	buttonsContainer: {
		marginBottom: 250,
		flexDirection: 'row',
		justifyContent: 'space-around',
		alignItems: 'center',
		width: '80%'
	}
});
