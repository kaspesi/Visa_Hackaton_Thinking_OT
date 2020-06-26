import React, { useContext } from 'react';
import { StyleSheet, View, Text, AsyncStorage, ScrollView } from 'react-native';
import Button from '../components/Button';
import CartItem from '../components/CartItem';
import MerchantIdContext from '../context/MerchantIdContext';
import CartContext from '../context/CartContext';

export default ({ navigation }) => {
	const { setConfirmedMerchantId } = useContext(MerchantIdContext);
	const { cart, setCart } = useContext(CartContext);

	const clearEverything = async () => {
		await AsyncStorage.removeItem('token');
		await AsyncStorage.removeItem('merchantId');
		await AsyncStorage.removeItem('cart');

		setConfirmedMerchantId(-1);
		setCart([]);
	};

	const calculateCartTotal = () => {
		let total = 0;
		cart.map((item) => (total += item.price * item.quantity));
		return total;
	};

	return (
		<View style={styles.cartScreen}>
			<View style={styles.cartItems}>
				<ScrollView style={styles.scroll}>
					{cart.map((item) => {
						return (
							<View key={item.itemId}>
								<CartItem {...item} />
							</View>
						);
					})}
				</ScrollView>
			</View>

			<View style={styles.cartSummary}>
				<Text style={styles.cartSummaryText}>Total: ${calculateCartTotal().toFixed(2)}</Text>
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
		alignContent: 'center',
		backgroundColor: 'moccasin'
	},
	scroll: {
		width: '100%',
		height: '70%'
	},
	buttonsContainer: {
		flex: 1,
		flexDirection: 'row',
		justifyContent: 'space-around',
		alignItems: 'center',
		backgroundColor: 'beige'
	},
	cartSummary: {
		height: 70,
		width: '100%',
		backgroundColor: 'moccasin',
		alignItems: 'center',
		justifyContent: 'center'
	},
	cartSummaryText: {
		fontSize: 28,
		fontWeight: '700',
		color: 'green',
		textAlign: 'center'
	}
});
