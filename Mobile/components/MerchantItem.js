import React, { useState, useContext } from 'react';
import { StyleSheet, View, Text, Alert, Picker, AsyncStorage } from 'react-native';
import Button from './Button';
import MerchantContext from '../context/MerchantContext';
import CartContext from '../context/CartContext';

// this should already be filtered by merchant id
export default ({ itemId, merchantId, name, price, stock, qrCode }) => {
	const [ quantity, setQuantity ] = useState(1);

	const { confirmedMerchant, setConfirmedMerchant } = useContext(MerchantContext);
	const { cart, setCart } = useContext(CartContext);

	const addToCart = async () => {
		if (merchantId !== confirmedMerchant && cart.length !== 0) {
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

		// Initial state, should set new confirmedMerchant and add to cart.
		if (cart.length === 0) {
			setConfirmedMerchant(merchantId);
			setCart([
				{
					itemId,
					name,
					price,
					quantity: 1
				}
			]);

			await AsyncStorage.setItem('merchantId', merchantId);
			await AsyncStorage.setItem('cart', JSON.stringify(cart));

			Alert.alert('Item added!', 'You should see the item in cart', [
				{
					text: 'Okay Sure',
					style: 'default'
				}
			]);

			return;
		}

		// If the cart isn't already empty
		if (merchantId === confirmedMerchant) {
			const foundIndex = cart.findIndex((item) => item.itemId === itemId);

			let itemExists;

			if (foundIndex === -1) itemExists = false;
			else itemExists = true;

			if (itemExists) {
				cart[foundIndex].quantity += 1;
			} else {
				cart = [
					...cart,
					{
						itemId,
						name,
						price,
						quantity: 1
					}
				];
			}

			await AsyncStorage.setItem('merchantId', merchantId);
			await AsyncStorage.setItem('cart', JSON.stringify(cart));

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
				<Text style={styles.itemName}>{name} some really long name i mean really long</Text>
				<Text style={styles.itemPrice}>Price: ${price}</Text>
			</View>

			<View style={styles.pickerContainer}>
				<Picker
					style={styles.picker}
					selectedValue={quantity}
					onValueChange={(itemQuantity) => setQuantity(itemQuantity)}
				>
					<Picker.Item label="1" value={1} />
					<Picker.Item label="2" value={2} />
					<Picker.Item label="3" value={3} />
					<Picker.Item label="4" value={4} />
					<Picker.Item label="5" value={5} />
					<Picker.Item label="6" value={6} />
					<Picker.Item label="7" value={7} />
					<Picker.Item label="8" value={8} />
					<Picker.Item label="9" value={9} />
				</Picker>
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
		fontSize: 20
	},
	itemPrice: {
		fontSize: 16,
		color: 'green'
	}
});
