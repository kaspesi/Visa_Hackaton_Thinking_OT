import React, { useContext } from 'react';
import { StyleSheet, View, Text, AsyncStorage } from 'react-native';
import Button from '../components/Button';
import MerchantIdContext from '../context/MerchantIdContext';
import CartContext from '../context/CartContext';

export default () => {
	const { confirmedMerchantId, setConfirmedMerchantId } = useContext(MerchantIdContext);
	const { cart, setCart } = useContext(CartContext);

	console.log(cart);

	const printAsync = async () => {
		console.log(await AsyncStorage.getItem('token'));
		console.log(await AsyncStorage.getItem('merchantId'));
		console.log(await AsyncStorage.getItem('cart'));
	};
	printAsync();

	const clearAsyncStorage = async () => {
		console.log('clear runs');
		await AsyncStorage.removeItem('token');
		await AsyncStorage.removeItem('merchantId');
		await AsyncStorage.removeItem('cart');

		// force a rerender?
	};

	return (
		<View>
			<Text>This is the cart screen</Text>
			{cart.map((item) => {
				return (
					<View key={item.itemId}>
						<Text>
							{item.itemId} {item.name} {item.price} {item.quantity}
						</Text>
					</View>
				);
			})}
			<View>
				{/* <Text>{AsyncStorage.getItem('token')}</Text>
				<Text>{AsyncStorage.getItem('merchantId')}</Text>
				<Text>{AsyncStorage.getItem('cart')}</Text> */}
				<Text>{null}</Text>
			</View>
			<Button buttonPressHandler={clearAsyncStorage}>Clear</Button>
		</View>
	);
};

const styles = StyleSheet.create({});
