import React from 'react';
import { StyleSheet, View, Text } from 'react-native';
import Button from '../components/Button';

export default ({ merch_id, name, latitude, longitude, navigation }) => {
	return (
		<View style={styles.merchantCard}>
			<View style={styles.merchantTitleContainer}>
				<Text style={styles.merchantName}>{name}</Text>
			</View>

			<View style={styles.buttonContainer}>
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
		backgroundColor: 'floralwhite'
	},
	merchantTitleContainer: {
		maxWidth: '50%',
		padding: 5,
		flex: 1
	},
	merchantName: {
		fontSize: 24,
		fontWeight: '700'
	},
	buttonContainer: {
		alignItems: 'center',
		justifyContent: 'center'
	}
});
