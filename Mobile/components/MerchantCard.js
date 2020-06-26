import React from 'react';
import { StyleSheet, View, Text } from 'react-native';
import Button from '../components/Button';

export default ({ id, name, street, city, state, country, zip, navigation }) => {
	return (
		<View style={styles.merchantCard}>
			<View style={styles.merchantTitleContainer}>
				<Text style={styles.merchantName}>{name} some really long name i mean really long</Text>
				<Text style={styles.merchantAddress}>
					{street} {city} {state} really long address really long
				</Text>
			</View>

			<Button
				buttonPressHandler={() =>
					navigation.navigate('MerchantItems', {
						id,
						name,
						street,
						city,
						state,
						country,
						zip
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
