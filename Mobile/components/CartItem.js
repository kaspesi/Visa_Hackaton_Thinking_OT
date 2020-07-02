import React, { useEffect, useContext } from 'react';
import { View, Text, StyleSheet, AsyncStorage } from 'react-native';
import QuantityButton from '../components/QuantityButton';
import MerchantIdContext from '../context/MerchantIdContext';
import CartContext from '../context/CartContext';

export default ({ itemId, name, price, quantity }) => {
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

				if (cart.length === 0) {
					setConfirmedMerchantId(-1);
				}
			};
			asyncEffect();
		},
		[ cart ]
	);

	const addQuantity = async () => {
		const foundIndex = cart.findIndex((item) => item.itemId === itemId);

		const tempCart = cart;
		tempCart[foundIndex].quantity += 1;
		setCart([ ...tempCart ]);
	};

	const subtractQuantity = async () => {
		const foundIndex = cart.findIndex((item) => item.itemId === itemId);

		let tempCart = cart;
		tempCart[foundIndex].quantity -= 1;

		tempCart = [ ...tempCart.filter((item) => item.quantity > 0) ];

		setCart([ ...tempCart ]);
	};

	return (
		<View style={styles.cartItem}>
			<View style={styles.leftSection}>
				<View style={styles.quantityButtonsContainer}>
					<QuantityButton buttonPressHandler={addQuantity} color="darkseagreen">
						+
					</QuantityButton>
					<QuantityButton buttonPressHandler={subtractQuantity} color="lightcoral">
						-
					</QuantityButton>
				</View>
				<Text style={styles.quantityText}>{quantity}</Text>
			</View>

			<View style={styles.itemDetailsContainer}>
				<View style={styles.itemDetails}>
					<Text style={styles.itemName}>{name}</Text>
					<Text style={styles.itemPrice}>Price: ${(quantity * price).toFixed(2)}</Text>
				</View>
			</View>
		</View>
	);
};

const styles = StyleSheet.create({
	cartItem: {
		width: '95%',
		height: 80,
		flexDirection: 'row',
		justifyContent: 'space-around',
		alignItems: 'center',
		backgroundColor: '#FFFFFF',
		margin: '2.5%',
		borderRadius: 10,
		paddingTop: 15,
		paddingBottom: 25,
		paddingLeft: 10,
		paddingRight: 10,
		shadowColor: "#000",
		shadowOffset: {
			width: 0,
			height: 2,
		},
		shadowOpacity: 0.25,
		shadowRadius: 3.84,
		elevation: 5,
	},
	leftSection: {
		flexDirection: 'row',
		justifyContent: 'space-around',
		alignItems: 'center',
		width: 80
	},
	quantityButtonsContainer: {
		padding: 5,
		justifyContent: 'space-between',
		alignItems: 'center'
	},
	quantityText: {
		fontSize: 24,
		fontWeight: '700'
	},
	itemDetailsContainer: {
		flex: 1
	},
	itemDetails: {
		justifyContent: 'space-around',
		alignItems: 'center',
		paddingLeft: 20
	},
	itemName: {
		fontSize: 20
	},
	itemPrice: {
		fontSize: 16,
		color: 'green'
	}
});
