import React, { useState } from 'react';
import { StyleSheet, View, Text, TextInput, Keyboard, TouchableWithoutFeedback, Alert } from 'react-native';
import Button from '../components/Button';

export default ({ navigation }) => {
	const [ emailInput, setEmailInput ] = useState('');
	const [ passwordInput, setPasswordInput ] = useState('');
	const [ confirmPasswordInput, setConfirmPasswordInput ] = useState('');

	const registerButtonHandler = async () => {
		Alert.alert('Register Clicked!', 'Will redirect to login screen.', [
			{
				text: 'Okay Sure',
				style: 'default',
				onPress: () => navigation.navigate('Login')
			}
		]);

		// UNCOMMENT BELOW WHEN SERVER SETUP

		// // Validate that the password and confirm are the same.
		// if (passwordInput !== confirmPasswordInput) {
		// 	Alert.alert('Failed To Register!', 'Your password and confirm input do not match. Please try again.', [
		// 		{
		// 			text: 'Okay Sure',
		// 			style: 'default'
		// 		}
		// 	]);

		// 	return;
		// }

		// // POST /register fetch -> backend should check if there is an existing email in database.
		// const response = await fetch('http://localhost:3001/register', {
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
		//  * 	errorMessage: string
		//  * }
		//  */

		// // Failed to register, clear input and alert the user.
		// if (!data.success) {
		// 	setEmailInput('');
		// 	setPasswordInput('');
		// 	setConfirmPasswordInput('');

		// 	Alert.alert(
		// 		'Failed To Register!',
		// 		'Sorry, it seems that the register was not successful. Please try again.',
		// 		[
		// 			{
		// 				text: 'Okay Sure',
		// 				style: 'default'
		// 			}
		// 		]
		// 	);

		// 	return;
		// }

		// // Successfully registered, navigate to login screen.
		// return navigation.navigate('Login');
	};

	return (
		<TouchableWithoutFeedback onPress={() => Keyboard.dismiss()}>
			<View style={styles.screen}>
				<View style={styles.header}>
					<Text style={styles.headerText}>Register a New Account!</Text>
				</View>

				<View style={styles.formContainer}>
					<View style={styles.inputContainer}>
						<Text style={styles.inputLabel}>Email: </Text>
						<TextInput
							style={{ ...styles.baseInput, ...styles.emailInput }}
							onChangeText={(input) => setEmailInput(input)}
							value={emailInput}
							placeholder="email"
						/>
					</View>

					<View style={styles.inputContainer}>
						<Text style={styles.inputLabel}>Password: </Text>
						<TextInput
							style={{ ...styles.baseInput, ...styles.passwordInput }}
							onChangeText={(input) => setPasswordInput(input)}
							value={passwordInput}
							placeholder="password"
						/>
					</View>

					<View style={styles.inputContainer}>
						<Text style={styles.inputLabel}>Confirm: </Text>
						<TextInput
							style={{ ...styles.baseInput, ...styles.confirmPasswordInput }}
							onChangeText={(input) => setConfirmPasswordInput(input)}
							value={confirmPasswordInput}
							placeholder="confirm"
						/>
					</View>
				</View>

				<View style={styles.buttonsContainer}>
					<Button buttonPressHandler={() => navigation.goBack()}>
						<Text style={{fontFamily: ""}}>Go Back</Text>
					</Button>
					<Button buttonPressHandler={registerButtonHandler}>
						<Text style={{fontFamily: ""}}>Register</Text>
					</Button>
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
		height: 80,
		width: '100%',
		alignItems: 'center',
		justifyContent: 'center'
	},
	headerText: {
		fontSize: 22,
		fontWeight: '700',
		color: 'white',
		fontFamily: ""
	},
	formContainer: {
		borderRadius: 50,
		height: 250,
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
