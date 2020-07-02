import React, { useEffect, useContext } from 'react';
import { StyleSheet, View, Text, Alert, AsyncStorage } from 'react-native';
import Button from './Button';
import MerchantIdContext from '../context/MerchantIdContext';
import CartContext from '../context/CartContext';

export default ({ item_id, name, price, merch_id }) => {
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

	const addToCart = async () => {
		if ((merch_id.toString() !== confirmedMerchantId) & (cart.length > 0)) {
			Alert.alert(
				'Rejected Buy!',
				'You have an item from another merchant in your cart, please remove it first.',
				[
					{
						text: 'Okay Sure',
						style: 'default'
					}
				]
			);

			return;
		}

		if (cart.length === 0) {
			setConfirmedMerchantId(merch_id.toString());
			setCart([
				{
					itemId: item_id.toString(),
					name,
					price,
					quantity: 1
				}
			]);

			Alert.alert('Item added!', 'You should see the item in cart.', [
				{
					text: 'Okay Sure',
					style: 'default'
				}
			]);

			return;
		}

		if (merch_id.toString() === confirmedMerchantId) {
			const foundIndex = cart.findIndex((item) => item.itemId === item_id.toString());

			let itemExists;
			if (foundIndex === -1) itemExists = false;
			else itemExists = true;

			if (itemExists) {
				const tempCart = cart;
				tempCart[foundIndex].quantity += 1;
				setCart([ ...tempCart ]);
			} else {
				setCart([
					...cart,
					{
						itemId: item_id.toString(),
						name,
						price,
						quantity: 1
					}
				]);
			}

			Alert.alert('Item added!', 'You should see the item in cart, second case.', [
				{
					text: 'Okay Sure',
					style: 'default'
				}
			]);

			return;
		}

		Alert.alert('Error!', 'Did not account for this case.', [
			{
				text: 'Okay Sure',
				style: 'default'
			}
		]);
	};

	return (
		<View style={styles.merchantItem}>
			<View style={styles.itemTitleContainer}>
				<Text style={styles.itemName}>{name}</Text>
				<Text style={styles.itemPrice}>Price: ${price}</Text>
			</View>

			<Button buttonPressHandler={addToCart}>Buy</Button>
		</View>
	);
};

const styles = StyleSheet.create({
	merchantItem: {
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
	itemTitleContainer: {
		justifyContent: 'space-around',
		maxWidth: '50%',
		padding: 5,
		flex: 1
	},
	itemName: {
		fontSize: 22
	},
	itemPrice: {
		fontSize: 18,
		color: 'green'
	}
});
