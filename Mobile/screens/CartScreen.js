import React, { useContext } from 'react';
import { StyleSheet, View, Text, AsyncStorage } from 'react-native';
import Button from '../components/Button';
import MerchantIdContext from '../context/MerchantIdContext';
import CartContext from '../context/CartContext';

export default ({ navigation }) => {
	const { confirmedMerchantId, setConfirmedMerchantId } = useContext(MerchantIdContext);
	const { cart, setCart } = useContext(CartContext);

	const clearEverything = async () => {
		await AsyncStorage.removeItem('token');
		await AsyncStorage.removeItem('merchantId');
		await AsyncStorage.removeItem('cart');

		setConfirmedMerchantId(-1);
		setCart([]);
	};

	return (
		<View>
			{cart.map((item) => {
				return (
					<View key={item.itemId}>
						<Text>
							{item.itemId} {item.name} {item.price} {item.quantity}
						</Text>
					</View>
				);
			})}
			<Button buttonPressHandler={clearEverything}>Clear Everything</Button>

			{/* I don't need to pass cart because I can just use context instead. */}
			<Button buttonPressHandler={() => navigation.navigate('Checkout')}>Checkout</Button>
		</View>
	);
};

const styles = StyleSheet.create({});
