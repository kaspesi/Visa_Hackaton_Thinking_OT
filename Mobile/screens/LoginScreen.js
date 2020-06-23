import React, { useState } from 'react';
import { StyleSheet, View, Text, TextInput, Keyboard, TouchableWithoutFeedback, Alert } from 'react-native';
import Button from '../components/Button';

export default ({ navigation, route }) => {
	const [ emailInput, setEmailInput ] = useState('');
	const [ passwordInput, setPasswordInput ] = useState('');

	const { setIsAuth } = route.params;

	const loginButtonHandler = async () => {
		Alert.alert('Login!', `email ${emailInput} password ${passwordInput}`, [
			{
				text: 'Okay',
				style: 'default',
				onPress: () => {}
			}
		]);

		// validate email and password, then post /login fetch
		setIsAuth(true);
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
		justifyContent: 'center',
		borderBottomWidth: 2
	},
	headerText: {
		fontSize: 22,
		fontWeight: '700'
	},
	formContainer: {
		borderWidth: 5,
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
		fontWeight: '400'
	},
	buttonsContainer: {
		marginBottom: 100,
		flexDirection: 'row',
		justifyContent: 'space-around',
		alignItems: 'center',
		width: '80%'
	}
});
