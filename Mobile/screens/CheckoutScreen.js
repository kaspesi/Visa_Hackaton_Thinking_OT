import React, { useState, useContext } from 'react';
import {
	StyleSheet,
	View,
	Text,
	ScrollView,
	TouchableWithoutFeedback,
	Keyboard,
	Alert,
	TextInput,
	AsyncStorage
} from 'react-native';
import MerchantIdContext from '../context/MerchantIdContext';
import CartContext from '../context/CartContext';
import Button from '../components/Button';

export default () => {
	const [ number, setNumber ] = useState('');
	const [ expirationMonth, setExpirationMonth ] = useState('');
	const [ expirationYear, setExpirationYear ] = useState('');
	const [ securityCode, setSecurityCode ] = useState('');
	const [ firstName, setFirstName ] = useState('');
	const [ lastName, setLastName ] = useState('');
	const [ address1, setAddress1 ] = useState('');
	const [ address2, setAddress2 ] = useState('');
	const [ locality, setLocality ] = useState('');
	const [ administrativeArea, setAdministrativeArea ] = useState('');
	const [ postalCode, setPostalCode ] = useState('');
	const [ phoneNumber, setPhoneNumber ] = useState('');

	const { confirmedMerchantId, setConfirmedMerchantId } = useContext(MerchantIdContext);
	const { cart, setCart } = useContext(CartContext);

	const calculateCartTotal = () => {
		let total = 0;
		cart.map((item) => (total += item.price * item.quantity));
		return total.toString();
	};

	const confirmOrderHandler = async () => {
		// NEEDS VALIDATION

		Alert.alert('Confirm Order Pressed', 'this may or may not succeed, and you should validate', [
			{
				text: 'Okay Sure',
				style: 'default'
			}
		]);

		console.log(
			'data',
			number,
			expirationMonth,
			expirationYear,
			securityCode,
			firstName,
			lastName,
			address1,
			address2,
			locality,
			administrativeArea,
			postalCode,
			phoneNumber
		);

		console.log('total', calculateCartTotal(), typeof calculateCartTotal());
		console.log('merch id should restrict this page if -1', confirmedMerchantId);

		// fetch POST /checkout with body, token, etc.
		const response = await fetch('https://frozen-peak-79158.herokuapp.com/checkout', {
			method: 'post',
			headers: {
				'content-type': 'application/json',
				authorization: AsyncStorage.getItem('token')
			},
			body: JSON.stringify({
				number,
				expirationMonth,
				expirationYear,
				securityCode,
				totalAmount: calculateCartTotal(),
				currency: 'USD',
				firstName,
				lastName,
				address1,
				address2,
				locality,
				administrativeArea,
				postalCode,
				country: 'US',
				phoneNumber
				// DOES NOT INCLUDE EMAIL BC JWT HAS IT
			})
		});

		const data = await response.json();

		console.log(data);
	};

	return (
		<TouchableWithoutFeedback onPress={() => Keyboard.dismiss()}>
			<View style={styles.checkoutScreen}>
				<ScrollView style={styles.scroll}>
					<View style={styles.formContainer}>
						<View style={styles.inputContainer}>
							<TextInput
								style={{ ...styles.baseInput, ...styles.inputField }}
								onChangeText={(input) => setNumber(input)}
								value={number}
								placeholder="cc number"
							/>
						</View>

						<View style={styles.inputContainer}>
							<TextInput
								style={{ ...styles.baseInput, ...styles.inputField }}
								onChangeText={(input) => setExpirationMonth(input)}
								value={expirationMonth}
								placeholder="expiration month"
							/>
						</View>

						<View style={styles.inputContainer}>
							<TextInput
								style={{ ...styles.baseInput, ...styles.inputField }}
								onChangeText={(input) => setExpirationYear(input)}
								value={expirationYear}
								placeholder="expiration year"
							/>
						</View>

						<View style={styles.inputContainer}>
							<TextInput
								style={{ ...styles.baseInput, ...styles.inputField }}
								onChangeText={(input) => setSecurityCode(input)}
								value={securityCode}
								placeholder="security code"
							/>
						</View>

						<View style={styles.inputContainer}>
							<TextInput
								style={{ ...styles.baseInput, ...styles.inputField }}
								onChangeText={(input) => setFirstName(input)}
								value={firstName}
								placeholder="first name"
							/>
						</View>

						<View style={styles.inputContainer}>
							<TextInput
								style={{ ...styles.baseInput, ...styles.inputField }}
								onChangeText={(input) => setLastName(input)}
								value={lastName}
								placeholder="last name"
							/>
						</View>

						<View style={styles.inputContainer}>
							<TextInput
								style={{ ...styles.baseInput, ...styles.inputField }}
								onChangeText={(input) => setAddress1(input)}
								value={address1}
								placeholder="address 1"
							/>
						</View>

						<View style={styles.inputContainer}>
							<TextInput
								style={{ ...styles.baseInput, ...styles.inputField }}
								onChangeText={(input) => setAddress2(input)}
								value={address2}
								placeholder="address 2"
							/>
						</View>

						<View style={styles.inputContainer}>
							<TextInput
								style={{ ...styles.baseInput, ...styles.inputField }}
								onChangeText={(input) => setLocality(input)}
								value={locality}
								placeholder="city/locality"
							/>
						</View>

						<View style={styles.inputContainer}>
							<TextInput
								style={{ ...styles.baseInput, ...styles.inputField }}
								onChangeText={(input) => setAdministrativeArea(input)}
								value={administrativeArea}
								placeholder="state/administrative area"
							/>
						</View>

						<View style={styles.inputContainer}>
							<TextInput
								style={{ ...styles.baseInput, ...styles.inputField }}
								onChangeText={(input) => setPostalCode(input)}
								value={postalCode}
								placeholder="zip/postal code"
							/>
						</View>

						<View style={styles.inputContainer}>
							<TextInput
								style={{ ...styles.baseInput, ...styles.inputField }}
								onChangeText={(input) => setPhoneNumber(input)}
								value={phoneNumber}
								placeholder="phone number"
							/>
						</View>
					</View>

					<View style={styles.buttonsContainer}>
						<Button buttonPressHandler={confirmOrderHandler}>Confirm Order</Button>
					</View>
				</ScrollView>
			</View>
		</TouchableWithoutFeedback>
	);
};

const styles = StyleSheet.create({
	checkoutScreen: {
		flex: 1,
		// width: '100%',
		// justifyContent: 'space-between',
		// alignItems: 'center',
		backgroundColor: 'white'
	},
	scroll: {
		flex: 1,
		borderWidth: 4,
		borderColor: 'red'
	},
	formContainer: {
		flex: 1,
		alignItems: 'center',
		justifyContent: 'space-around',
		backgroundColor: 'white',
		borderWidth: 5
	},
	inputContainer: {
		flexDirection: 'row',
		alignItems: 'center',
		justifyContent: 'space-between',
		marginBottom: 20
	},
	baseInput: {
		backgroundColor: 'white',
		width: '70%',
		padding: 10,
		borderRadius: 10
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
	}
});
