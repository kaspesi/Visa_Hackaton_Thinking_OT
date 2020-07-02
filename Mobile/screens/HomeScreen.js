import React from 'react';
import { StyleSheet, View, Text, Image } from 'react-native';
import Button from '../components/Button';
import landing from '../assets/landing.png';

export default ({ navigation }) => {
	return (
		<View style={styles.screen}>
			<View style={styles.headerContainer}>
				<View style={styles.headerTitleContainer}>
					<Text style={styles.headerTitle}>Spend Safe</Text>
				</View>
			</View>
			<View style={styles.bodyContainer}>
				<Image source={landing} style={styles.landing} />
			</View>
			<View style={styles.buttonContainer}>
				<Button buttonPressHandler={() => navigation.navigate('MerchantList')}>Nearby Merchants</Button>
			</View>
		</View>
	);
};

const styles = StyleSheet.create({
	screen: {
		flex: 1,
		justifyContent: 'space-between',
		alignItems: 'center'
	},
	headerContainer: {
		alignItems: 'center',
		justifyContent: 'space-between',
		width: '100%',
		zIndex: 1
	},
	headerTitleContainer: {
		padding: 30,
		backgroundColor: '#778DA9',
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
		marginLeft: 10
	},
	headerDescription: {
		fontWeight: '700',
		fontSize: 18,
		textAlign: 'center'
	},
	landing: {
		height: '100%',
		width: '100%',
		zIndex: 2
	},
	bodyContainer: {
		flex: 1,
		alignItems: 'center',
		width: '100%'
	},
	buttonContainer: {
		position: 'absolute',
		bottom: 30
	}
});
