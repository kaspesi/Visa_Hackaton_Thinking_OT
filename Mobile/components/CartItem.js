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
		console.log('added quantity');
		const foundIndex = cart.findIndex((item) => item.itemId === itemId);

		const tempCart = cart;
		tempCart[foundIndex].quantity += 1;
		setCart([ ...tempCart ]);
	};

	const subtractQuantity = async () => {
		console.log('subtracted quantity');
		const foundIndex = cart.findIndex((item) => item.itemId === itemId);

		let tempCart = cart;
		tempCart[foundIndex].quantity -= 1;

		console.log(tempCart);

		tempCart = [ ...tempCart.filter((item) => item.quantity > 0) ];

		setCart([ ...tempCart ]);
	};

	return (
		<View style={styles.cartItem}>
			<View style={styles.quantityButtonsContainer}>
				<QuantityButton buttonPressHandler={addQuantity} color="green">
					+
				</QuantityButton>
				<QuantityButton buttonPressHandler={subtractQuantity} color="crimson">
					-
				</QuantityButton>
			</View>

			<View style={styles.itemDetailsContainer}>
				<View style={styles.itemDetailsLeft}>
					<Text style={styles.leftTextQuantity}>{quantity}</Text>
				</View>
				<View style={styles.itemDetailsRight}>
					<Text style={styles.rightTextName}>{name} really long name for item i mean really long</Text>
					<Text style={styles.rightTextPrice}>Price: ${(quantity * price).toFixed(2)}</Text>
				</View>
			</View>
		</View>
	);
};

const styles = StyleSheet.create({
	cartItem: {
		width: '100%',
		borderBottomWidth: 2,
		flexDirection: 'row',
		justifyContent: 'space-between',
		alignItems: 'center',
		backgroundColor: 'powderblue',
		padding: 10
	},
	quantityButtonsContainer: {
		width: '20%',
		padding: 5,
		justifyContent: 'space-between',
		alignItems: 'center'
	},
	itemDetailsContainer: {
		width: '80%',
		flexDirection: 'row',
		justifyContent: 'space-between',
		alignItems: 'center'
	},
	itemDetailsLeft: {
		width: '10%'
	},
	itemDetailsRight: {
		width: '90%',
		justifyContent: 'center',
		alignItems: 'center',
		marginRight: 40
	},
	leftTextQuantity: {
		fontSize: 32,
		fontWeight: '700'
	},
	rightTextName: {
		fontSize: 22,
		fontWeight: '700'
	},
	rightTextPrice: {
		fontSize: 20,
		color: 'green'
	}
});
