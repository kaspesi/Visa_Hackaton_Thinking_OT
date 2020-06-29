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
		if ((merch_id !== confirmedMerchantId) & (cart.length > 0)) {
			console.log(
				'first',
				merch_id,
				confirmedMerchantId,
				cart.length,
				merch_id !== confirmedMerchantId,
				cart.length !== 0,
				(merch_id !== confirmedMerchantId) & (cart.length > 0),
				typeof merch_id,
				typeof confirmedMerchantId
			);

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
			setConfirmedMerchantId(merch_id);
			setCart([
				{
					itemId: item_id,
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

		if (merch_id === confirmedMerchantId) {
			const foundIndex = cart.findIndex((item) => item.itemId === item_id);

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
						itemId: item_id,
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

		console.log(item_id, name, price, merch_id);

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
				<Text style={styles.itemName}>
					{item_id} {name} some really long name i mean really long
				</Text>
				<Text style={styles.itemPrice}>Price: ${price}</Text>
			</View>

			<Button buttonPressHandler={addToCart}>Buy</Button>
		</View>
	);
};

const styles = StyleSheet.create({
	merchantItem: {
		width: '100%',
		height: 100,
		borderBottomWidth: 2,
		flexDirection: 'row',
		justifyContent: 'space-around',
		alignItems: 'center',
		backgroundColor: 'beige'
	},
	itemTitleContainer: {
		justifyContent: 'space-around',
		alignItems: 'center',
		borderWidth: 2,
		maxWidth: '60%',
		padding: 5
	},
	itemName: {
		fontSize: 18
	},
	itemPrice: {
		fontSize: 14,
		color: 'green'
	}
});
