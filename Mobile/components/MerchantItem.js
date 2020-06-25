import React from 'react';
import { StyleSheet, View, Text, Alert } from 'react-native';
import Button from './Button';

// this should already be filtered by merchant id
export default ({ itemId, merchantId, name, price, stock, qrCode }) => {
	const addToCart = () => {
		Alert.alert('Buy Clicked!', 'Will add this item to cart.', [
			{
				text: 'Okay Sure',
				style: 'default'
			}
		]);
	};

	return (
		<View style={styles.merchantItem}>
			<Text>This is the merchant item component, should use to render inside merchant items screen</Text>
			<Text>
				{merchantId} {name} {price}
			</Text>
			<Button buttonPressHandler={addToCart}>Buy</Button>
		</View>
	);
};

const styles = StyleSheet.create({
	merchantItem: {
		width: '100%',
		borderBottomWidth: 2
	}
});
