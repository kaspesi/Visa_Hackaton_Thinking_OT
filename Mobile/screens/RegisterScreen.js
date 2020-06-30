import React, { useState } from 'react';
import { StyleSheet, View, Text, TextInput, Keyboard, TouchableWithoutFeedback, Alert } from 'react-native';
import Button from '../components/Button';
import Logo from '../components/Logo';

export default ({ navigation }) => {
	const [ emailInput, setEmailInput ] = useState('');
	const [ passwordInput, setPasswordInput ] = useState('');
	const [ confirmPasswordInput, setConfirmPasswordInput ] = useState('');

	const registerButtonHandler = async () => {
		const emailRegex = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
		if (!emailRegex.test(emailInput.toLowerCase())) {
			Alert.alert('Invalid Email!', 'Please enter a valid email.', [
				{
					text: 'Okay Sure',
					style: 'default'
				}
			]);
			return;
		}

		if (passwordInput.length < 1) {
			Alert.alert('Invalid Password!', 'Your password needs to be at least 1 character.', [
				{
					text: 'Okay Sure',
					style: 'default'
				}
			]);
			return;
		}

		if (passwordInput !== confirmPasswordInput) {
			Alert.alert('Invalid Confirm!', 'Your passwords do not match.', [
				{
					text: 'Okay Sure',
					style: 'default'
				}
			]);
			return;
		}

		// POST /register fetch -> backend should check if there is an existing email in database.
		const response = await fetch('https://frozen-peak-79158.herokuapp.com/register', {
			method: 'post',
			headers: {
				'content-type': 'application/json'
			},
			body: JSON.stringify({
				email: emailInput,
				password: passwordInput
			})
		});

		const data = await response.json();

		// Failed to register, clear input and alert the user.
		if (!data.success) {
			setEmailInput('');
			setPasswordInput('');
			setConfirmPasswordInput('');

			Alert.alert(
				'Failed To Register!',
				'Sorry, it seems that the register was not successful. Please try again.',
				[
					{
						text: 'Okay Sure',
						style: 'default'
					}
				]
			);

			return;
		}

		Alert.alert('Successfully Registered!', 'You will be redirected to the login screen.', [
			{
				text: 'Okay Sure',
				style: 'default',
				onPress: () => navigation.navigate('Login')
			}
		]);
	};

	return (
		<TouchableWithoutFeedback onPress={() => Keyboard.dismiss()}>
			<View style={styles.screen}>
				<View style={styles.header}>
					<Logo dimensions={{ height: 50, width: 50 }} />
					<Text style={styles.headerText}>Register a New Account!</Text>
				</View>

				<View style={styles.formContainer}>
					<View style={styles.inputContainer}>
						<Text style={styles.inputLabel}>Email: </Text>
						<TextInput
							style={{ ...styles.baseInput, ...styles.emailInput, ...styles.inputField }}
							onChangeText={(input) => setEmailInput(input)}
							value={emailInput}
							placeholder="email"
						/>
					</View>

					<View style={styles.inputContainer}>
						<Text style={styles.inputLabel}>Password: </Text>
						<TextInput
							style={{ ...styles.baseInput, ...styles.passwordInpu, ...styles.inputField }}
							onChangeText={(input) => setPasswordInput(input)}
							value={passwordInput}
							placeholder="password"
						/>
					</View>

					<View style={styles.inputContainer}>
						<Text style={styles.inputLabel}>Confirm: </Text>
						<TextInput
							style={{ ...styles.baseInput, ...styles.confirmPasswordInput, ...styles.inputField }}
							onChangeText={(input) => setConfirmPasswordInput(input)}
							value={confirmPasswordInput}
							placeholder="confirm"
						/>
					</View>
				</View>

				<View style={styles.buttonsContainer}>
					<Button buttonPressHandler={() => navigation.goBack()}>Go Back</Button>
					<View style={styles.emptyBlock} />
					<Button buttonPressHandler={registerButtonHandler}>Register</Button>
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
		backgroundColor: 'white'
	},
	header: {
		backgroundColor: '#778DA9',
		width: '100%',
		flexDirection: 'row',
		alignItems: 'center',
		justifyContent: 'center',
		paddingTop: 30
	},
	headerText: {
		fontSize: 22,
		fontWeight: '700',
		color: 'white',
		textAlign: 'center'
	},
	formContainer: {
		height: 250,
		width: '90%',
		alignItems: 'center',
		justifyContent: 'space-around',
		backgroundColor: 'white'
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
	},
	inputField: {
		backgroundColor: '#E0E1DD'
	},
	emptyBlock: {
		width: 50
	}
});
