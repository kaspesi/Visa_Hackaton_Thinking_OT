import React from 'react';
import { StyleSheet, View, Text } from 'react-native';
import Logo from '../components/Logo';
import Button from '../components/Button';

export default ({ navigation }) => {
	return (
		<View style={styles.container}>
			<View style={styles.header}>
				<View style={styles.headerTitleContainer}>
					<Text style={styles.headerTitle}>Safe Checkout</Text>
				</View>
				<Logo />
			</View>

			<View style={styles.buttonsContainer}>
				<Button
					buttonPressHandler={() => {
						navigation.navigate('Register');
					}}
				>
					<Text style={{fontFamily: ""}}>Register</Text>
				</Button>
				<Button
					buttonPressHandler={() => {
						navigation.navigate('Login');
					}}
				>
					<Text style={{fontFamily: ""}}>Login</Text>
				</Button>
			</View>
		</View>
	);
};

const styles = StyleSheet.create({
	container: {
		flex: 1,
		width: '100%',
		alignItems: 'center',
		justifyContent: 'space-around',
		backgroundColor: 'beige'
	},
	header: {
		alignItems: 'center',
		justifyContent: 'center'
	},
	headerTitleContainer: {
		backgroundColor: 'orangered',
		borderRadius: 20,
		padding: 20,
		marginBottom: 10
	},
	headerTitle: {
		fontSize: 24,
		fontWeight: '700',
		color: 'white',
		fontFamily: ""
	},
	buttonsContainer: {
		flexDirection: 'row',
		justifyContent: 'space-around',
		alignItems: 'center',
		width: '80%'
	}
});
