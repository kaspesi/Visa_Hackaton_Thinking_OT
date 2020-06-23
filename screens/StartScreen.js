import React from 'react';
import { StyleSheet, View, Text } from 'react-native';
import Logo from '../components/Logo';
import Button from '../components/Button';

export default () => {
	return (
		<View style={styles.container}>
			<View style={styles.header}>
				<Text style={styles.headerTitle}>Thinking OT</Text>
				<Logo />
			</View>

			<View style={styles.buttonsContainer}>
				<Button buttonPressHandler={() => {}}>Register</Button>
				<Button buttonPressHandler={() => {}}>Login</Button>
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
	headerTitle: {
		fontSize: 24,
		fontWeight: '700'
	},
	buttonsContainer: {
		flexDirection: 'row',
		justifyContent: 'space-around',
		alignItems: 'center',
		width: '80%'
	}
});
