import React, { useState, useContext } from 'react';
import AuthContext from '../context/AuthContext';
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
import Logo from '../components/Logo';

export default ({ navigation }) => {
	const [ emailInput, setEmailInput ] = useState('');
	const [ passwordInput, setPasswordInput ] = useState('');

	const { setIsAuth } = useContext(AuthContext);

	const loginButtonHandler = async () => {
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

		const response = await fetch('https://frozen-peak-79158.herokuapp.com/login', {
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

		// Failed to login, clear input and alert the user.
		if (!data.success) {
			setEmailInput('');
			setPasswordInput('');

			Alert.alert('Failed To Login!', 'Sorry, it seems that the login was not successful. Please try again.', [
				{
					text: 'Okay Sure',
					style: 'default'
				}
			]);

			return;
		}

		// Set the JWT Token into AsyncStorage to persist authenticated state.
		await AsyncStorage.setItem('token', data.token);

		// Set isAuth to true in order to render the normal Home Screen.
		Alert.alert('Login Successful!', 'Will redirect to home screen by changing auth state.', [
			{
				text: 'Okay Sure',
				style: 'default',
				onPress: () => setIsAuth(true)
			}
		]);
	};

	return (
		<TouchableWithoutFeedback onPress={() => Keyboard.dismiss()}>
			<View style={styles.screen}>
				<View style={styles.header}>
					<Logo dimensions={{ height: 50, width: 50 }} />
					<Text style={styles.headerText}>Login to Start Shopping!</Text>
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
							style={{ ...styles.baseInput, ...styles.passwordInput, ...styles.inputField }}
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
		backgroundColor: 'white'
	},
	header: {
		backgroundColor: '#778DA9',
		width: '100%',
		flexDirection: 'row',
		alignItems: 'center',
		justifyContent: 'space-around'
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
		backgroundColor: 'white',
		padding: 20
	},
	inputContainer: {
		width: '100%',
		flexDirection: 'row',
		alignItems: 'center',
		justifyContent: 'space-between',
		marginTop: 75
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
		marginTop: 50,
		flexDirection: 'row',
		justifyContent: 'space-around',
		alignItems: 'center',
		width: '80%'
	},
	inputField: {
		backgroundColor: '#E0E1DD'
	}
});
