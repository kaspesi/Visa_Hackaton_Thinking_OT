import React, { useState, useEffect, useContext } from 'react';
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

export default ({ navigation }) => {
	const [ email, setEmail ] = useState('');
	const [ number, setNumber ] = useState('4111111111111111');
	const [ expirationMonth, setExpirationMonth ] = useState('12');
	const [ expirationYear, setExpirationYear ] = useState('2031');
	const [ securityCode, setSecurityCode ] = useState('123');
	const [ firstName, setFirstName ] = useState('John');
	const [ lastName, setLastName ] = useState('Doe');
	const [ address1, setAddress1 ] = useState('1 Market St');
	const [ address2, setAddress2 ] = useState('Address 2');
	const [ locality, setLocality ] = useState('san francisco');
	const [ administrativeArea, setAdministrativeArea ] = useState('CA');
	const [ postalCode, setPostalCode ] = useState('94105');
	const [ phoneNumber, setPhoneNumber ] = useState('4158880000');

	const { confirmedMerchantId, setConfirmedMerchantId } = useContext(MerchantIdContext);
	const { cart, setCart } = useContext(CartContext);

	useEffect(
		() => {
			const asyncEffect = async () => {
				await AsyncStorage.setItem('merchantId', confirmedMerchantId.toString());
			};
			asyncEffect();
		},
		[ confirmedMerchantId ]
	);

	useEffect(
		() => {
			const asyncEffect = async () => {
				await AsyncStorage.setItem('cart', JSON.stringify(cart));
			};
			asyncEffect();
		},
		[ cart ]
	);

	const calculateCartTotal = () => {
		let total = 0;
		cart.map((item) => (total += item.price * item.quantity));
		return total.toString();
	};

	const confirmOrderHandler = async () => {
		if (
			(!email.length,
			!number.length,
			!expirationMonth.length,
			!expirationYear.length,
			!securityCode.length,
			!firstName.length,
			!lastName.length,
			!address1.length,
			!address2.length,
			!locality.length,
			!administrativeArea.length,
			!postalCode.length,
			!phoneNumber.length)
		) {
			return Alert.alert('Empty Field!', 'Please make sure to fill out every field!', [
				{
					text: 'Okay Sure',
					style: 'default'
				}
			]);
		}

		// fetch POST /checkout with body, token, etc.
		const response = await fetch('https://frozen-peak-79158.herokuapp.com/checkout', {
			method: 'post',
			headers: {
				'content-type': 'application/json'
			},
			body: JSON.stringify({
				email,
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
				phoneNumber,
				merch_id: confirmedMerchantId,
				cart
			})
		});

		const data = await response.json();

		if (!data.success) {
			return Alert.alert('Order Placement Failed!', 'Please check that you entered the correct information.', [
				{
					text: 'Okay Sure',
					style: 'default'
				}
			]);
		}

		setCart([]);
		setConfirmedMerchantId(-1);

		Alert.alert('Order Placement Success!', 'You will now be redirected to the cart screen.', [
			{
				text: 'Okay Sure',
				style: 'default',
				onPress: () => navigation.navigate('Cart')
			}
		]);
	};

	return (
		<TouchableWithoutFeedback onPress={() => Keyboard.dismiss()}>
			<View style={styles.checkoutScreen}>
				<View style={styles.headerContainer}>
					<Text style={styles.headerText}>Payment Info</Text>
				</View>
				<ScrollView style={styles.scroll}>
					<View style={styles.formContainer}>
						<View style={styles.inputContainer}>
							<TextInput
								style={{ ...styles.baseInput, ...styles.inputField }}
								onChangeText={(input) => setEmail(input)}
								value={email}
								placeholder="email"
							/>
						</View>

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
				</ScrollView>
				<View style={styles.buttonsContainer}>
					<Button buttonPressHandler={confirmOrderHandler}>Confirm Order</Button>
				</View>
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
		borderWidth: 4
	},
	formContainer: {
		flex: 1,
		alignItems: 'center',
		justifyContent: 'space-around',
		backgroundColor: 'white'
	},
	inputContainer: {
		flexDirection: 'row',
		alignItems: 'center',
		justifyContent: 'space-between',
		marginTop: 10,
		marginBottom: 10
	},
	baseInput: {
		backgroundColor: 'white',
		width: '70%',
		padding: 10,
		borderRadius: 10
	},
	buttonsContainer: {
		flexDirection: 'row',
		justifyContent: 'space-around',
		alignItems: 'center',
		width: '100%',
		height: 150,
		backgroundColor: '#778DA9'
	},
	inputField: {
		backgroundColor: '#E0E1DD'
	},
	headerContainer: {
		height: 70,
		justifyContent: 'center',
		alignItems: 'center',
		backgroundColor: '#415A77'
	},
	headerText: {
		fontSize: 24,
		color: 'white'
	}
});
