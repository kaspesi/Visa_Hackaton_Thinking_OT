import React from 'react';
import { View, Text, StyleSheet } from 'react-native';

export default ({ itemId, name, price, quantity }) => {
	return (
		<View style={styles.cartItem}>
			<Text>a single cart item</Text>
			<Text>
				{itemId} {name} {price} {quantity}
			</Text>
		</View>
	);
};

const styles = StyleSheet.create({
	cartItem: {
		backgroundColor: 'paleturquoise'
	}
});
