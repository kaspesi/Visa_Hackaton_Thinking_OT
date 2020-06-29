import React from 'react';
import { StyleSheet, View, Text } from 'react-native';
import Button from '../components/Button';

export default ({ merch_id, name, latitude, longitude, navigation }) => {
	return (
		<View style={styles.merchantCard}>
			<View style={styles.merchantTitleContainer}>
				<Text style={styles.merchantName}>
					{merch_id} {name}
				</Text>
				<Text style={styles.merchantAddress}>
					{latitude} {longitude}
				</Text>
			</View>

			<Button
				buttonPressHandler={() =>
					navigation.navigate('MerchantItems', {
						merch_id,
						name,
						latitude,
						longitude
					})}
			>
				Details
			</Button>
		</View>
	);
};

const styles = StyleSheet.create({
	merchantCard: {
		width: '100%',
		height: 100,
		borderBottomWidth: 2,
		flexDirection: 'row',
		justifyContent: 'space-around',
		alignItems: 'center',
		backgroundColor: 'beige'
	},
	merchantTitleContainer: {
		justifyContent: 'space-around',
		alignItems: 'center',
		borderWidth: 2,
		maxWidth: '60%',
		padding: 5
	},
	merchantName: {
		fontSize: 18
	},
	merchantAddress: {
		fontSize: 14,
		color: 'green'
	}
});
