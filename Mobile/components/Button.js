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
		borderWidth: 2,
		borderColor: 'black',
		justifyContent: 'center',
		alignItems: 'center',
		borderRadius: 25,
		borderWidth: 0,
		backgroundColor: 'palevioletred',
		minWidth: '30%'
	},
	buttonText: {
		color: 'white',
		fontSize: 16,
		fontWeight: '700'
	}
});
