import React from 'react';
import { StyleSheet, View, Text } from 'react-native';
import Button from '../components/Button';
import Ionicons from '@expo/vector-icons/Ionicons';

export default ({ navigation }) => {
	return (
		<View style={styles.screen}>
			<View style={styles.headerContainer}>
				<View style={styles.headerTitleContainer}>
					<Ionicons name="ios-contract" size={30} color="white" />
					<Text style={styles.headerTitle}>Safe Checkout</Text>
				</View>
				<Text style={styles.headerDescription}>
					SC is a revolutionary platform that streamlines shopping and checkout during COVID climate
				</Text>
				<Text style={styles.headerDescription}>Shop At Your Favorite Stores With A Click Of A Button!</Text>
			</View>
			<View style={styles.buttonContainer}>
				<Button buttonPressHandler={() => navigation.navigate('MerchantList')}>
					<Text style={{fontFamily: ""}}>Nearby Merchants</Text>
				</Button>
			</View>
		</View>
	);
};

const styles = StyleSheet.create({
	screen: {
		flex: 1,
		justifyContent: 'space-between',
		alignItems: 'center',
		backgroundColor: 'beige'
	},
	headerContainer: {
		alignItems: 'center',
		justifyContent: 'space-between',
		height: '50%',
		width: '100%'
	},
	headerTitleContainer: {
		padding: 30,
		backgroundColor: 'orangered',
		justifyContent: 'center',
		alignItems: 'center',
		flexDirection: 'row',
		alignItems: 'center',
		justifyContent: 'space-evenly',
		width: '100%'
	},
	headerTitle: {
		fontSize: 24,
		fontWeight: '700',
		color: 'white',
		marginLeft: 10,
		fontFamily: ""
	},
	headerDescription: {
		fontWeight: '700',
		fontSize: 18,
		textAlign: 'center'
	},
	buttonContainer: {
		marginBottom: 100
	}
});
