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
		borderRadius: 25,
		backgroundColor: '#415A77',
		minWidth: 150,
		maxWidth: 250
	},
	buttonText: {
		color: 'white',
		fontSize: 16,
		fontWeight: '700',
		paddingLeft: 20,
		paddingRight: 20
	}
});
