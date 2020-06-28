import React from 'react';
import { StyleSheet, View, Text } from 'react-native';
import Logo from '../components/Logo';
import Button from '../components/Button';

export default ({ navigation }) => {
	return (
		<View style={styles.container}>
			<View style={styles.header}>
				<Logo />
				<View style={styles.headerTitleContainer}>
					<Text style={styles.headerTitle}>Welcome to the future of shopping</Text>
				</View>
			</View>

			<View style={styles.buttonsContainer}>
				<Button
					buttonPressHandler={() => {
						navigation.navigate('Register');
					}}
				>
					<Text>Register</Text>
				</Button>
				<Button
					buttonPressHandler={() => {
						navigation.navigate('Login');
					}}
				>
					<Text>Login</Text>
				</Button>
			</View>
		</View>
	);
};

const styles = StyleSheet.create({
	container: {
		flex: 1,
		width: '100%',
		alignItems: 'center'
	},
	header: {
		alignItems: 'center',
		justifyContent: 'center',
		backgroundColor: '#778DA9',
		width: '100%',
		paddingTop: 20,
		paddingBottom: 20
	},
	headerTitleContainer: {
		borderRadius: 20,
		padding: 20,
		marginBottom: 10
	},
	headerTitle: {
		fontSize: 16,
		fontWeight: '700',
		color: 'white'
	},
	buttonsContainer: {
		justifyContent: 'space-around',
		alignItems: 'center',
		width: '80%',
		marginTop: 50
	}
});
