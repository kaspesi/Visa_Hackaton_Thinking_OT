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
		justifyContent: 'center',
		alignItems: 'center',
		height: 30,
		width: 30
	},
	buttonText: {
		textAlign: 'center',
		color: 'white',
		fontSize: 14
	}
});
