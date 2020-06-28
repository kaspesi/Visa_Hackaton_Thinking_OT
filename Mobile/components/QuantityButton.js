import React from 'react';
import { TouchableOpacity, Text, StyleSheet } from 'react-native';

export default ({ children, buttonPressHandler, color }) => {
	return (
		<TouchableOpacity
			onPress={buttonPressHandler}
			style={color ? { ...styles.buttonContainer, backgroundColor: color } : styles.buttonContainer}
		>
			<Text style={styles.buttonText}>{children}</Text>
		</TouchableOpacity>
	);
};

const styles = StyleSheet.create({
	buttonContainer: {
		padding: 15,
		justifyContent: 'center',
		alignItems: 'center',
		borderRadius: 1000,
		backgroundColor: '#415A77',
		height: 50,
		width: 80,
		marginBottom: 20
	},
	buttonText: {
		textAlign: 'center',
		color: 'white',
		fontSize: 20,
		fontWeight: '700'
	}
});
