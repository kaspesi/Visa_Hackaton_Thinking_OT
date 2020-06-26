import React, { useContext } from 'react';
import { StyleSheet, View, Text, AsyncStorage } from 'react-native';
import Button from '../components/Button';
import CartItem from '../components/CartItem';
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
		<View style={styles.cartScreen}>
			<View style={styles.cartItems}>
				{cart.map((item) => {
					return (
						<View key={item.itemId}>
							{/* <Text>
							{item.itemId} {item.name} {item.price} {item.quantity}
						</Text> */}
							<CartItem {...item} />
						</View>
					);
				})}
			</View>

			<View style={styles.buttonsContainer}>
				<Button buttonPressHandler={clearEverything} color="orangered">
					Clear Everything
				</Button>
				<Button buttonPressHandler={() => navigation.navigate('Checkout')}>Checkout</Button>
			</View>
		</View>
	);
};

const styles = StyleSheet.create({
	cartScreen: {
		flex: 1,
		justifyContent: 'space-between',
		alignContent: 'center'
	},
	buttonsContainer: {
		height: 120,
		justifyContent: 'space-between',
		alignItems: 'center',
		marginBottom: 30,
		borderWidth: 2
	}
});
