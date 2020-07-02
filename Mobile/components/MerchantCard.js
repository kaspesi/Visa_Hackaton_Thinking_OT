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
					color = "#415A77"
				>
					Shop
				</Button>
			</View>
		</View>
	);
};

const styles = StyleSheet.create({
	merchantCard: {
		width: '95%',
		height: 80,
		flexDirection: 'row',
		justifyContent: 'space-around',
		alignItems: 'center',
		backgroundColor: '#FFFFFF',
		margin: '2.5%',
		borderRadius: 10,
		paddingTop: 15,
		paddingBottom: 25,
		paddingLeft: 10,
		paddingRight: 10,
		shadowColor: "#000",
		shadowOffset: {
			width: 0,
			height: 2,
		},
		shadowOpacity: 0.25,
		shadowRadius: 3.84,
		elevation: 5,
		

	},
	merchantTitleContainer: {
		maxWidth: '50%',
		padding: 5,
		paddingTop: 0,
		flex: 1
	},
	merchantName: {
		fontSize: 26,
		fontWeight: '700'
	},
	buttonContainer: {
		alignItems: 'center',
		justifyContent: 'center'
	}
});
